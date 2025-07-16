import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
}) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`
        flex items-center gap-2 px-2 py-1 
        text-gray-600 hover:text-gray-900
        dark:text-gray-400 dark:hover:text-gray-200
        transition-all duration-200
        hover:scale-110
        ${className}
      `}
      title={`Switch to ${i18n.language === "en" ? "中文" : "English"}`}
    >
      <FontAwesomeIcon icon={faLanguage} size="xl" />
    </button>
  );
};

export default LanguageSwitcher;
