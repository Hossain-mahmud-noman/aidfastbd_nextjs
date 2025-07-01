"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const I18nContext = createContext(undefined);

const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const pathName = usePathname();

  useEffect(() => {
    if (pathName) {
      const savedLang = localStorage.getItem("lang");
      if (savedLang === "en" || savedLang === "bn") {
        setLanguage(savedLang);
      } else {
        setLanguage("en");
      }
      loadTranslations(savedLang || "en");
    }
  }, [pathName]);

  const loadTranslations = async (lang) => {
    try {
      const res = await fetch(`/data/translations.json`);
      if (!res.ok) throw new Error("Failed to fetch translations.");
      const data = await res.json();
      setTranslations(data[lang] || {});
    } catch (error) {
      console.error("Error loading translations:", error);
    }
  };

  const changeLanguage = (value) => {
    if (value === "en" || value === "bn") {
      setLanguage(value);
      localStorage.setItem("lang", value);
      loadTranslations(value);
    }
  };

  const t = (key) => (key ? translations[key] || key : "");

  return (
    <I18nContext.Provider value={{ language, changeLanguage, lang_suffix: language === "bn" ? "_bn" : "", t }}>
      {children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      language: "en",
      lang_suffix: "",
      t: (key) => key || "",
      changeLanguage: () => {},
    };
  }
  return context;
};
