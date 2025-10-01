# 🎨 Font Installation Guide - Colmeak for Pines VA

## ✅ **Current Setup Status**

Your project is now configured to use the Colmeak font! Here's what I've set up:

---

## 📁 **File Structure**
```
pines-va/
├── public/
│   └── fonts/          ← Font files go here
│       ├── colmeak-regular.woff2
│       ├── colmeak-regular.woff
│       ├── colmeak-bold.woff2
│       └── colmeak-bold.woff
├── app/
│   ├── layout.tsx      ← ✅ Updated with font config
│   └── globals.css     ← ✅ Added @font-face rules
```

---

## 🔧 **Installation Steps**

### **Step 1: Download Font Files**
You need to obtain Colmeak font files in these formats:
- `colmeak-regular.woff2` (best performance)
- `colmeak-regular.woff` (fallback)
- `colmeak-bold.woff2` (for bold text)
- `colmeak-bold.woff` (fallback)

### **Step 2: Place Font Files**
Copy your font files to: `/public/fonts/`

### **Step 3: Verify Configuration** ✅ Already Done!

**✅ layout.tsx** - Added Next.js font optimization:
```tsx
import localFont from 'next/font/local';

const colmeak = localFont({
  src: [
    {
      path: '../public/fonts/colmeak-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/colmeak-bold.woff2', 
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-colmeak',
  display: 'swap',
});
```

**✅ globals.css** - Added @font-face declarations:
```css
@font-face {
  font-family: 'Colmeak';
  src: url('/fonts/colmeak-regular.woff2') format('woff2'),
       url('/fonts/colmeak-regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

---

## 🎯 **How to Use the Font**

### **Method 1: Tailwind CSS Classes** (Recommended)
```tsx
<h1 className="font-colmeak text-4xl">Pines VA</h1>
```

### **Method 2: CSS Font Family**
```css
.logo-text {
  font-family: 'Colmeak', sans-serif;
}
```

### **Method 3: Inline Styles**
```tsx
<text style={{fontFamily: 'Colmeak'}}>Pines VA</text>
```

---

## 🔄 **Update Your SVG Logo**

Since your SVG references `font-family:Colmeak`, you have two options:

### **Option A: Keep SVG Text (Requires Font)**
Your current SVG will work once you add the font files:
```tsx
<text className="cls-1" transform="translate(847.23 581.83)">
  Pines<tspan className="cls-2" x="1518.71" y="0">V</tspan>
  <tspan className="cls-3" x="1867.5" y="0">A</tspan>
</text>
```

### **Option B: Convert to Paths (No Font Needed)**
Convert text to vector paths in your design software (Illustrator, Figma, etc.)

---

## 🚀 **Where to Get Colmeak Font**

### **Commercial Fonts:**
- [Adobe Fonts](https://fonts.adobe.com/) 
- [Google Fonts](https://fonts.google.com/)
- [Font Squirrel](https://www.fontsquirrel.com/)
- [MyFonts](https://www.myfonts.com/)

### **Free Alternatives:**
If Colmeak isn't available, similar professional fonts:
- **Inter** (Google Fonts) - Modern, clean
- **Poppins** (Google Fonts) - Geometric, friendly  
- **Nunito** (Google Fonts) - Rounded, approachable
- **Source Sans Pro** (Google Fonts) - Professional

### **Update to Use Alternative:**
```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
```

---

## ✅ **Testing Your Font**

### **Step 1: Add Font Files**
Place your Colmeak files in `/public/fonts/`

### **Step 2: Test the Font**
```tsx
// In any component
<div className="font-colmeak text-2xl">
  Test Colmeak Font
</div>
```

### **Step 3: Check Browser**
1. Open Developer Tools (F12)
2. Go to Network tab
3. Reload page
4. Look for font file requests
5. Check if fonts load successfully

---

## 🎨 **SVG Logo Font Integration**

Your SVG logo currently uses:
```css
.cls-1 { font-family: Colmeak; }
```

**This will work automatically** once you:
1. ✅ Add font files to `/public/fonts/`
2. ✅ Configuration is already complete!

---

## 🔧 **Troubleshooting**

### **Font Not Loading?**
1. **Check file paths** - Ensure files are in `/public/fonts/`
2. **Verify file names** - Match exactly with config
3. **Check file formats** - Use .woff2 for best performance
4. **Browser cache** - Hard refresh (Ctrl+Shift+R)

### **SVG Text Not Showing?**
1. **Font loading** - Check if font files loaded
2. **Fallback font** - Add `sans-serif` fallback
3. **Convert to paths** - Alternative solution

### **Performance Issues?**
1. **Use .woff2** - Smallest file size
2. **Preload fonts** - Add to `<head>`
3. **Font display: swap** - Already configured!

---

## 📋 **Next Steps**

1. **🔍 Find Colmeak font** - Purchase or find alternative
2. **📁 Add font files** - Place in `/public/fonts/`
3. **🧪 Test implementation** - Create test component
4. **🎨 Update branding** - Apply to logo and headers
5. **🚀 Deploy changes** - Push to production

Your font configuration is ready! Just add the font files and you're good to go! 🎉