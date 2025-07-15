import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
}) => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      onClick={toggleLanguage}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg
        text-sm font-medium transition-all duration-200
        hover:bg-gray-100 hover:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
        ${className}
      `}
    >
      <motion.div
        className="w-1 h-1 rounded-full bg-current opacity-60"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-gray-600 hover:text-gray-800">
        {i18n.language === "en" ? "中文" : "English"}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher;
