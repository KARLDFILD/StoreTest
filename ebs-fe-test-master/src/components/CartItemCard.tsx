import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useCart } from "../store/CartContext";
import { CartItem } from "../types/types";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <Card className="flex flex-col sm:flex-row items-center justify-between p-4">
      <CardHeader className="p-0 w-full sm:max-w-[30%] md:max-w-[45%]">
        <CardTitle className="text-lg">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-0">
        <img
          src={item.image}
          alt={item.title}
          className="h-16 w-16 object-contain"
        />
        <div className="text-center sm:text-left">
          <p className="text-gray-600">{item.category}</p>
          <p className="font-bold">${item.price}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
