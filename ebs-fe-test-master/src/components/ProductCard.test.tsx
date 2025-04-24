import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";
import { useCart } from "../store/CartContext";
import { toast } from "sonner";
import { Product } from "../types/types";

jest.mock("../store/CartContext", () => ({
  useCart: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 19.99,
  category: "Test Category",
  image: "https://via.placeholder.com/150",
};

describe("ProductCard", () => {
  it("renders product info and handles add to cart", () => {
    const addToCartMock = jest.fn();
    (useCart as jest.Mock).mockReturnValue({ addToCart: addToCartMock });

    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toHaveAttribute(
      "src",
      mockProduct.image
    );
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    expect(addToCartMock).toHaveBeenCalledWith(mockProduct);
    expect(toast.success).toHaveBeenCalledWith(
      `${mockProduct.title} has been added to your cart!`
    );
  });
});
