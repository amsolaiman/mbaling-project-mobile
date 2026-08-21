# mBALING Mobile App

A role-based mobile housing application for students and landlords. mBALING lets users discover and manage housing listings, view landlord profiles, submit housing applications, and maintain their account and profile details from an Expo-powered mobile app.

```
The mBALING project is a student housing management system for
on-campus housing establishments at Mindanao State University.

Designed to assist the university's Housing Management Division
in maintaining records of non-dormitory students' residential
information while also bringing the campus's current housing
marketing and search processes online.
```

## Overview

- **App framework:** Expo SDK 56 with Expo Router
- **Language:** Typescript
- **UI:** React Native, React Native Paper
- **Authentication:** JWT, Context-based authentication
- **Forms and validation:** React Hook Form, Yup
- **Networking:** Axios
- **Package manager:** pnpm 10
- **Supported targets:** Android, iOS

## Getting Started

### Prerequisites

- Node.js
- pnpm
- Expo-compatible development tooling, such as Expo Go, an Android emulator, or an iOS simulator

Install dependencies:

```bash
pnpm install
```

### Environment Variables

Create a local environment file from the provided template:

```bash
copy .env.sample .env
```

Configure these values in `.env`:

- `SYSTEM_TYPE` - must be set to `app`
- `EXPO_PUBLIC_HOST_API` - URL of the mBALING backend API
- `EXPO_PUBLIC_PSGC_API` - URL of the PSGC geographic data API

The `prestart` script validates these variables before the Expo server starts.

### Start the App

Start the development server:

```bash
pnpm start
```

Open the app with one of the available targets:

```bash
pnpm android
pnpm ios
```

You can also use the interactive options printed by `pnpm start` to launch the app in Expo Go or a development build.

## Demo / Testing

Use the following demo users for testing the app:

> Use **demo_student** with password **@demo123** for student user.

> Use **demo_landlord** with password **@demo123** for landlord user.

## Directory Structure

```
src/
├── app/                  # Expo Router (screens, layouts, etc.)
│
├── auth/                 # Authentication context and tools
│
├── components/           # Shared UI/feature components
│
├── constants/            # Application constants
│
├── hooks/                # Shared custom utility hooks
│
├── screens/              # Feature-level screen views and supporting components
│
├── styles/               # Theme configuration (colors, fonts, etc.)
│
├── types/                # TypeScript type definitions
│
└── utils/                # Shared utility functions

assets/                   # Project assets (app icons, custom fonts, etc.)

scripts/                  # Development scripts
```

## API Integration

The Axios client uses `EXPO_PUBLIC_HOST_API` as its base URL. It provides access to authentication, landlord, student, post listing, post search, and profile-related endpoints.

The app uses `EXPO_PUBLIC_PSGC_API` for Philippine geographic data used by address and campus-related forms. See the [PSGC API documentation](https://psgc.gitlab.io/) for more information.

## Learn More

- [Expo](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [Conventional Commits](https://www.conventionalcommits.org/en)
