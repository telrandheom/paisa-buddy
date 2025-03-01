
import React, { useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { Category, TransactionType } from '../data/mockData';
import { cn } from '@/lib/utils';
import { generateId } from '../utils/financeUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCategories } from '../context/CategoryContext';

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

// Available icons for new categories
const availableIcons = [
  'ShoppingBag', 'Coffee', 'Utensils', 'Car', 'Plane', 
  'Train', 'Bus', 'Home', 'Building', 'Gift', 'Heart', 
  'Music', 'Film', 'Book', 'Smartphone', 'Laptop', 'Tv', 
  'Gamepad', 'DollarSign', 'CreditCard', 'Wallet', 'Briefcase'
];

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategoryId,
  onSelectCategory,
  type,
}) => {
  const { categories, addCategory } = useCategories();
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('ShoppingBag');
  
  const filteredCategories = categories.filter(category => category.type === type);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: Category = {
      id: generateId(),
      name: newCategoryName.trim(),
      icon: selectedIcon.toLowerCase(),
      type: type
    };
    
    addCategory(newCategory);
    onSelectCategory(newCategory.id);
    setIsAddingCategory(false);
    setNewCategoryName('');
  };

  return (
    <div className="w-full">
      <div className="text-sm font-medium mb-2">Category</div>
      {!isAddingCategory ? (
        <div className="grid grid-cols-4 gap-3">
          {filteredCategories.map((category) => {
            const IconComponent = getIconByName(category.icon);
            const isSelected = category.id === selectedCategoryId;
            
            return (
              <button
                key={category.id}
                type="button"
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
            type="button"
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-dashed border-border bg-background hover:bg-accent/50 hover:border-primary transition-all"
            onClick={() => setIsAddingCategory(true)}
          >
            <Plus size={20} className="mb-1" />
            <span className="text-xs font-medium">Add New</span>
          </button>
        </div>
      ) : (
        <div className="border p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">New Category</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsAddingCategory(false)}
              type="button"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium">Name</label>
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              className="text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium">Icon</label>
            <div className="grid grid-cols-6 gap-2 max-h-[150px] overflow-y-auto p-2 pr-3 rounded-md border border-border">
              {availableIcons.map((iconName) => {
                const IconComponent = (IconsList as any)[iconName];
                const isSelected = selectedIcon === iconName;
                
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setSelectedIcon(iconName)}
                    className={cn(
                      "p-2 rounded-md transition-all flex items-center justify-center",
                      isSelected 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-accent/50 text-foreground hover:bg-accent"
                    )}
                  >
                    <IconComponent size={18} />
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsAddingCategory(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
              type="button"
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
