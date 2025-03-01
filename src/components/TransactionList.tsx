
import React from 'react';
import { formatDate, formatCurrency, getCategoryName, getCategory } from '../utils/financeUtils';
import { Transaction, TransactionType } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Import all icons we might need from lucide-react
import * as IconsList from 'lucide-react';

// Helper function to get the icon component by name
const getIconByName = (iconName: string) => {
  const IconComponent = (IconsList as any)[
    iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-./g, x => x[1].toUpperCase())
  ] || IconsList.Circle;
  return IconComponent;
};

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction?: (id: string) => void;
  onEditTransaction?: (transaction: Transaction) => void;
  className?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
  className,
}) => {
  // Group transactions by date
  const groupedTransactions: Record<string, Transaction[]> = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date).toISOString().split('T')[0];
    
    if (!groupedTransactions[date]) {
      groupedTransactions[date] = [];
    }
    
    groupedTransactions[date].push(transaction);
  });

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  if (transactions.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-muted-foreground">No transactions found</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {sortedDates.map(date => (
        <div key={date} className="animate-slide-in-bottom">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            {formatDate(date)}
          </h3>
          
          <div className="space-y-2">
            {groupedTransactions[date].map(transaction => {
              const category = getCategory(transaction.categoryId);
              const IconComponent = category ? getIconByName(category.icon) : IconsList.Circle;
              
              return (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      transaction.type === 'expense' ? "bg-expense/10 text-expense" : "bg-income/10 text-income"
                    )}>
                      <IconComponent size={18} />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm">{transaction.description}</h4>
                      <p className="text-xs text-muted-foreground">{getCategoryName(transaction.categoryId)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={cn(
                      "font-semibold",
                      transaction.type === 'expense' ? "text-expense" : "text-income"
                    )}>
                      {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount)}
                    </span>
                    
                    {(onEditTransaction || onDeleteTransaction) && (
                      <div className="ml-4 flex space-x-1">
                        {onEditTransaction && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onEditTransaction(transaction)}
                          >
                            <IconsList.Pencil size={16} />
                          </Button>
                        )}
                        
                        {onDeleteTransaction && (
                          <Button 
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => onDeleteTransaction(transaction.id)}
                          >
                            <IconsList.Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
