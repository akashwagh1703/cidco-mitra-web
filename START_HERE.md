# 🚀 Start CIDCO Mitra Website

## Quick Start (Recommended)

### Option 1: Use Batch Script
```bash
start.bat
```

### Option 2: Manual Command
```bash
npm run dev
```

Then open: **http://localhost:5173**

---

## ⚠️ If You See MIME Type Error

Run this command:
```bash
rmdir /s /q node_modules\.vite && npm run dev
```

Or use the batch script:
```bash
start.bat
```

---

## 📋 What's Included

✅ Responsive Navbar with mobile menu
✅ Hero section with CTAs
✅ About section with stats
✅ Services cards
✅ Features highlights
✅ Contact form
✅ Footer with links

---

## 🎨 Customize Content

Edit these files in `src/components/`:
- `Hero.jsx` - Main heading
- `About.jsx` - Company info
- `Services.jsx` - Services
- `Contact.jsx` - Contact info

---

## 🔧 Common Issues

### Port Already in Use
```bash
npx kill-port 5173
npm run dev
```

### Cache Issues
```bash
rmdir /s /q node_modules\.vite
npm run dev
```

### Dependencies Issues
```bash
npm install
npm run dev
```

---

## 📱 Test Responsive

1. Open DevTools (F12)
2. Click device icon
3. Test different sizes

---

## ✅ Checklist

- [x] Tailwind CSS v3.4.0 installed
- [x] All components created
- [x] Responsive design
- [x] Smooth scrolling
- [x] Icons working
- [x] Forms functional

---

**Need Help?** Check `TROUBLESHOOTING.md`

**Ready to Deploy?** Run `npm run build`
