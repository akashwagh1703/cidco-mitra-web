import { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const daysMap = {
  en: { monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday' },
  mr: { monday: 'सोमवार', tuesday: 'मंगळवार', wednesday: 'बुधवार', thursday: 'गुरुवार', friday: 'शुक्रवार', saturday: 'शनिवार', sunday: 'रविवार' },
  hi: { monday: 'सोमवार', tuesday: 'मंगलवार', wednesday: 'बुधवार', thursday: 'गुरुवार', friday: 'शुक्रवार', saturday: 'शनिवार', sunday: 'रविवार' }
};

export default function ScheduleViewer({ serviceId }) {
  const { language } = useLanguage();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, [serviceId]);

  const fetchSchedules = async () => {
    try {
      const response = await api.get(`/v1/admin/services/${serviceId}/schedules`);
      if (response.data.success) {
        setSchedules(response.data.data.filter(s => s.is_active));
      }
    } catch (error) {
      console.error('Failed to fetch schedules');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Calendar className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium mb-1">
              {language === 'en' ? 'Schedule Not Configured' : 
               language === 'mr' ? 'वेळापत्रक कॉन्फिगर केलेले नाही' : 
               'शेड्यूल कॉन्फ़िगर नहीं किया गया'}
            </p>
            <p className="text-yellow-700 dark:text-yellow-300 text-xs">
              {language === 'en' ? 'Please contact us directly to schedule an appointment.' : 
               language === 'mr' ? 'भेट नियोजित करण्यासाठी कृपया आम्हाला थेट संपर्क करा.' : 
               'अपॉइंटमेंट शेड्यूल करने के लिए कृपया हमसे सीधे संपर्क करें।'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Calendar className="text-primary-600 dark:text-primary-400" size={18} />
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
            {language === 'en' ? 'Weekly Availability' : language === 'mr' ? 'साप्ताहिक उपलब्धता' : 'साप्ताहिक उपलब्धता'}
          </h3>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-700">
              <span className="font-medium text-gray-900 dark:text-white capitalize text-sm">
                {daysMap[language][schedule.day_of_week]}
              </span>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Clock size={14} />
                <span className="text-sm font-medium">
                  {schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
