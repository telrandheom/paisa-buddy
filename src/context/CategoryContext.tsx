
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Category, categories as initialCategories } from '../data/mockData';

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Category) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};
