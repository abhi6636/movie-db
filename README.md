# 🎬 MovieDB - Animated Movie Database

A beautiful, animated movie database website built with React, Vite, TypeScript, and SCSS. Features rich animations, colorful movie cards, animated search with suggestions, and a Cupertino-style theme toggle.

## ✨ Features

- 🎨 **Beautiful Animations**: Smooth transitions and micro-interactions throughout
- 🌈 **Colorful Movie Cards**: Each card has unique gradient backgrounds
- 🔍 **Animated Search Bar**: Real-time search with dropdown suggestions
- 🌙 **Dark/Light Mode**: Cupertino-style toggle with smooth transitions
- 📱 **Fully Responsive**: Works perfectly on all screen sizes
- 🎬 **Movie Categories**: Browse trending, popular, top-rated, and upcoming movies
- 🎭 **Detailed Modals**: Click any movie to see detailed information

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-db
```

2. Install dependencies:
```bash
npm install
```

3. **Get TMDB API Key**:
   - Go to [TMDB](https://www.themoviedb.org/settings/api)
   - Create an account and request an API key
   - Copy your API key

4. **Configure API Key**:
   - Open `src/services/movieApi.ts`
   - Replace `YOUR_TMDB_API_KEY` with your actual API key:
   ```typescript
   const API_KEY = 'your_actual_api_key_here';
   ```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## 🎨 Design Features

### Animations
- **Movie Cards**: Staggered entrance animations with spring physics
- **Search Bar**: Smooth width expansion and suggestion dropdown
- **Theme Toggle**: Cupertino-style slider with icon transitions
- **Hover Effects**: Scale, glow, and shadow transformations
- **Modal Animations**: Scale and fade effects with backdrop blur

### Color Scheme
- **Light Mode**: Clean whites with vibrant gradients
- **Dark Mode**: Deep blacks with neon accents
- **Movie Cards**: Each card has a unique gradient based on movie ID
- **Rating Colors**: Dynamic color coding based on movie ratings

### Responsive Design
- **Desktop**: 4-column grid layout
- **Tablet**: 2-3 column layout
- **Mobile**: Single column with optimized touch targets

## 🛠️ Technologies Used

- **React 19**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **SCSS**: Handcrafted styles with variables and mixins
- **Framer Motion**: Advanced animations and gestures
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client for API requests
- **TMDB API**: Comprehensive movie database

## 📁 Project Structure

```
src/
├── components/
│   ├── MovieCard.tsx      # Animated movie card component
│   ├── SearchBar.tsx      # Animated search with suggestions
│   └── ThemeToggle.tsx    # Cupertino-style theme toggle
├── hooks/
│   └── useTheme.tsx       # Theme context and hook
├── services/
│   └── movieApi.ts        # TMDB API integration
├── App.tsx                # Main application component
├── App.scss               # Global styles and animations
└── main.tsx               # Application entry point
```

## 🎯 Key Components

### MovieCard
- Animated entrance with staggered delays
- Hover effects with poster zoom
- Overlay with movie details
- Dynamic gradient backgrounds
- Rating bar animation

### SearchBar
- Animated width expansion on focus
- Debounced search with loading states
- Dropdown suggestions with movie posters
- Clear button functionality

### ThemeToggle
- Cupertino-style slider design
- Smooth icon transitions (sun/moon)
- Persistent theme preference
- System preference detection

## 🌟 Animation Details

### Entrance Animations
- Movie cards fade in with staggered timing
- Category buttons slide down sequentially
- Search bar expands smoothly on focus

### Micro-interactions
- Button scale effects on hover/tap
- Card lift and shadow on hover
- Smooth color transitions in theme toggle
- Loading spinners with rotation animations

### Page Transitions
- Modal fade and scale effects
- Grid layout reorganization
- Smooth scrolling behavior

## 🔧 Customization

### Adding New Categories
1. Add category to the `categories` array in `App.tsx`
2. Update the `fetchMovies` function switch statement
3. Add corresponding API call in `movieApi.ts`

### Modifying Animations
- Edit timing and easing in `App.scss`
- Adjust Framer Motion props in components
- Customize spring physics for different effects

### Theme Customization
- Modify CSS variables in `App.scss`
- Add new color schemes
- Update gradient definitions

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with CSS Grid support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie database API
- [Framer Motion](https://www.framer.com/motion/) for the amazing animation library
- [Lucide](https://lucide.dev/) for the beautiful icon set

---

**Note**: Make sure to replace the TMDB API key in `src/services/movieApi.ts` before running the application. The app will show an error message if the API key is not properly configured.
