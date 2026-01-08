import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  Pressable,
  FlatList,
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

  const handleUseCurrentLocation = async () => {
    const { lat, lng } = await getCurrentLocation();
    const address = await reverseGeocode(lat, lng);

    await setLocation(lat, lng, address);
    onLocationSet({ lat, lng, address });
    onClose();
  };

  const handleSearch = async (text: string) => {
    setQuery(text);
    const res = await searchLocations(text);
    setResults(res);
  };

  const handleSelect = async (item: any) => {
    await setLocation(item.lat, item.lng, item.name);
    onLocationSet({ lat: item.lat, lng: item.lng, address: item.name });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, padding: 16 }}>
        <Pressable onPress={handleUseCurrentLocation}>
          <Text style={{ fontSize: 16, marginBottom: 12 }}>
            📍 Use Current Location
          </Text>
        </Pressable>

        <TextInput
          placeholder="Search area, city..."
          value={query}
          onChangeText={handleSearch}
          style={{
            backgroundColor: '#f2f2f2',
            borderRadius: 10,
            padding: 12,
          }}
        />

        <FlatList
          data={results}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelect(item)}
              style={{ paddingVertical: 12 }}
            >
              <Text>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
}
