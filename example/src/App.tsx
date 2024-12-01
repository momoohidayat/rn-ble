/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import RnBle from 'rn-ble';
import styles from './styles';

const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [peripherals, setPeripherals] = useState<any[]>([]);

  useEffect(() => {
    // Listen for peripheral discoveries
    RnBle.onPeripheralDiscovered((peripheral) => {
      setPeripherals((prev) => [...prev, peripheral]);
    });

    // Listen for scan start/stop events
    RnBle.onScanStart(() => {
      setIsScanning(true);
      setPeripherals([]); // reset value for each scan
      setStatusMessage('Start Scanning');
    });

    RnBle.onFailedScan((message) => {
      console.log(message);
      setStatusMessage(message);
    });

    RnBle.onBLEStateChange((message) => {
      console.log(message);
      setStatusMessage(message);
    });

    RnBle.onScanStop(() => {
      setIsScanning(false);
      setStatusMessage('Stop Scanning');
    });

    // Cleanup on unmount
    return () => {
      RnBle.removeListeners();
    };
  }, []);

  const handleStartScan = () => {
    RnBle.startScan();
  };

  const handleStopScan = () => {
    RnBle.stopScan();
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.deviceItem}>
      <Text style={styles.deviceName}>{item.name || 'Unknown'}</Text>
      <Text style={styles.deviceId}>{item.identifier}</Text>
      <Text style={styles.deviceRssi}>RSSI: {item.rssi}</Text>
      <Text style={styles.deviceRssi}>State: {item.state}</Text>
      {item.advertisementData && (
        <Text style={styles.deviceAdvertisement}>
          Advertisement Data: {JSON.stringify(item.advertisementData)}
        </Text>
      )}
    </View>
  );

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyListText}>No devices found</Text>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {statusMessage != "" && (
            <View style={styles.padding20}>
              <Text style={styles.statusMessage}>{statusMessage}</Text>
            </View>
          )}

          <View style={styles.rowAction}>
            <TouchableOpacity
              style={[
                styles.button,
                isScanning ? styles.stopButton : styles.scanButton,
              ]}
              onPress={isScanning ? handleStopScan : handleStartScan}>
              <Text style={styles.buttonText}>
                {isScanning ? 'Stop Scan' : 'Start Scan'}
              </Text>
            </TouchableOpacity>
            {isScanning && <ActivityIndicator size="large" />}
          </View>
          <FlatList
            data={peripherals}
            extraData={peripherals.length}
            keyExtractor={(item) => item.identifier}
            renderItem={renderItem}
            contentContainerStyle={styles.grow1}
            ListEmptyComponent={renderEmptyList()}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
