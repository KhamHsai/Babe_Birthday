# How to Add Photos

## Step 1: Upload photos to Imgur

1. Go to https://imgur.com
2. Click "New post"
3. Upload your photos
4. Right-click each photo → "Copy image address"
5. You'll get URLs like: `https://i.imgur.com/abc123.jpg`

## Step 2: Add URLs to code

Open `src/pages/Home.jsx` and find line ~34:

```javascript
const INITIAL_PHOTOS = [
  { id: 1, url: "https://i.imgur.com/EXAMPLE1.jpg", caption: "Beautiful moment" },
  { id: 2, url: "https://i.imgur.com/EXAMPLE2.jpg", caption: "Our memories" },
  { id: 3, url: "https://i.imgur.com/EXAMPLE3.jpg", caption: "Together" },
];
```

Replace the URLs with your Imgur links:

```javascript
const INITIAL_PHOTOS = [
  { id: 1, url: "https://i.imgur.com/YOUR_PHOTO_1.jpg", caption: "Our first date" },
  { id: 2, url: "https://i.imgur.com/YOUR_PHOTO_2.jpg", caption: "Beach day" },
  { id: 3, url: "https://i.imgur.com/YOUR_PHOTO_3.jpg", caption: "Your smile" },
  { id: 4, url: "https://i.imgur.com/YOUR_PHOTO_4.jpg", caption: "Together forever" },
];
```

## Done!

The photos will show up for everyone who visits the site. Your girlfriend will see them automatically - no upload needed!
