
import React, { useState } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { 
  transactions as initialTransactions, 
  Transaction, 
  TransactionType 
} from '../data/mockData';
import { getTotal, getBalance, filterTransactions } from '../utils/financeUtils';
import DashboardHeader from './DashboardHeader';
import TransactionList from './TransactionList';
import ExpenseForm from './ExpenseForm';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';

const ExpenseTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [initialType, setInitialType] = useState<TransactionType>('expense');
  
  const { toast } = useToast();

  // Calculate totals
  const income = getTotal(transactions, 'income');
  const expenses = getTotal(transactions, 'expense');
  const balance = getBalance(transactions);
  
  // Filtered transactions
  const filteredTransactions = filterTransactions(transactions, filterType, searchTerm);
  
  // Add new transaction
  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
    setIsAddingTransaction(false);
    
    toast({
      title: transaction.type === 'expense' ? 'Expense added' : 'Income added',
      description: `${transaction.description} has been added to your transactions.`,
      variant: transaction.type === 'expense' ? 'destructive' : 'default',
    });
  };
  
  // Delete transaction
  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
    
    toast({
      title: 'Transaction deleted',
      description: 'The transaction has been removed from your records.',
    });
  };
  
  // Open add form with preset type
  const handleOpenAdd = (type: TransactionType) => {
    setInitialType(type);
    setIsAddingTransaction(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gradient">
        Paisa Controller
      </h1>
      
      <DashboardHeader
        balance={balance}
        income={income}
        expenses={expenses}
        className="mb-8"
      />
      
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full md:w-auto flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Search transactions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Select 
            value={filterType} 
            onValueChange={(value) => setFilterType(value as TransactionType | 'all')}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="expense">Expenses</SelectItem>
              <SelectItem value="income">Income</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isAddingTransaction} onOpenChange={setIsAddingTransaction}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle size={18} className="mr-2" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <ExpenseForm 
                onSubmit={handleAddTransaction} 
                onCancel={() => setIsAddingTransaction(false)}
                initialType={initialType}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex justify-center space-x-2 mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-expense" 
          onClick={() => handleOpenAdd('expense')}
        >
          Add Expense
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-income" 
          onClick={() => handleOpenAdd('income')}
        >
          Add Income
        </Button>
      </div>
      
      <div className="bg-card border rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <TransactionList 
          transactions={filteredTransactions} 
          onDeleteTransaction={handleDeleteTransaction} 
        />
      </div>
    </div>
  );
};

export default ExpenseTracker;
