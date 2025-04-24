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
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} has been added to your cart!`);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg truncate" title={product.title}>
          {product.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain mb-4"
        />
        <div className="mt-auto">
          <p className="text-gray-600">{product.category}</p>
          <p className="text-xl font-bold">${product.price}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
