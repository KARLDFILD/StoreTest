import { Outlet, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useCart } from "../store/CartContext";

const Layout: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="bg-primary text-primary-foreground fixed top-0 w-full h-16 z-100">
        <div className="container mx-auto h-full flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">
            <NavLink to="/">StoreTest</NavLink>
          </h1>
          <nav className="flex space-x-4">
            <NavLink to="/">
              <Button variant="ghost">Home</Button>
            </NavLink>
            <NavLink to="/cart">
              <Button variant="ghost" className="relative">
                Cart
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-grow mt-16">
        <Outlet />
      </main>
      <footer className="bg-muted text-muted-foreground p-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold mb-2">About StoreTest</h3>
            <p className="text-sm">
              StoreTest is your one-stop shop for quality products. We offer a
              wide range of items with fast delivery and excellent customer
              service.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="hover:underline">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="hover:underline">
                  Cart
                </NavLink>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">Email: support@storetest.com</p>
            <p className="text-sm">Phone: (373) 069585583</p>
            <p className="text-sm">Address: 123 Store St, Chisinau, Moldova</p>
          </div>
        </div>
        <div className="mt-4 text-center text-sm border-t border-muted-foreground/20 pt-4">
          &copy; 2025 StoreTest. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
