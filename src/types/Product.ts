export type Product = {
  platform: 'swiggy' | 'blinkit' | 'zepto';
  name: string;
  quantity?: string;
  image: string;
  price?: string;
  offerPrice: string;
  discount?: string | number;
};
