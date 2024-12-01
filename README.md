# rn-ble

Searching for Bluetooth Low Energy (BLE) peripherals **(only for iOS for now)**

![ScreenRecording_12-01-2024 12-43-43_1](https://github.com/user-attachments/assets/74e68c90-f663-4517-9eb8-e6a5dcd595e8)


## Installation

go to example folder using `cd example`

run `yarn install` to install all of example project dependency

run `npm install ../` to install the library into example project

go to ios folder using `cd ios` and run `pod install`

build the `.xcworkspace` file usng xcode to your device

## Note

- You may need to setup your code signings in the xcode to build into your device
- doesn't work on simulator since iOS simulator don't have bluetooth capability
