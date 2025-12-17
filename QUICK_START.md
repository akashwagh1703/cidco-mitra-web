# CIDCO Mitra Website - Quick Start Guide

## 🚀 Start in 3 Steps

### Step 1: Navigate to Project
```bash
cd cidco-mitra-web
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
The website will automatically open at:
```
http://localhost:5173
```

---

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint code |

---

## 🎨 Sections Overview

The website includes these sections:

1. **Home** - Hero section with CTAs
2. **About** - Company info & stats
3. **Services** - Service offerings
4. **Features** - Key highlights
5. **Contact** - Contact form & info

---

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    600: '#YOUR_COLOR',
  }
}
```

### Edit Content
All content is in `src/components/`:
- `Hero.jsx` - Main heading & CTAs
- `About.jsx` - Company information
- `Services.jsx` - Service cards
- `Features.jsx` - Feature highlights
- `Contact.jsx` - Contact form
- `Footer.jsx` - Footer links

### Add Images
1. Place images in `public/` folder
2. Reference as `/image-name.jpg`

---

## 📱 Test Responsive Design

1. Open browser DevTools (F12)
2. Click device toolbar icon
3. Test different screen sizes

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Tailwind Not Working
```bash
# Reinstall dependencies
npm install
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules
npm install
npm run build
```

---

## ✅ Checklist

Before going live:
- [ ] Update all text content
- [ ] Add real images
- [ ] Test contact form
- [ ] Check all links
- [ ] Test on mobile
- [ ] Optimize images
- [ ] Add meta tags
- [ ] Setup analytics

---

**Need Help?** Check `README.md` or `FIXES.md`
