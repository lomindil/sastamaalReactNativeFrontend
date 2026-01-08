import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  Pressable,
  Text,
} from 'react-native';

import ProductCard from '../components/ProductCard';
import styles from './HomeScreen.styles';
import { searchProduct } from '../api/searchApi';
import { setLocation } from '../api/locationApi';
import { normalizeApiResponse } from '../utils/normalize';

import LocationSelector from '../components/LocationSelector';

/**
 * Default location so user can search immediately
 * (same behaviour as Swiggy / Blinkit)
 */
const DEFAULT_LOCATION = {
  lat: 12.935,
  lng: 77.614,
  address: 'Koramangala, Bangalore',
};

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [location, setLocationState] = useState(DEFAULT_LOCATION);
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  /**
   * Set default location ONCE on app load
   * so search works even without user action
   */
  useEffect(() => {
    (async () => {
      try {
        await setLocation(
          DEFAULT_LOCATION.lat,
          DEFAULT_LOCATION.lng,
          DEFAULT_LOCATION.address
        );
      } catch (e) {
        // fail silently — backend will handle fallback
      }
    })();
  }, []);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const res = await searchProduct(query);
      setProducts(normalizeApiResponse(res));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* LOCATION HEADER (always visible) */}
      <Pressable
        style={styles.locationButton}
        onPress={() => setLocationModalVisible(true)}
      >
        <Text style={styles.locationText}>
          📍 {location.address}
        </Text>
      </Pressable>

      {/* SEARCH BAR (always enabled) */}
      <TextInput
        placeholder="Search milk, bread, eggs..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchBox}
      />

      {/* PRODUCT LIST (unchanged) */}
      <FlatList
        data={products}
        keyExtractor={(item, idx) => item.platform + idx}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      {/* LOCATION SELECTOR MODAL */}
      <LocationSelector
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
        onLocationSet={(loc: any) => {
          setLocationState(loc);
        }}
      />
    </SafeAreaView>
  );
}
