# API Integration - CIDCO Mitra Website

## ✅ APIs Integrated

### 1. **Contact Form Submission**
**Endpoint:** `POST /api/v1/public/contact`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "message": "I'm interested in your services"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you! Your message has been received.",
  "data": {
    "id": 1
  }
}
```

**Component:** `src/components/Contact.jsx`

---

### 2. **Get Statistics**
**Endpoint:** `GET /api/v1/public/stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "total_clients": 150,
    "success_rate": 95,
    "years_experience": 15,
    "awards_won": 50
  }
}
```

**Component:** `src/components/About.jsx`

---

### 3. **Get Website Settings**
**Endpoint:** `GET /api/v1/public/settings`

**Response:**
```json
{
  "success": true,
  "data": {
    "general": {
      "site_name": "CIDCO Mitra",
      "contact_email": "info@cidcomitra.gov.in",
      "contact_phone": "+91 1234567890"
    },
    "homepage": {
      "hero_title": "Welcome to CIDCO Mitra",
      "hero_subtitle": "Your trusted partner...",
      "features": [...]
    },
    "branding": {
      "logo": "/storage/branding/logo.png",
      "primary_color": "#3b82f6"
    }
  }
}
```

**Component:** `src/components/Hero.jsx`

---

## 📁 File Structure

```
src/
├── services/
│   ├── api.js              # Base API service
│   └── publicService.js    # Public API methods
├── components/
│   ├── Contact.jsx         # ✅ API integrated
│   ├── About.jsx           # ✅ API integrated
│   └── Hero.jsx            # ✅ API integrated
└── .env                    # API URL configuration
```

---

## 🔧 Configuration

### Environment Variables
Create `.env` file:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

### For Production
```env
VITE_API_URL=https://your-domain.com/api/v1
```

---

## 🚀 How It Works

### 1. Contact Form
When user submits the form:
1. Form data is validated
2. API call to `/public/contact`
3. Lead is created in database
4. Success message shown
5. Form is reset

### 2. Statistics
On page load:
1. API call to `/public/stats`
2. Real data from database
3. Stats cards updated dynamically

### 3. Hero Content
On page load:
1. API call to `/public/settings`
2. Homepage settings fetched
3. Hero title/subtitle updated

---

## 🧪 Testing

### Test Contact Form
1. Fill out the form
2. Click "Send Message"
3. Check admin panel for new lead
4. Verify success message

### Test Stats
1. Add leads in admin panel
2. Refresh website
3. Stats should update automatically

### Test Hero Content
1. Update homepage settings in admin
2. Refresh website
3. Hero content should update

---

## 🔒 CORS Configuration

Backend CORS is already configured in:
`cidco-mitra-api/config/cors.php`

```php
'allowed_origins' => ['*'],
```

---

## 📝 API Service Usage

### Import Service
```javascript
import { publicService } from '../services/publicService'
```

### Get Settings
```javascript
const response = await publicService.getSettings()
```

### Submit Contact
```javascript
const response = await publicService.submitContact({
  name: 'John',
  email: 'john@example.com',
  phone: '+91 1234567890',
  message: 'Hello'
})
```

### Get Stats
```javascript
const response = await publicService.getStats()
```

---

## 🐛 Troubleshooting

### CORS Error
Ensure API server is running:
```bash
cd cidco-mitra-api
php artisan serve
```

### Network Error
Check API URL in `.env`:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

### 404 Error
Verify routes in:
`cidco-mitra-api/routes/api.php`

---

## ✅ Integration Checklist

- [x] Backend API endpoints created
- [x] Frontend API service created
- [x] Contact form integrated
- [x] Stats API integrated
- [x] Hero content integrated
- [x] Environment variables configured
- [x] Error handling implemented
- [x] CORS configured

---

## 🎯 Next Steps

### Optional Enhancements
1. Add loading skeletons
2. Add error toast notifications
3. Add form validation messages
4. Cache API responses
5. Add retry logic
6. Add analytics tracking

---

## 📊 API Response Format

All APIs follow this format:

**Success:**
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": {...}
}
```

---

**Last Updated:** December 6, 2024
**Status:** ✅ Complete & Working
