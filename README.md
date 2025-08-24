# Islamic Community Platform

A beautiful, modern Islamic community platform homepage/dashboard built with React and Tailwind CSS. This platform serves as a welcoming digital space for Muslims to connect, access prayer times, and enrich their spiritual journey.

## ✨ Features

### 🕌 Hero Section
- Islamic greetings in Arabic and English
- Current Hijri date display
- Beautiful gradient background with Islamic patterns
- Responsive design for all devices

### 🕐 Prayer Times Widget
- Real-time prayer times for current location
- Countdown timer to next prayer
- All 5 daily prayers with beautiful icons
- Prayer reminders and tips
- Highlighted next prayer with special styling

### 📖 Daily Spiritual Content
- **Daily Hadith**: Arabic text with English translation, source citation, and explanation
- **Quranic Reflection**: Verse of the day with translation and reflection
- Interactive refresh functionality for new content
- Beautiful typography and Islamic styling

### 🧭 Quick Navigation
- 6 main platform sections with intuitive icons
- Islamic Guide, Donations, Prayer Times, Calendar, Opportunities, Stories
- Hover effects and smooth animations
- Call-to-action for community engagement

### 🎨 Design Features
- Islamic color scheme (Emerald green, Gold accents)
- Glass-morphism effects and subtle shadows
- Responsive grid layouts
- Smooth animations and transitions
- Arabic font support for proper text rendering

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd islamic-community-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Build for Production

```bash
npm run build
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Mobile**: Stacked layout with larger touch targets
- **Tablet**: 2-column layout for spiritual content
- **Desktop**: Full layout with proper spacing and hover effects

## 🎯 Key Components

- `Hero.js` - Welcome section with Islamic greetings
- `PrayerTimesWidget.js` - Prayer times and countdown
- `SpiritualContent.js` - Hadith and Quran sections
- `QuickNavigation.js` - Platform navigation grid
- `HomePage.js` - Main component combining all sections

## 🔧 Customization

### Colors
The platform uses a custom Islamic color palette defined in `tailwind.config.js`:
- Primary: Emerald green (#10B981, #059669)
- Secondary: Gold/amber (#F59E0B, #D97706)
- Text: Charcoal grays (#374151, #6B7280)

### Fonts
- **English**: Poppins (Google Fonts)
- **Arabic**: Noto Sans Arabic (Google Fonts)

### Adding New Features
1. Create new components in the `src/components/` directory
2. Import and use them in `HomePage.js`
3. Add any new dependencies to `package.json`
4. Update Tailwind config if adding new custom styles

## 📊 Data Management

Currently uses mock data located in `src/data/mockData.js`. To integrate with real APIs:
1. Replace mock data functions with API calls
2. Add error handling and loading states
3. Implement proper state management (Redux/Context API)

## 🌟 Future Enhancements

- [ ] Real-time prayer times API integration
- [ ] User authentication and profiles
- [ ] Community forum and discussions
- [ ] Islamic calendar with events
- [ ] Audio recitations of Quran and Hadith
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Push notifications for prayer times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Islamic community members for inspiration and feedback
- Open source community for amazing tools and libraries
- Design inspiration from modern Islamic websites and apps

## 📞 Support

For support and questions:
- Email: info@islamiccommunity.com
- Create an issue in the GitHub repository
- Join our community discussions

---

**May Allah guide us all to the straight path. Ameen.** 🤲
