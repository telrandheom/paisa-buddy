
import React from 'react';
import { Check, Plus } from 'lucide-react';
import { categories, Category, TransactionType } from '../data/mockData';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  type: TransactionType;
}

// Import all icons we might need from lucide-react
import * as IconsList from 'lucide-react';

// Helper function to get the icon component by name
const getIconByName = (iconName: string) => {
  const IconComponent = (IconsList as any)[
    iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-./g, x => x[1].toUpperCase())
  ] || IconsList.Circle;
  return IconComponent;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategoryId,
  onSelectCategory,
  type,
}) => {
  const filteredCategories = categories.filter(category => category.type === type);

  return (
    <div className="w-full">
      <div className="text-sm font-medium mb-2">Category</div>
      <div className="grid grid-cols-4 gap-3">
        {filteredCategories.map((category) => {
          const IconComponent = getIconByName(category.icon);
          const isSelected = category.id === selectedCategoryId;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg transition-all",
                "border border-border hover:border-primary",
                "relative",
                isSelected 
                  ? "bg-accent text-accent-foreground ring-2 ring-primary ring-offset-1" 
                  : "bg-card text-foreground hover:bg-accent/50"
              )}
            >
              {isSelected && (
                <span className="absolute top-1 right-1 text-primary">
                  <Check size={16} />
                </span>
              )}
              <IconComponent size={20} className="mb-1" />
              <span className="text-xs font-medium text-center text-balance">{category.name}</span>
            </button>
          );
        })}
        <button
          className="flex flex-col items-center justify-center p-3 rounded-lg border border-dashed border-border bg-background hover:bg-accent/50 hover:border-primary transition-all"
          onClick={() => {}}
        >
          <Plus size={20} className="mb-1" />
          <span className="text-xs font-medium">Add New</span>
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;
