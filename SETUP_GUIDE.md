# BitCraft Companion App - Setup Guide

## Quick Start (Using Mock Data)

Since BitCraft APIs are not yet publicly available, this guide will help you get the app running with mock data for development and testing.

### Prerequisites

Make sure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- React Native CLI
- Android Studio (for Android) or Xcode (for iOS)

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies (optional for now)
cd backend
npm install
cd ..
```

### Step 2: Environment Setup

```bash
# Copy environment files
cp env.example .env
cp backend/env.example backend/.env
```

Edit `.env` file and set:
```
BITCRAFT_API_KEY=mock-key
BITCRAFT_API_BASE=http://localhost:3000/api
```

### Step 3: Start Development

#### Option A: Frontend Only (Recommended for now)
```bash
# Start Metro bundler
npm start

# In a new terminal, run on Android
npm run android

# Or run on iOS (macOS only)
npm run ios
```

#### Option B: Full Stack (Backend + Frontend)
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
npm start

# Terminal 3: Run on device
npm run android  # or npm run ios
```

### Step 4: Test the App

The app will now run with mock data including:
- **Dashboard**: Shows mock user stats and quick actions
- **World Map**: Displays a simulated BitCraft world with claims and resources
- **Chat**: Functional chat interface with mock messages
- **Claims**: Mock user claims and empire data
- **Profile**: User profile management

### Mock Data Features

The app includes realistic mock data for:
- ✅ World map with claims and resources
- ✅ User claims and empires
- ✅ Chat messages in different channels
- ✅ Server status and player information
- ✅ Resource management
- ✅ User authentication (simulated)

### When Real APIs Become Available

When BitCraft releases their public APIs:

1. **Get API Access**:
   - Visit https://bitcraftonline.com
   - Look for developer documentation
   - Register for API access

2. **Update Configuration**:
   ```bash
   # Update your .env file
   BITCRAFT_API_KEY=your-real-api-key
   BITCRAFT_API_BASE=https://api.bitcraft.com
   ```

3. **Test Real Integration**:
   - The app will automatically switch from mock data to real APIs
   - All existing functionality will work with real BitCraft data

### Development Tips

- **Mock Data**: All API calls fall back to mock data if the real API is unavailable
- **Hot Reload**: Changes to the code will automatically reload in the app
- **Debugging**: Use React Native Debugger or Chrome DevTools
- **Testing**: The mock data provides a realistic testing environment

### Troubleshooting

**Common Issues:**

1. **Metro bundler issues**:
   ```bash
   npm start -- --reset-cache
   ```

2. **Android build issues**:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

3. **iOS build issues**:
   ```bash
   cd ios
   pod install
   cd ..
   npm run ios
   ```

4. **Dependencies issues**:
   ```bash
   rm -rf node_modules
   npm install
   ```

### Next Steps

1. **Customize the UI**: Modify colors, layouts, and components
2. **Add Features**: Implement additional functionality
3. **Test on Device**: Test on physical devices for best experience
4. **Prepare for Release**: Set up app signing and store listings

### Support

- Check the main README.md for detailed documentation
- Create issues on GitHub for bugs or feature requests
- Join the BitCraft community for updates on API availability

---

**Note**: This setup uses mock data to simulate the BitCraft experience. When real APIs become available, the app will seamlessly transition to using real data. 

---

## How to Fix

### 1. Add Android SDK to Your PATH

- Open Android Studio.
- Go to **Tools > SDK Manager**.
- Note the SDK path (e.g., `C:\Users\<your-user>\AppData\Local\Android\Sdk`).
- Add the following to your system PATH (instructions below):

  ```
  C:\Users\<your-user>\AppData\Local\Android\Sdk\platform-tools
  ```

#### How to Add to PATH (Windows 10/11)
1. Press `Win + S` and search for "Environment Variables".
2. Click "Edit the system environment variables".
3. Click "Environment Variables".
4. Under "System variables", find and select `Path`, then click "Edit".
5. Click "New" and paste your SDK `platform-tools` path.
6. Click OK on all dialogs.

---

### 2. Create and Start an Android Emulator

- Open Android Studio.
- Go to **Tools > Device Manager**.
- Click "Create Device" and follow the prompts to create a new emulator (AVD).
- Once created, click the "Play" button to start the emulator.

---

### 3. Try Again

With the emulator running and `adb` in your PATH, run:
```bash
npm run android
```

---

## Summary

- Add Android SDK's `platform-tools` to your PATH.
- Create and start an emulator in Android Studio.
- Try running the app again.

Would you like step-by-step screenshots or more detailed instructions for any of these steps? 