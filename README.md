# Project Setup Guide

## Cloning the Repository
To get started with this project, clone the repository:
```sh
git clone https://github.com/vishalpokuri/coindcx-native-v2sdk-test.git
cd coindcx-native-v2sdk-test
```

## Important Note
⚠️ **Caution:** This app must be built and run as a compiled version. It **does not** work with Expo Go.

## Installation Steps

### 1. Install Dependencies
Run the following command to install required dependencies:
```sh
npx expo install
```

### 2. Modify Node Modules
After installation, navigate to the following directories and modify the specified lines:

#### File: `node_modules\@okto_web3\react-native-sdk\dist\commonjs\userop\index.js`
Change this line:
```js
var _userop = require("@okto_web3/core-js-sdk/userop");
```
to:
```js
var _userop = require("@okto_web3/core-js-sdk/dist/userop");
```

#### File: `node_modules\@okto_web3\react-native-sdk\dist\commonjs\explorer\index.js`
Change this line:
```js
var _explorer = require("@okto_web3/core-js-sdk/explorer");
```
to:
```js
var _explorer = require("@okto_web3/core-js-sdk/dist/explorer");
```

### 3. Prebuild the Project
Run the following command to create a keystore and set up the necessary configurations:
```sh
npx expo prebuild
```

### 4. Configure Google Sign-In
To enable `@react-native-google-signin/google-signin`, you need to configure Google Cloud Console:

#### Steps:
- Create **two clients** in Google Cloud Console:
  1. Web Client *(Refer to the provided screenshot for details)*
![image](https://github.com/user-attachments/assets/21b6b465-f822-4cf2-bb98-c43cd9c600f4)

  ⚠️ **WARNING:** You still need the `androidClientId` for Android apps.
  2. Android Client
- For the Android Client:
  - Find the package name in `app.json` under `expo.android.package`
  - Ensure you get the correct SHA-1 key for the Android Client to initialize in Google Cloud.
  
#### Steps to Follow for correct SHA-1 key:
1. If you are using `eas` to build the production app, the `@react-native-google-signin/google-signin` package does **not** allow you to use `eas credentials`'s SHA-1 key. You **must** generate the key manually using:
   ```sh
   keytool -keystore path/to/debug.keystore -list -v
   ```
   Otherwise, you will get the infamous `DEVELOPER_ERROR` or **status code 10** error. **This is the most important step.**
   - Refer to this solution: [GitHub Issue #1358](https://github.com/react-native-google-signin/google-signin/issues/1358)
2. If the issue persists, make sure you followed all the steps in this troubleshooting guide: [Google Sign-In Troubleshooting](https://react-native-google-signin.github.io/docs/troubleshooting#developer_error)

### 5. Update your keys
Update the credentials with the credentials that are obtained from the google console in constants/keys.ts

### 6. Build and Run the App
Finally, build and run the project using:
```sh
npx expo run:android
```

The app should now be set up and running successfully! 🎉

