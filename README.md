# Task Manager App

A modern, streamlined productivity tool with real-time collaboration features built with Vue.js, Firebase, and PWA capabilities.

## Features

- **Real-time Collaboration**: Tasks sync instantly across all devices using Firebase Firestore
- **Google Authentication**: Secure sign-in with Google OAuth
- **Task Management**: Create, edit, delete, and organize tasks with priorities
- **Filter & Sort**: View all tasks, active tasks, completed tasks, or high-priority tasks
- **Progressive Web App**: Install on any device and use offline
- **Responsive Design**: Beautiful interface that works on desktop, tablet, and mobile
- **Real-time Updates**: See changes immediately as they happen

## Tech Stack

- **Frontend**: Vue 3 + TypeScript + Vite
- **State Management**: Pinia
- **Backend**: Firebase (Authentication + Firestore)
- **PWA**: Vite PWA Plugin with Workbox
- **Styling**: Modern CSS with gradients and animations

## Prerequisites

Before you begin, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- A Firebase account (free tier works great)

## Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable **Google Authentication**:
   - Go to Authentication > Sign-in method
   - Enable Google as a sign-in provider
4. Create a **Firestore Database**:
   - Go to Firestore Database
   - Create database (start in production mode or test mode)
   - Add security rules (see below)
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and click the web icon (</>)
   - Copy the configuration object

### Firestore Security Rules

Add these security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         request.auth.uid in resource.data.get('assignedTo', []));
    }
  }
}
```

## Installation

1. Clone the repository or navigate to the project directory:

```sh
cd task-manager-app
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the root directory by copying the example:

```sh
cp .env.example .env
```

4. Edit the `.env` file and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Development

Run the development server with hot-reload:

```sh
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

Build and optimize for production:

```sh
npm run build
```

The optimized files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```sh
npm run preview
```

## PWA Installation

Once deployed, users can install the app as a PWA:

- **Desktop (Chrome/Edge)**: Click the install icon in the address bar
- **Mobile (iOS)**: Safari > Share > Add to Home Screen
- **Mobile (Android)**: Chrome > Menu > Add to Home Screen

## Project Structure

```
task-manager-app/
├── src/
│   ├── components/        # Vue components
│   │   ├── AppHeader.vue  # Main header with stats
│   │   ├── LoginView.vue  # Authentication screen
│   │   ├── TaskForm.vue   # Form to create new tasks
│   │   ├── TaskList.vue   # List of tasks with filters
│   │   └── TaskItem.vue   # Individual task component
│   ├── stores/            # Pinia stores
│   │   ├── auth.ts        # Authentication state
│   │   └── tasks.ts       # Tasks state with Firestore sync
│   ├── firebase/          # Firebase configuration
│   │   └── config.ts      # Firebase initialization
│   ├── App.vue            # Main app component
│   └── main.ts            # App entry point
├── public/                # Static assets
├── .env.example           # Environment variables template
└── vite.config.ts         # Vite configuration with PWA
```

## Usage

1. **Sign In**: Click "Continue with Google" to authenticate
2. **Add Tasks**: Fill in the task form with title, description, and priority
3. **Manage Tasks**:
   - Click the checkbox to mark tasks as complete
   - Click the edit icon to modify task details
   - Click the delete icon to remove tasks
4. **Filter Tasks**: Use the filter tabs to view different task categories
5. **Real-time Sync**: Changes appear instantly on all your devices

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur if installed)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers with PWA support

## Troubleshooting

**Issue**: Firebase authentication not working
- Make sure Google sign-in is enabled in Firebase Console
- Check that your Firebase config is correct in `.env`

**Issue**: Tasks not syncing
- Verify Firestore security rules are set up correctly
- Check browser console for Firebase errors

**Issue**: PWA not installing
- Make sure you're using HTTPS (or localhost for development)
- Check that the manifest and service worker are properly configured

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
