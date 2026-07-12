# Success Story School Android

Native Android app for the Success Story School portal.

## What it uses

- Kotlin + Jetpack Compose
- The same live backend as the website and iOS app: `https://successsstoryschool.mooo.com`
- The same Neon database through the existing REST APIs
- No WebView and no separate app database

## Included flows

- Student sign in with email MFA when the backend requires it
- Student account request with admin approval
- Teacher sign in and classroom overview
- Parent sign in and parent account request
- Native dashboard cards for school records, attendance, homework, fees, announcements, and children

## Open in Android Studio

Open this folder:

```text
/Users/omar/Code/SSS/SSSAndroid
```

Then let Android Studio sync Gradle and run the `app` target on an emulator or phone.
