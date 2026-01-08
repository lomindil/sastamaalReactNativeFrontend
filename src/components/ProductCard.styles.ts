import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  quantity: {
    fontSize: 12,
    color: '#777',
    marginVertical: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  originalPrice: {
    fontSize: 13,
    textDecorationLine: 'line-through',
    color: '#999',
    marginLeft: 8,
  },
  discountBadge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#e6f4ea',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#137333',
  },
});
