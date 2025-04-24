import { useEffect, useState, useMemo } from "react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Loader } from "lucide-react";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import ProductPagination from "../components/ProductPagination";
import { Product } from "../types/types";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">(
    "default"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)));
  }, [products]);

  const fullPriceLimits = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((product) => product.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      setPriceRange([fullPriceLimits.min, fullPriceLimits.max]);
    }
  }, [fullPriceLimits]);

  const categoryFilteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) return products;
    return products.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }, [products, selectedCategories]);

  const priceLimits = useMemo(() => {
    if (categoryFilteredProducts.length === 0) return fullPriceLimits;
    const prices = categoryFilteredProducts.map((product) => product.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [categoryFilteredProducts, fullPriceLimits]);

  const filteredProducts = useMemo(() => {
    return categoryFilteredProducts.filter((product) => {
      return product.price >= priceRange[0] && product.price <= priceRange[1];
    });
  }, [categoryFilteredProducts, priceRange]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortOrder === "asc") {
      return sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      return sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filteredProducts, sortOrder]);

  useEffect(() => {
    setPriceRange([priceLimits.min, priceLimits.max]);
  }, [priceLimits]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return sortedProducts.slice(startIndex, startIndex + productsPerPage);
  }, [sortedProducts, currentPage]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((cat) => cat !== category)
    );
    setCurrentPage(1);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
    setCurrentPage(1);
  };

  const handleSortChange = (value: "default" | "asc" | "desc") => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto min-h-screen p-4">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <Loader className="animate-spin w-12 h-12 text-primary" />
        </div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <div className="flex flex-col sm:flex-row gap-8">
          <ProductFilters
            categories={categories}
            selectedCategories={selectedCategories}
            priceRange={priceRange}
            sortOrder={sortOrder}
            priceLimits={priceLimits}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onSortChange={handleSortChange}
          />
          <div className="w-full sm:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedProducts.length === 0 ? (
                <p className="text-center col-span-full">
                  No products match the selected filters
                </p>
              ) : (
                paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
            {totalPages > 1 && (
              <ProductPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
