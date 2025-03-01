
import React from 'react';
import ExpenseTracker from '../components/ExpenseTracker';
import { CategoryProvider } from '../context/CategoryContext';

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <CategoryProvider>
        <ExpenseTracker />
      </CategoryProvider>
    </div>
  );
};

export default Index;
