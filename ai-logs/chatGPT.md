# AI Usage Log (Summary -- React Project)

## March 2026

### January 2026

**Topic:** Project Setup & Component Structure\

- Set up React project and basic structure\
- Learned component-based architecture and props

```tsx
type ProductProps = {
  title: string;
  price: number;
};

const ProductCard = ({ title, price }: ProductProps) => {
  return (
    <div>
      {title} - {price}
    </div>
  );
};
```

---

### February 2026

**Topic:** Data Fetching & State\

- Fetching API data and storing in state\
- Learned useState and useEffect

```tsx
const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("/api/products")
    .then((res) => res.json())
    .then((data) => setProducts(data));
}, []);
```

---

### February 2026

**Topic:** Search Functionality\

- Filtering products based on user input

```tsx
const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase()),
);
```

---

### March 17, 2026

**Topic:** Rating System\

- Conditional rendering for ratings and fallback

```tsx
{
  rating > 0 ? <StarRating rating={rating} /> : <p>No reviews yet</p>;
}
```

---

### March 19, 2026

**Topic:** Price Logic\

- Display discount only when applicable

```tsx
{
  discountedPrice ? (
    <>
      <span className="line-through">{price}</span>
      <span>{discountedPrice}</span>
    </>
  ) : (
    <span>{price}</span>
  );
}
```

---

### March 19, 2026

**Topic:** Responsive Layout\

- Grid layout adapting to screen sizes

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
  <Image />
  <div>Product info</div>
</div>
```

---

### March 26, 2026

**Topic:** Cart Context\

- Global state using Context API

```tsx
const [cart, setCart] = useState([]);

const addToCart = (product) => {
  setCart((prev) => [...prev, product]);
};
```

---

### March 26, 2026

**Topic:** Quantity Handling\

- Updating item quantity

```tsx
const increaseQuantity = (id) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    ),
  );
};
```

---

## Reflection

AI has been used as a support tool to understand React concepts such as
state management, conditional rendering, and component structure. The
focus has been on learning how the code works and adapting it into the
project rather than copying full solutions. This, combined with teacher support have really helped!
