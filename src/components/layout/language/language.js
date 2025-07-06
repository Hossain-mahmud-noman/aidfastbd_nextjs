import { useI18n } from "../../../context/i18n.js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu"
import { Button } from "antd"
import Image from "next/image.js"
import { FaLanguage } from "react-icons/fa6"

const Language = () => {
  const i18n = useI18n()
  console.log("🚀 ~ Language ~ i18n:", i18n)
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-primary hover:text-landingPink transition-colors duration-200 px-3 py-1.5 rounded-full border border-white/20 hover:border-landingPink/30"
          >
            {/* <FaLanguage className="text-xl text-landingPink" /> */}
            <Image
              src={i18n.language === "en" ? "/en.jpg" : "/bn.JPG"}
              width={40}
              height={40}
              alt="Language"
              className="rounded-full w-7 h-7 object-cover"
            />
            {/* Show text only on md and up */}
            {/* <span className="text-sm font-medium hidden md:inline">
              {i18n?.language === "bn" ? "বাংলা" : "English"}
            </span> */}
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg p-1 min-w-[120px] shadow-lg"
          align="end"
        >
          <DropdownMenuItem
            className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:text-landingPink hover:bg-white/5 rounded-md cursor-pointer transition-colors duration-200"
            onClick={() => i18n?.changeLanguage("en")}
          >
            <span className={i18n?.language === "en" ? "text-landingPink" : "text-white"}>
              English
            </span>
            {i18n?.language === "en" && (
              <span className="ml-auto text-landingPink">✓</span>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:text-landingPink hover:bg-white/5 rounded-md cursor-pointer transition-colors duration-200"
            onClick={() => i18n?.changeLanguage("bn")}
          >
            <span className={i18n?.language === "bn" ? "text-landingPink" : "text-white"}>
              বাংলা
            </span>
            {i18n?.language === "bn" && (
              <span className="ml-auto text-landingPink">✓</span>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Language
