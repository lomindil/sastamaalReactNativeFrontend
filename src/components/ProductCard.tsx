import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Product } from '../types/Product';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        {product.quantity && (
          <Text style={styles.quantity}>{product.quantity}</Text>
        )}

        <View style={styles.priceRow}>
          <Text style={styles.offerPrice}>₹{product.offerPrice}</Text>

          {product.price && product.price !== product.offerPrice && (
            <Text style={styles.originalPrice}>₹{product.price}</Text>
          )}
        </View>

        {product.discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {typeof product.discount === 'number'
                ? `${product.discount}% OFF`
                : product.discount}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
