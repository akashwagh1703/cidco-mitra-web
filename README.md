# CIDCO Mitra Web V2 - Enhanced

Modern React application with comprehensive features for CIDCO government services.

## 🚀 New Features (Enhanced Version)

### ✅ Implemented Improvements

1. **React 19.x** - Upgraded to latest React version
2. **Error Boundaries** - Graceful error handling throughout the app
3. **Toast Notifications** - User feedback with react-hot-toast
4. **SEO Optimization** - Meta tags with react-helmet-async
5. **Legal Pages** - Privacy Policy & Terms of Service
6. **404 Page** - Custom not-found page
7. **Loading States** - Reusable loading component
8. **Form Validation** - react-hook-form with validation
9. **Better UX** - Enhanced user experience across all pages

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## 🛠️ Tech Stack

- **React 19** - Latest React version
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **React Router v6** - Client-side routing
- **React Hook Form** - Form validation
- **React Hot Toast** - Toast notifications
- **React Helmet Async** - SEO meta tags
- **React Error Boundary** - Error handling
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **Vitest** - Testing framework

## 📁 Project Structure

```
src/
├── components/
│   ├── ErrorBoundary.jsx    # Error handling
│   ├── Loading.jsx           # Loading states
│   ├── SEO.jsx              # SEO meta tags
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── Contact.jsx
│   └── AppointmentBooking.jsx
├── pages/
│   ├── Home.jsx
│   ├── ServicesPage.jsx
│   ├── ServiceDetail.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   ├── PrivacyPolicy.jsx    # NEW
│   ├── TermsOfService.jsx   # NEW
│   └── NotFound.jsx          # NEW
├── context/
│   └── LanguageContext.jsx
├── services/
│   ├── api.js
│   └── publicService.js
├── locales/
│   ├── en.json
│   ├── mr.json
│   └── hi.json
├── App.jsx
├── main.jsx
└── index.css
```

## 🎨 Key Features

### 1. Error Handling
- Error boundaries wrap all components
- Graceful error messages
- Automatic error logging

### 2. Form Validation
- Real-time validation with react-hook-form
- Custom error messages
- Email and phone validation

### 3. Toast Notifications
- Success/error feedback
- Auto-dismiss
- Customizable styling

### 4. SEO Optimization
- Dynamic meta tags
- Open Graph support
- Twitter Card support
- Canonical URLs

### 5. Loading States
- Full-screen loading
- Component-level loading
- Custom messages

### 6. Legal Pages
- Privacy Policy
- Terms of Service
- Professional layout

### 7. 404 Page
- Custom not-found page
- Navigation options
- User-friendly design

## 🌐 Multi-Language Support

- English (en)
- Marathi (mr)
- Hindi (hi)

## 🎯 API Integration

```javascript
// Available endpoints
GET  /public/services
GET  /public/settings
POST /public/leads
GET  /public/stats
GET  /services/:id/available-slots
POST /appointments
```

## 🔧 Environment Variables

Create `.env` file:

```env
VITE_API_URL=https://cidcomitra.com/cidco-mitra-api/public/api/v1
```

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Dark mode support

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Output will be in `dist/` folder with base path `/cidco-mitra-web-v2/`

## 📝 License

© 2024 CIDCO Mitra. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

For support, email info@cidcomitra.com or call 8828422213

---

**Built with ❤️ for CIDCO Mitra**
