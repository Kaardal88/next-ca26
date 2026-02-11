export type Product = {
  id: string;
  title: string;
  name: string;
  price: number;
  discountedPrice: number;
  rating: number;
  description: string;
  tags: string;
  reviews: Review[];
  image: {
    url: string;
    alt: string;
  };
};

export type Review = {
  id: string;
  username: string;
  rating: number;
  description: string;
};
