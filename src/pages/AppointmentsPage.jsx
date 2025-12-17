import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { publicService } from '../services/publicService';
import AppointmentBooking from '../components/AppointmentBooking';

export default function AppointmentsPage() {
  const { language } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await publicService.getServices();
      if (response.success) {
        setServices(response.data.filter(s => s.status));
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getText = (field) => {
    if (!field) return '';
    return field[language] || field.en || field;
  };

  const filteredServices = services.filter(service =>
    getText(service.title).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = (service) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Book an Appointment' : language === 'mr' ? 'भेटीची वेळ बुक करा' : 'अपॉइंटमेंट बुक करें'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Schedule your appointment online. Choose a service and select your preferred date and time.'
              : language === 'mr'
              ? 'तुमची भेट ऑनलाइन शेड्यूल करा. सेवा निवडा आणि तुमची पसंतीची तारीख आणि वेळ निवडा.'
              : 'अपनी अपॉइंटमेंट ऑनलाइन शेड्यूल करें। सेवा चुनें और अपनी पसंदीदा तारीख और समय चुनें।'}
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search services...' : language === 'mr' ? 'सेवा शोधा...' : 'सेवाएं खोजें...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-primary-600 dark:text-primary-400" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'Choose Your Time' : language === 'mr' ? 'तुमची वेळ निवडा' : 'अपना समय चुनें'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Select from available time slots' : language === 'mr' ? 'उपलब्ध वेळेतून निवडा' : 'उपलब्ध समय से चुनें'}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'Instant Confirmation' : language === 'mr' ? 'त्वरित पुष्टीकरण' : 'तत्काल पुष्टि'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Get immediate booking confirmation' : language === 'mr' ? 'त्वरित बुकिंग पुष्टीकरण मिळवा' : 'तुरंत बुकिंग पुष्टि प्राप्त करें'}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'Save Time' : language === 'mr' ? 'वेळ वाचवा' : 'समय बचाएं'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'No waiting in queues' : language === 'mr' ? 'रांगेत प्रतीक्षा नाही' : 'कतारों में प्रतीक्षा नहीं'}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'No services found' : language === 'mr' ? 'कोणत्याही सेवा सापडल्या नाहीत' : 'कोई सेवा नहीं मिली'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {getText(service.title)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {getText(service.description)}
                </p>
                {getText(service.timeline) && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Clock size={16} />
                    <span>{getText(service.timeline)}</span>
                  </div>
                )}
                <button
                  onClick={() => handleBookAppointment(service)}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  {language === 'en' ? 'Book Appointment' : language === 'mr' ? 'भेट बुक करा' : 'अपॉइंटमेंट बुक करें'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showBooking && selectedService && (
        <AppointmentBooking
          service={selectedService}
          onClose={() => {
            setShowBooking(false);
            setSelectedService(null);
          }}
        />
      )}
    </div>
  );
}
