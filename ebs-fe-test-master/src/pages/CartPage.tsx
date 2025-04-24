import { useCart } from "../store/CartContext";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import CartItemCard from "../components/CartItemCard";
import { CartItem } from "../types/types";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">
                {cart.length} item(s)
              </span>
              <Button variant="destructive" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
            <div className="space-y-4">
              {cart.map((item: CartItem) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-80 bg-gray-50 p-4 rounded-lg shadow-md self-start lg:sticky lg:top-20">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Items in cart:</span>
                <span>{cart.length} item(s)</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>Free</span>
              </div>
              <div className="mt-2">
                <Input placeholder="Enter promo code" className="w-full" />
                <Button variant="outline" className="mt-2 w-full">
                  Apply
                </Button>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Button className="w-full">Place Order</Button>
              <NavLink to="/">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
