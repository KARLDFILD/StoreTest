import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useCart } from "../store/CartContext";
import { Product } from "../types/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">
          {product.title.length > 70
            ? `${product.title.slice(0, 70)}... `
            : product.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain mb-4"
        />
        <p className="text-gray-600">{product.category}</p>
        <p className="text-xl font-bold">${product.price}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => addToCart(product)} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
