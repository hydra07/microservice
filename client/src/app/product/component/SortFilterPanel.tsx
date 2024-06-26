import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductCategoryType } from 'CustomTypes';
import { ArrowUpDown, Filter } from 'lucide-react'; // Import icons

interface SortFilterPanelProps {
  sortBy: string;
  selectedCategories: number[];
  categories: ProductCategoryType[];
  onSortChange: (value: string) => void;
  onCategoryFilter: (categoryId: number) => void;
}

const SortFilterPanel: React.FC<SortFilterPanelProps> = ({
  sortBy,
  selectedCategories,
  categories,
  onSortChange,
  onCategoryFilter,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md h-full divide-y divide-gray-200 dark:divide-gray-700">
      <div className="pb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
          <ArrowUpDown className="mr-2 h-5 w-5" />
          Sort By
        </h3>
        <RadioGroup value={sortBy} onValueChange={onSortChange} className="space-y-2">
          {['low', 'high'].map((value) => (
            <Label
              key={value}
              className="flex items-center p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <RadioGroupItem
                value={value}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Price: {value === 'low' ? 'Low to High' : 'High to Low'}
              </span>
            </Label>
          ))}
        </RadioGroup>
      </div>
      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Filter By Category
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {categories.map((category) => (
            <Label
              key={category.id}
              className="flex items-center p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => onCategoryFilter(category.id)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {category.name}
              </span>
            </Label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortFilterPanel;