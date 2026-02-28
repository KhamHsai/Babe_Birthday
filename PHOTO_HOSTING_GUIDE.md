# 📸 Photo Hosting Guide

Since we removed the Base44 database, you need to host your photos somewhere. Here are your options:

## Option 1: Use Image Hosting Services (Recommended)

### Imgur (Free & Easy)
1. Go to https://imgur.com
2. Click "New post"
3. Upload your photos
4. Right-click each photo → "Copy image address"
5. Use those URLs in your code

Example:
```javascript
const INITIAL_PHOTOS = [
  { id: 1, url: "https://i.imgur.com/abc123.jpg", caption: "Our first date" },
  { id: 2, url: "https://i.imgur.com/def456.jpg", caption: "Beach day" },
];
```

### Other Free Options:
- **ImgBB**: https://imgbb.com (no account needed!)
- **Postimages**: https://postimages.org
- **ImageShack**: https://imageshack.com

## Option 2: Use GitHub Repository

You can store photos directly in your GitHub repo:

1. Create a `public/photos` folder in your project
2. Add your photos there
3. Reference them like this:

```javascript
const INITIAL_PHOTOS = [
  { id: 1, url: "./photos/photo1.jpg", caption: "Our first date" },
  { id: 2, url: "./photos/photo2.jpg", caption: "Beach day" },
];
```

**Pros**: Everything in one place
**Cons**: Makes your repo larger, photos are public if repo is public

## Option 3: Upload via the Website

When you run the site locally or after deployment:
1. Click "Add More Photos" button
2. Select photos from your computer
3. They'll be converted to base64 and stored in localStorage

**Pros**: Super easy, no external hosting needed
**Cons**: 
- Photos only stored in that browser
- Can make localStorage large (5-10MB limit)
- Won't show up for your girlfriend unless you share your browser

## Option 4: Use Google Photos or Dropbox

### Google Photos:
1. Upload photos to Google Photos
2. Open a photo → Share → Create link
3. Get the direct image URL (might need to modify the link)

### Dropbox:
1. Upload to Dropbox
2. Right-click → Share → Create link
3. Change `?dl=0` to `?raw=1` at the end of the URL

## Recommended Approach:

**For the best experience:**

1. **Before deployment**: Use Imgur or ImgBB to host 5-10 special photos
2. **Add URLs to code**: Put them in `INITIAL_PHOTOS` array
3. **Test locally**: Make sure all photos load
4. **Deploy**: Push to GitHub Pages
5. **Share**: Send the link to your girlfriend!

## Example Setup:

```javascript
// In src/pages/Home.jsx
const INITIAL_PHOTOS = [
  { 
    id: 1, 
    url: "https://i.imgur.com/abc123.jpg", 
    caption: "The day we met ❤️" 
  },
  { 
    id: 2, 
    url: "https://i.imgur.com/def456.jpg", 
    caption: "Our first vacation together" 
  },
  { 
    id: 3, 
    url: "https://i.imgur.com/ghi789.jpg", 
    caption: "Your beautiful smile" 
  },
  { 
    id: 4, 
    url: "https://i.imgur.com/jkl012.jpg", 
    caption: "Making memories" 
  },
  { 
    id: 5, 
    url: "https://i.imgur.com/mno345.jpg", 
    caption: "Forever and always 💕" 
  },
];
```

## Tips:

- ✅ Use high-quality photos (but not too large - under 2MB each)
- ✅ Test all photo URLs before deploying
- ✅ Add meaningful captions
- ✅ Mix different types of photos (selfies, landscapes, candid moments)
- ✅ Keep it personal and special

## Quick Test:

After adding photos, run:
```bash
npm run dev
```

Navigate to the Gallery section and make sure all photos load correctly!

---

Need help? The photos are loaded in `src/pages/Home.jsx` (line ~20) and displayed in `src/components/birthday/PhotoGallery.jsx`.
