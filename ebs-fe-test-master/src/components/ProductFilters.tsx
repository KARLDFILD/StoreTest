import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

type ProductFiltersProps = {
  categories: string[];
  selectedCategories: string[];
  priceRange: [number, number];
  sortOrder: "default" | "asc" | "desc";
  priceLimits: { min: number; max: number };
  onCategoryChange: (category: string, checked: boolean) => void;
  onPriceChange: (value: number[]) => void;
  onSortChange: (value: "default" | "asc" | "desc") => void;
};

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategories,
  priceRange,
  sortOrder,
  priceLimits,
  onCategoryChange,
  onPriceChange,
  onSortChange,
}) => {
  return (
    <div className="w-full sm:w-1/4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Sort By</h3>
        <Select value={sortOrder} onValueChange={onSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="asc">Price: Low to High</SelectItem>
            <SelectItem value="desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Categories</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={(checked) =>
                onCategoryChange(category, checked as boolean)
              }
            />
            <label htmlFor={category} className="text-sm">
              {category}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-md font-medium mb-2">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={onPriceChange}
          min={priceLimits.min}
          max={priceLimits.max}
          step={1}
          className="mb-2"
        />
        <p className="text-sm text-gray-600">
          ${priceRange[0]} - ${priceRange[1]}
        </p>
      </div>
    </div>
  );
};

export default ProductFilters;
