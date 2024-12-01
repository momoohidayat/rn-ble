# rn-ble

Searching for Bluetooth Low Energy (BLE) peripherals **(only for iOS for now)**

![screenrecord-rnble](https://github.com/user-attachments/assets/b750d2a7-1e6a-4c6f-9262-86e68240f073)

## Installation

go to example folder using `cd example`

run `yarn install` to install all of example project dependency

run `npm install ../` to install the library into example project

go to ios folder using `cd ios` and run `pod install`

build the `.xcworkspace` file usng xcode to your device

## Note

- You may need to setup your code signings in the xcode to build into your device
- doesn't work on simulator since iOS simulator don't have bluetooth capability
