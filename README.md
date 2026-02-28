# 🎂 Birthday Project

A beautiful, animated birthday website with fireworks, photo gallery, and love letter sections!

## 🚀 Running Locally

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## 📸 Adding Photos

You can add photos in two ways:

### Option 1: Add photos directly in the code
Edit `src/pages/Home.jsx` and add your photo URLs to the `INITIAL_PHOTOS` array:

```javascript
const INITIAL_PHOTOS = [
  { id: 1, url: "https://example.com/photo1.jpg", caption: "Our first date" },
  { id: 2, url: "https://example.com/photo2.jpg", caption: "Beach day" },
  // Add more photos here
];
```

### Option 2: Upload photos while running
Click the "Add More Photos" button in the Gallery section. Photos will be stored in your browser's localStorage.

## 🌐 Deploying to GitHub Pages (Share with your girlfriend!)

### Step 1: Create a GitHub repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `birthday-surprise` (can be private or public)
3. Don't initialize with README (you already have one)

### Step 2: Push your code to GitHub
```bash
git init
git add .
git commit -m "Initial birthday project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" → "Pages" (in the left sidebar)
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"
4. The site will automatically deploy when you push changes!

### Step 4: Get your link
After a few minutes, your site will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

Share this link with your girlfriend! 💝

## 🎨 Customizing

All the birthday components are in `src/components/birthday/`:
- `HeroSection.jsx` - Welcome screen
- `LoveLetterSection.jsx` - Your love letter
- `PhotoGallery.jsx` - Photo gallery
- `CakeScene.jsx` - Birthday cake animation
- `ShareSection.jsx` - Share buttons

Edit these files to customize the content!

## 📝 Notes

- Photos uploaded through the UI are stored in browser localStorage (they won't be lost on refresh)
- The site works completely offline after first load
- No database needed - everything runs in the browser!

## 🎉 Perfect for March 2nd!

Make sure to push your changes before March 2nd so your girlfriend can see it! 💕
