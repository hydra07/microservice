import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductCategoryType } from 'CustomTypes';

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
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Sort By
      </h3>
      <div className="space-y-2">
        <RadioGroup value={sortBy} onValueChange={onSortChange}>
          <Label className="flex items-center gap-2 font-normal">
            <RadioGroupItem
              value="low"
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Price: Low to High
            </span>
          </Label>
          <Label className="flex items-center gap-2 font-normal">
            <RadioGroupItem
              value="high"
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Price: High to Low
            </span>
          </Label>
        </RadioGroup>
      </div>
      <h3 className="text-lg font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">
        Filter By
      </h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <Label
            key={category.id}
            className="flex items-center gap-2 font-normal"
          >
            <Checkbox
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={() => onCategoryFilter(category.id)}
              className="text-indigo-600 focus"
            />
            <span className="text-gray-700 dark:text-gray-300">
              {category.name}
            </span>
          </Label>
        ))}
      </div>
    </div>
  );
};

export default SortFilterPanel;
