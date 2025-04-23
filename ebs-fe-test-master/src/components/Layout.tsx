import { Outlet, NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">StoreTest</h1>
          <nav className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "underline" : ""}`
              }
            >
              <Button variant="ghost">Home</Button>
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "underline" : ""}`
              }
            >
              <Button variant="ghost">Cart</Button>
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-muted text-muted-foreground p-4 text-center">
        StoreTest Footer
      </footer>
    </div>
  );
};

export default Layout;
