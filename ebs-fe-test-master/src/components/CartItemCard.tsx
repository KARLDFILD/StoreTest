import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useCart } from "../store/CartContext";
import { CartItem } from "../types/types";
import { toast } from "sonner";
import { Trash, Minus, Plus } from "lucide-react";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
    toast.success(`${item.title} has been removed from the cart!`);
  };

  return (
    <Card className="overflow-hidden">
      <div className="md:hidden">
        <div className="flex items-center p-3 border-b">
          <img
            src={item.image}
            alt={item.title}
            className="h-16 w-16 object-contain bg-white rounded p-1"
          />
          <div className="ml-3 flex-1">
            <h3 className="font-medium text-base line-clamp-2">{item.title}</h3>
            <p className="text-xs text-gray-500">{item.category}</p>
          </div>
        </div>

        <div className="p-3 flex justify-between items-center">
          <p className="font-bold text-lg">${item.price}</p>

          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus size={16} />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus size={16} />
              </Button>
            </div>

            <Button
              variant="destructive"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleRemoveFromCart}
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between p-4">
        <div className="flex items-center flex-1">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-16 w-16 object-contain bg-white rounded p-1 mr-4"
          />
          <div>
            <h3 className="font-medium text-lg">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <p className="font-bold text-lg min-w-16 text-right">${item.price}</p>

          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus size={16} />
            </Button>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleRemoveFromCart}
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;
