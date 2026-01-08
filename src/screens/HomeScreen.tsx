import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text
} from 'react-native';

import { setLocation } from '../api/locationApi';
import { searchProduct } from '../api/searchApi';
import { normalizeSearchResponse, Product } from '../utils/normalize';
import ProductCard from '../components/ProductCard';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    await setLocation(
      12.935,
      77.614,
      'Koramangala, Bangalore'
    );
    alert('Location set');
  };

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const raw = await searchProduct(query);
    setItems(normalizeSearchResponse(raw));
    setLoading(false);
  };

  return (
    <View style={{ padding: 16 }}>
      <Button title="Get My Location" onPress={handleGetLocation} />

      <TextInput
        placeholder="Search products..."
        value={query}
        onChangeText={setQuery}
        style={{
          borderWidth: 1,
          marginVertical: 10,
          padding: 8
        }}
      />

      <Button title="Search" onPress={handleSearch} />

      {loading && <Text>Loading...</Text>}

      <FlatList
        data={items}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
}

