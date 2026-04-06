import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'mr', label: 'मराठी' },
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
  ];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
        <Globe className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {languages.find(lang => lang.code === language)?.label}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-gray-700">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
              language === lang.code
                ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
