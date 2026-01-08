import React, { useState } from 'react';
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

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [locationSet, setLocationSet] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    setLoading(true);
    try {
      // Temporary static location (replace later with GPS)
      await setLocation(12.935, 77.614, 'Koramangala, Bangalore');
      setLocationSet(true);
    } finally {
      setLoading(false);
    }
  };

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
      {!locationSet && (
        <Pressable style={styles.locationButton} onPress={handleGetLocation}>
          <Text style={styles.locationText}>
            {loading ? 'Setting location…' : 'Get My Location'}
          </Text>
        </Pressable>
      )}

      <TextInput
        placeholder="Search milk, bread, eggs..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchBox}
        editable={locationSet}
      />

      <FlatList
        data={products}
        keyExtractor={(item, idx) => item.platform + idx}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}
