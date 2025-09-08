<h1 align="center">mBALING Project Mobile App</h1>

The mBALING project is a student housing management system for on-campus housing establishments in the Mindanao State University campus. It is intended to assist the university Housing Management Division in the record-keeping of non-dormitory-residing students' residential data, and to bring the current housing marketing and searching methods in the campus online. It consists of a mobile application that manages the activities and displays the contents posted by users, and a desktop admin system that administers user records and the creation and deletion of user accounts.

## Overview

The mBALING app serves as the mobile counterpart of the project, where all user activities take place. Test the app demo with:

> Use **demo_landlord** with password **@demo123** for landlord users.

> Use **demo_student** with password **@demo123** for student users.

## Getting Started

### Install dependencies

```sh
pnpm install
```

### Development

1. Copy `.env.sample` to `.env` and configure as needed.
2. Start the development server:

```sh
pnpm start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Testing

Use the following mock users for testing during development:

> Use **kuhei.yamyam** with password **@test123** for student user with housing data.

> Use **aiko_lihannan** with password **@test123** for student user without housing data.

> Use **cozycorner_amina** with password **@test123** for landlord user with only list of tenants.

> Use **castro.bedspace** with password **@test123** for landlord user with only list of applicants.

> Use **macarambon_central** with password **@test123** for landlord user without lists of tenants & applicants.

Demo users are also used for testing.

> Use **demo_student** with password **@demo123** for student user with application data.

> Use **demo_landlord** with password **@demo123** for landlord user with lists of tenants & applicants.

## Project Team

- **Lead Developer:** [Abdul Moiz Solaiman](https://www.linkedin.com/in/amsolaiman/)
