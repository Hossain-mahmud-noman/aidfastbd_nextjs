import { useI18n } from "../../../context/i18n.js";
import { Dropdown, Button, Menu } from "antd";
import Image from "next/image";

const Language = () => {
  const i18n = useI18n();

  const handleLanguageChange = (lang) => {
    i18n?.changeLanguage(lang);
  };

  const menu = (
    <Menu
      items={[
        {
          key: "en",
          label: (
            <div
              className="flex items-center justify-between gap-2 text-white hover:text-landingPink transition-colors duration-200"
              onClick={() => handleLanguageChange("en")}
            >
              <span className={i18n.language === "en" ? "text-primary" : "text-black"}>
                English
              </span>
              {i18n.language === "en" && <span className="text-primary">✓</span>}
            </div>
          ),
        },
        {
          key: "bn",
          label: (
            <div
              className="flex items-center justify-between gap-2 text-white hover:text-landingPink transition-colors duration-200"
              onClick={() => handleLanguageChange("bn")}
            >
              <span className={i18n.language === "bn" ? "text-primary" : "text-black"}>
                বাংলা
              </span>
              {i18n.language === "bn" && <span className="text-primary">✓</span>}
            </div>
          ),
        },
      ]}
      className="rounded-lg p-1 min-w-[120px] shadow-custom-light"
    />
  );

  return (
    <Dropdown overlay={menu} trigger={['hover']} placement="bottom" arrow>
      <Button
        size="small"
        className="!border-none !shadow-none flex items-center gap-2 text-primary hover:text-landingPink transition-colors duration-200 px-3 py-1.5 rounded-full bg-transparent"
      >
        <Image
          src={i18n.language === "en" ? "/en.jpg" : "/bn.JPG"}
          width={40}
          height={40}
          alt="Language"
          className="rounded-full w-6 h-6 md:w-8 md:h-8 object-cover"
        />
        <span className="sr-only">Toggle language</span>
      </Button>
    </Dropdown>
  );
};

export default Language;
