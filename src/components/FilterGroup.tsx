import { useTranslation } from "react-i18next";

interface FilterGroupProps<T> {
  title: string;
  allLabel: string;
  options: T[];
  selectedValue: T | null;
  onSelectionChange: (value: T | null) => void;
  translationKey: string;
}

const FilterGroup = <T extends string>({
  title,
  allLabel,
  options,
  selectedValue,
  onSelectionChange,
  translationKey,
}: FilterGroupProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
      <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
        {title}
      </span>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => onSelectionChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border border-gray-200 dark:border-gray-700
            ${
              !selectedValue
                ? "bg-black text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
        >
          {allLabel}
        </button>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelectionChange(option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border border-gray-200 dark:border-gray-700
              ${
                selectedValue === option
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
          >
            {t(`${translationKey}.${option}`)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;
