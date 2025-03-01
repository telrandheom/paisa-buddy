
import React from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '../utils/financeUtils';
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';

interface DashboardHeaderProps {
  balance: number;
  income: number;
  expenses: number;
  className?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  balance,
  income,
  expenses,
  className,
}) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {/* Balance */}
      <div className="glass-effect rounded-xl p-5 md:col-span-3 animate-fade-in flex flex-col">
        <span className="text-sm text-muted-foreground">Total Balance</span>
        <div className="flex items-center mt-1">
          <Wallet size={20} className="mr-2 text-primary" />
          <h2 className="text-3xl font-bold">{formatCurrency(balance)}</h2>
        </div>
      </div>
      
      {/* Income */}
      <div className="bg-card rounded-xl p-5 border animate-fade-in animate-delay-100">
        <span className="text-sm text-muted-foreground">Income</span>
        <div className="flex items-center mt-1">
          <ArrowUpCircle size={18} className="mr-2 text-income" />
          <h3 className="text-xl font-semibold text-income">{formatCurrency(income)}</h3>
        </div>
      </div>
      
      {/* Expenses */}
      <div className="bg-card rounded-xl p-5 border animate-fade-in animate-delay-200">
        <span className="text-sm text-muted-foreground">Expenses</span>
        <div className="flex items-center mt-1">
          <ArrowDownCircle size={18} className="mr-2 text-expense" />
          <h3 className="text-xl font-semibold text-expense">{formatCurrency(expenses)}</h3>
        </div>
      </div>
      
      {/* Savings Rate */}
      <div className="bg-card rounded-xl p-5 border animate-fade-in animate-delay-300">
        <span className="text-sm text-muted-foreground">Savings Rate</span>
        <div className="flex items-center mt-1">
          <h3 className="text-xl font-semibold">
            {income > 0 ? Math.round(((income - expenses) / income) * 100) : 0}%
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
