
import { Transaction, categories, TransactionType, Category } from '../data/mockData';

// Format currency based on locale and currency
export function formatCurrency(amount: number, locale = 'en-IN', currency = 'INR'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Get the total of all transactions based on type
export function getTotal(transactions: Transaction[], type: TransactionType): number {
  return transactions
    .filter(transaction => transaction.type === type)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
}

// Get the balance (income - expenses)
export function getBalance(transactions: Transaction[]): number {
  const totalIncome = getTotal(transactions, 'income');
  const totalExpenses = getTotal(transactions, 'expense');
  return totalIncome - totalExpenses;
}

// Get category name by id
export const getCategoryName = (categoryId: string): string => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Uncategorized';
};

// Get category by id
export const getCategory = (categoryId: string): Category | undefined => {
  return categories.find(cat => cat.id === categoryId);
};

// Filter transactions by type and search term
export function filterTransactions(
  transactions: Transaction[], 
  type: TransactionType | 'all', 
  searchTerm: string = ''
): Transaction[] {
  return transactions
    .filter(transaction => {
      // Filter by type
      if (type !== 'all' && transaction.type !== type) {
        return false;
      }
      
      // Filter by search term (if provided)
      if (searchTerm) {
        const category = getCategoryName(transaction.categoryId).toLowerCase();
        const description = transaction.description.toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        
        return category.includes(searchLower) || description.includes(searchLower);
      }
      
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date (newest first)
}

// Group transactions by date
export function groupTransactionsByDate(transactions: Transaction[]): Record<string, Transaction[]> {
  const grouped: Record<string, Transaction[]> = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date).toISOString().split('T')[0];
    
    if (!grouped[date]) {
      grouped[date] = [];
    }
    
    grouped[date].push(transaction);
  });
  
  return grouped;
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
