export type Product = {
  platform: string;
  name: string;
  quantity: string;
  price: number;
  image?: string;
};

export const normalizeSearchResponse = (data: any): Product[] => {
  const results: Product[] = [];

  if (data.swiggy?.success) {
    data.swiggy.items.forEach((item: any) => {
      results.push({
        platform: 'Swiggy',
        name: item.name,
        quantity: item.quantity,
        price: Number(item.offerPrice || item.price),
        image: item.imageId
          ? `https://res.cloudinary.com/swiggy/image/upload/${item.imageId}`
          : undefined
      });
    });
  }

  if (data.blinkit?.success) {
    data.blinkit.items.forEach((item: any) => {
      results.push({
        platform: 'Blinkit',
        name: item.name,
        quantity: item.quantity,
        price: Number(item.price),
        image: item.imageUrl
      });
    });
  }

  return results;
};

