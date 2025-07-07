# BitCraft Companion App

A mobile companion app for BitCraft Online that allows users to manage their claims, empires, and interact with the BitCraft world from their mobile devices.

## Features

- **Dashboard**: Overview of user stats, claims, and empires
- **World Map**: Interactive map to explore the BitCraft world
- **Chat System**: Real-time communication with empire members and global chat
- **Claims Management**: Monitor and manage your BitCraft claims
- **Profile Management**: User settings and account management
- **Push Notifications**: Real-time alerts for important events
- **Offline Support**: Basic functionality when offline

## Tech Stack

### Frontend (Mobile App)
- **React Native** 0.72.6
- **TypeScript** 4.8.4
- **Tailwind CSS** (via NativeWind)
- **React Navigation** 6.x
- **React Native Paper** (Material Design components)
- **Axios** (HTTP client)
- **AsyncStorage** (local storage)

### Backend (API Server)
- **Node.js** 18+
- **Express.js** 4.18.2
- **MongoDB** (database)
- **Redis** (caching & sessions)
- **Socket.io** (real-time communication)
- **JWT** (authentication)
- **Helmet** (security)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **MongoDB** (local or cloud instance)
- **Redis** (local or cloud instance)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bitcraft-companion-app.git
cd bitcraft-companion-app
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Environment Configuration

```bash
# Copy environment example files
cp env.example .env
cp backend/env.example backend/.env

# Edit the environment files with your configuration
# See env.example for all required variables
```

### 4. Database Setup

```bash
# Start MongoDB (if running locally)
mongod

# Start Redis (if running locally)
redis-server
```

### 5. BitCraft API Configuration

You'll need to obtain API credentials from BitCraft Online:

1. Register for a BitCraft developer account
2. Create an API key in the developer portal
3. Add the API key to your `.env` file:
   ```
   BITCRAFT_API_KEY=your-api-key-here
   BITCRAFT_API_BASE=https://api.bitcraft.com
   ```

## Development

### Starting the Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:3000`

### Starting the Mobile App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios
```

### Development Scripts

```bash
# Frontend
npm start          # Start Metro bundler
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run test       # Run tests
npm run lint       # Run ESLint
npm run type-check # Run TypeScript check

# Backend
cd backend
npm run dev        # Start development server
npm run test       # Run tests
npm run lint       # Run ESLint
```

## Project Structure

```
bitcraft-companion-app/
├── src/                    # Frontend source code
│   ├── components/         # Reusable components
│   ├── screens/           # Screen components
│   ├── navigation/        # Navigation configuration
│   ├── context/           # React Context providers
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── hooks/             # Custom React hooks
│   ├── store/             # State management
│   └── assets/            # Images, fonts, etc.
├── backend/               # Backend source code
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   └── config/        # Configuration files
│   └── tests/             # Backend tests
├── android/               # Android-specific files
├── ios/                   # iOS-specific files
└── docs/                  # Documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### BitCraft Integration
- `GET /api/bitcraft/world-map` - Get world map data
- `GET /api/bitcraft/claims` - Get user claims
- `GET /api/bitcraft/empires` - Get user empires
- `GET /api/bitcraft/resources` - Get resources in area
- `GET /api/bitcraft/server-status` - Get server status

### Chat
- `GET /api/chat/messages` - Get chat messages
- `POST /api/chat/messages` - Send message
- `GET /api/chat/channels` - Get available channels

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/settings` - Get user settings
- `PUT /api/user/settings` - Update user settings

## Deployment

### Backend Deployment

1. **Environment Setup**
   ```bash
   # Set production environment variables
   NODE_ENV=production
   PORT=3000
   ```

2. **Database Setup**
   - Set up MongoDB Atlas or AWS DocumentDB
   - Set up Redis Cloud or AWS ElastiCache
   - Update connection strings in environment variables

3. **Deploy to Platform**
   ```bash
   # Example: Deploy to Heroku
   heroku create bitcraft-companion-backend
   heroku config:set NODE_ENV=production
   git push heroku main
   ```

### Mobile App Deployment

1. **Android (Google Play Store)**
   ```bash
   # Build release APK
   cd android
   ./gradlew assembleRelease
   
   # Or build AAB for Play Store
   ./gradlew bundleRelease
   ```

2. **iOS (App Store)**
   ```bash
   # Build for App Store
   cd ios
   xcodebuild -workspace BitcraftCompanion.xcworkspace \
     -scheme BitcraftCompanion \
     -configuration Release \
     -destination generic/platform=iOS \
     -archivePath BitcraftCompanion.xcarchive archive
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

```bash
# Frontend tests
npm test

# Backend tests
cd backend
npm test

# Run all tests
npm run test:all
```

## Security

- All API endpoints are protected with JWT authentication
- Rate limiting is implemented to prevent abuse
- Input validation and sanitization
- CORS configuration for security
- Helmet.js for security headers
- Environment variables for sensitive data

## Support

For support and questions:

- Create an issue on GitHub
- Join our Discord server
- Email: support@bitcraftcompanion.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- BitCraft Online team for providing the API
- React Native community for the excellent framework
- All contributors and beta testers

---

**Note**: This app is not officially affiliated with BitCraft Online. It's a community-created companion app that uses BitCraft's open-source APIs.