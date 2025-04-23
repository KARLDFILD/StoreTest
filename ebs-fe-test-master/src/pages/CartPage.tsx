import { useCart } from "../store/CartContext";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import CartItemCard from "../components/CartItemCard";
import { CartItem } from "../types/types";
import { toast } from "sonner";

const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    clearCart();
    toast.success(`Cart has been cleared!`);
  };

  return (
    <div className="container mx-auto min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <Alert>
          <AlertDescription>Your cart is empty</AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-4">
          {cart.map((item: CartItem) => (
            <CartItemCard key={item.id} item={item} />
          ))}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <Button variant="destructive" onClick={handleClearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
