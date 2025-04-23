import { useCart } from "../store/CartContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { CartItem } from "../types/types";

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item: CartItem) => sum + item.price * item.quantity,
    0
  );

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
            <Card
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4"
            >
              <CardHeader className="p-0 w-full max-w-2xl">
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
          ))}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <Button variant="destructive" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
