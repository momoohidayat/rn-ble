import Foundation
import CoreBluetooth
import React

@objc(RnBle)
class RnBle: RCTEventEmitter, CBCentralManagerDelegate {
    
    private var centralManager: CBCentralManager!
    private var peripheralDiscoveredCallback: RCTResponseSenderBlock?
    
    override init() {
        super.init()
        self.centralManager = CBCentralManager(delegate: self, queue: nil)
    }
    
    // Start scanning for peripherals
    @objc func startScan() {
        if centralManager.state == .poweredOn {
            centralManager.scanForPeripherals(withServices: nil, options: nil)
            sendEvent(withName: "ScanStarted", body: nil)
        } else {
            sendEvent(withName: "FailedScan", body: "Bluetooth is off")
        }
    }
    
    // Stop scanning for peripherals
    @objc func stopScan() {
        if centralManager.isScanning {
            centralManager.stopScan()
            sendEvent(withName: "ScanStopped", body: nil)
        }
    }
    
    // CBCentralManagerDelegate Methods
    
    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        if central.state == .poweredOn {
            // BLE is ready for scanning
            sendEvent(withName: "BLEState", body: "Bluetooth is On")
        } else {
            sendEvent(withName: "BLEState", body: "Bluetooth is Off")
        }
    }
    
    func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi: NSNumber) {
        let peripheralData: [String: Any] = [
            "identifier": peripheral.identifier.uuidString,
            "name": peripheral.name ?? "Unknown",
            "rssi": rssi,
            "advertisementData": advertisementData
        ]
        
        // Sending the discovered peripheral data to JS
        sendEvent(withName: "PeripheralDiscovered", body: peripheralData)
    }
    
    // React Native Events
    override func supportedEvents() -> [String]! {
        return ["ScanStarted", "ScanStopped", "PeripheralDiscovered", "FailedScan", "BLEState"]
    }

    @objc(requiresMainQueueSetup)
    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
