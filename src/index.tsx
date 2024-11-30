import { NativeEventEmitter, NativeModules } from 'react-native';

// Access the BLEScanner native module
const { RnBle } = NativeModules;

interface Peripheral {
  identifier: string;
  name: string;
  rssi: number;
  advertisementData: any;
}

class RnBleModule {
  private eventEmitter: NativeEventEmitter;

  constructor() {
    this.eventEmitter = new NativeEventEmitter(RnBle);
  }

  // Start scanning for BLE devices
  startScan(): void {
    RnBle.startScan();
  }

  // Stop scanning for BLE devices
  stopScan(): void {
    RnBle.stopScan();
  }

  // Subscribe to peripheral discovered events
  onPeripheralDiscovered(callback: (peripheral: Peripheral) => void): void {
    this.eventEmitter.addListener(
      'PeripheralDiscovered',
      (peripheral: Peripheral) => callback(peripheral)
    );
  }

  // Subscribe to scan start/stop events
  onScanStart(callback: () => void): void {
    this.eventEmitter.addListener('ScanStarted', callback);
  }

  onFailedScan(callback: (message: string) => void) {
    this.eventEmitter.addListener('FailedScan', (message: string) => callback(message));
  }

  onScanStop(callback: () => void): void {
    this.eventEmitter.addListener('ScanStopped', callback);
  }

  onBLEStateChange(callback: (message: string) => void) {
    this.eventEmitter.addListener('BLEState', (message: string) => callback(message));
  }

  // Remove all event listeners (cleanup)
  removeListeners(): void {
    this.eventEmitter.removeAllListeners('ScanStarted');
    this.eventEmitter.removeAllListeners('FailedScan');
    this.eventEmitter.removeAllListeners('ScanStopped');
    this.eventEmitter.removeAllListeners('BLEState');
    this.eventEmitter.removeAllListeners('PeripheralDiscovered');
  }
}

export default new RnBleModule();
