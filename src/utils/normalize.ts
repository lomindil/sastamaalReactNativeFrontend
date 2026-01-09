import { Product } from '../types/Product';

export function normalizeApiResponse(apiResponse: any): Product[] {
  const products: Product[] = [];

  // Swiggy
  if (apiResponse.swiggy?.success) {
    apiResponse.swiggy.items.forEach((item: any) => {
      products.push({
        platform: 'swiggy',
        name: item.name,
        quantity: item.quantity,
        image: item.images?.[0],
        price: item.price,
        offerPrice: item.offerPrice,
        discount: item.discount,
      });
    });
  }

  // Blinkit
  if (apiResponse.blinkit?.success) {
    apiResponse.blinkit.items.forEach((item: any) => {
      products.push({
        platform: 'blinkit',
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        offerPrice: item.offerPrice,
        discount: item.discount,
      });
    });
  }

  return products;
}
