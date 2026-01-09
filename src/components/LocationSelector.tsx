import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

import { getCurrentLocation } from '../utils/getCurrentLocation';
import { reverseGeocode } from '../utils/reverseGeocode';
import { searchLocations } from '../utils/searchLocations';
import { setLocation } from '../api/locationApi';

export default function LocationSelector({
  visible,
  onClose,
  onLocationSet,
}: any) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [setting, setSetting] = useState(false);

  const handleUseCurrentLocation = async () => {
    console.log('👉 Use Current Location pressed');

    try {
      setSetting(true);

      const { lat, lng } = await getCurrentLocation();
      console.log('📍 GPS:', lat, lng);

      const address = await reverseGeocode(lat, lng);
      console.log('🏠 Address:', address);

      await setLocation(lat, lng, address);
      onLocationSet({ lat, lng, address });

      onClose();
    } catch (e) {
      console.log('❌ Current location failed', e);
    } finally {
      setSetting(false);
    }
  };

  const handleSearch = async (text: string) => {
    setQuery(text);
    const res = await searchLocations(text);
    setResults(res);
  };

  const handleSelect = async (item: any) => {
    setSetting(true);
    await setLocation(item.lat, item.lng, item.name);
    onLocationSet({ lat: item.lat, lng: item.lng, address: item.name });
    setSetting(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}   // IMPORTANT for Android
    >
      <View style={styles.container}>
        {/* ✅ FIXED BUTTON */}
        <Pressable
          onPress={handleUseCurrentLocation}
          style={({ pressed }) => [
            styles.currentLocationBtn,
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={styles.currentLocationText}>
            📍 Use Current Location
          </Text>
        </Pressable>

        <TextInput
          placeholder="Search area, city..."
          value={query}
          onChangeText={handleSearch}
          style={styles.searchBox}
        />

        {setting && (
          <Text style={styles.settingText}>
            Setting location…
          </Text>
        )}

        <FlatList
          data={results}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelect(item)}
              style={styles.resultItem}
            >
              <Text>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  currentLocationBtn: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: '500',
  },
  searchBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
  },
  settingText: {
    marginTop: 12,
    color: '#555',
  },
  resultItem: {
    paddingVertical: 12,
  },
});
