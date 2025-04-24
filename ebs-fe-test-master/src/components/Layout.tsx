import { Outlet, NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="bg-primary text-primary-foreground p-4 fixed top-0 w-full h-16 z-100 container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <NavLink to="/">StoreTest</NavLink>
        </h1>
        <nav className="flex space-x-4">
          <NavLink to="/">
            <Button variant="ghost">Home</Button>
          </NavLink>
          <NavLink to="/cart">
            <Button variant="ghost">Cart</Button>
          </NavLink>
        </nav>
      </header>
      <main className="flex-grow mt-16">
        <Outlet />
      </main>
      <footer className="bg-muted text-muted-foreground p-4 text-center">
        StoreTest Footer
      </footer>
    </div>
  );
};

export default Layout;
