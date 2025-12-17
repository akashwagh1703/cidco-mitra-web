# Troubleshooting MIME Type Error

## Error Message
```
Failed to load module script: Expected a JavaScript module script 
but the server responded with a MIME type of "text/html"
```

## Solutions

### Solution 1: Clear Cache & Restart
```bash
# Stop the dev server (Ctrl+C)

# Clear Vite cache
rmdir /s /q node_modules\.vite

# Restart
npm run dev
```

### Solution 2: Kill Port Process
```bash
# Kill any process on port 5173
npx kill-port 5173

# Then restart
npm run dev
```

### Solution 3: Use Different Port
```bash
npm run dev -- --port 3000
```

### Solution 4: Reinstall Dependencies
```bash
# Delete node_modules
rmdir /s /q node_modules

# Reinstall
npm install

# Start server
npm run dev
```

### Solution 5: Check File Paths
Ensure these files exist:
- ✅ `src/main.jsx`
- ✅ `src/App.jsx`
- ✅ `src/index.css`
- ✅ `index.html`

### Solution 6: Manual Start
```bash
# Start without auto-open
npm run dev -- --open false

# Then manually open: http://localhost:5173
```

## Quick Fix Command
```bash
rmdir /s /q node_modules\.vite && npm run dev
```

## If Still Not Working

1. Check if another app is using port 5173
2. Try restarting your computer
3. Check antivirus/firewall settings
4. Ensure Node.js version is 18+

```bash
node --version
```

Should show v18.0.0 or higher.
