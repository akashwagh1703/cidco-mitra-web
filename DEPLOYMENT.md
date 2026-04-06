# DEPLOYMENT CHECKLIST

## ✅ Files to Upload from `dist` folder:

1. **index.html** → Upload to: `public_html/index.html`
2. **assets/** folder → Upload to: `public_html/assets/`
   - index-CgzCRL1_.css
   - index-C8wfvbTh.js
3. **videos/** folder → Upload to: `public_html/videos/`
   - hero-background.mp4
4. **.htaccess** → Upload to: `public_html/.htaccess`

## 🔍 Verify on Server:

After upload, check these URLs directly in browser:
- https://cidcomitra.com/index.html ✓
- https://cidcomitra.com/assets/index-CgzCRL1_.css ✓
- https://cidcomitra.com/assets/index-C8wfvbTh.js ✓
- https://cidcomitra.com/.htaccess (should download or show 403)

## ❌ Common Mistakes:

1. **Wrong:** Uploading to `public_html/cidco-mitra-web-v2/`
   **Right:** Upload to `public_html/` directly

2. **Wrong:** Not uploading the `assets` folder
   **Right:** Upload the entire `assets` folder with all files inside

3. **Wrong:** Uploading only index.html
   **Right:** Upload ALL files and folders from dist

## 📂 Correct Server Structure:

```
public_html/
├── assets/
│   ├── index-CgzCRL1_.css
│   └── index-C8wfvbTh.js
├── videos/
│   └── hero-background.mp4
├── .htaccess
└── index.html
```

## 🚨 If Still Getting 404:

The `assets` folder is NOT on your server. Re-upload it!
