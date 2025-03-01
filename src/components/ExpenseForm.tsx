
import React, { useState } from 'react';
import { TransactionType, categories, Transaction } from '../data/mockData';
import { generateId } from '../utils/financeUtils';
import CategorySelector from './CategorySelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ExpenseFormProps {
  onSubmit: (transaction: Transaction) => void;
  onCancel: () => void;
  initialType?: TransactionType;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialType = 'expense' 
}) => {
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>(
    categories.find(c => c.type === initialType)?.id || ''
  );
  const [type, setType] = useState<TransactionType>(initialType);
  const [errors, setErrors] = useState<{
    amount?: string;
    description?: string;
    categoryId?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const newErrors: {
      amount?: string;
      description?: string;
      categoryId?: string;
    } = {};
    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Please enter a description';
    }
    
    if (!categoryId) {
      newErrors.categoryId = 'Please select a category';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Create new transaction
    const newTransaction: Transaction = {
      id: generateId(),
      amount: parseFloat(amount),
      description: description.trim(),
      date: new Date().toISOString(),
      categoryId,
      type,
    };
    
    onSubmit(newTransaction);
    resetForm();
  };
  
  const resetForm = () => {
    setAmount('');
    setDescription('');
    setCategoryId(categories.find(c => c.type === type)?.id || '');
    setErrors({});
  };

  // Handle transaction type change
  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    // Reset category when type changes
    setCategoryId(categories.find(c => c.type === newType)?.id || '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-scale-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Add {type === 'expense' ? 'Expense' : 'Income'}</h2>
      </div>
      
      <div className="space-y-4">
        {/* Transaction Type Selector */}
        <div>
          <RadioGroup 
            defaultValue={type}
            onValueChange={(value) => handleTypeChange(value as TransactionType)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expense" id="expense" />
              <Label 
                htmlFor="expense" 
                className={cn(
                  "cursor-pointer px-3 py-1 rounded-full text-sm font-medium",
                  type === 'expense' ? "bg-expense/10 text-expense" : ""
                )}
              >
                Expense
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="income" id="income" />
              <Label 
                htmlFor="income" 
                className={cn(
                  "cursor-pointer px-3 py-1 rounded-full text-sm font-medium",
                  type === 'income' ? "bg-income/10 text-income" : ""
                )}
              >
                Income
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-muted-foreground">₹</span>
            </div>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="pl-8"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          {errors.amount && <p className="text-destructive text-sm">{errors.amount}</p>}
        </div>
        
        {/* Description Input */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="What was this for?"
            className="resize-none"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
        </div>
        
        {/* Category Selector */}
        <CategorySelector
          selectedCategoryId={categoryId}
          onSelectCategory={setCategoryId}
          type={type}
        />
        {errors.categoryId && <p className="text-destructive text-sm">{errors.categoryId}</p>}
      </div>
      
      <div className="pt-2">
        <Button 
          type="submit" 
          className="w-full"
          variant={type === 'expense' ? 'destructive' : 'default'}
        >
          Add {type === 'expense' ? 'Expense' : 'Income'}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
