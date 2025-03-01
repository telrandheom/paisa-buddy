
export type TransactionType = 'expense' | 'income';

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  categoryId: string;
  type: TransactionType;
}

export const categories: Category[] = [
  { id: 'c1', name: 'Food & Dining', icon: 'utensils', type: 'expense' },
  { id: 'c2', name: 'Shopping', icon: 'shopping-bag', type: 'expense' },
  { id: 'c3', name: 'Transport', icon: 'car', type: 'expense' },
  { id: 'c4', name: 'Entertainment', icon: 'film', type: 'expense' },
  { id: 'c5', name: 'Health', icon: 'heart', type: 'expense' },
  { id: 'c6', name: 'Housing', icon: 'home', type: 'expense' },
  { id: 'c7', name: 'Utilities', icon: 'plug', type: 'expense' },
  { id: 'c8', name: 'Education', icon: 'book', type: 'expense' },
  { id: 'c9', name: 'Travel', icon: 'plane', type: 'expense' },
  { id: 'c10', name: 'Personal Care', icon: 'user', type: 'expense' },
  { id: 'c11', name: 'Gifts & Donations', icon: 'gift', type: 'expense' },
  { id: 'c12', name: 'Miscellaneous', icon: 'ellipsis-h', type: 'expense' },
  { id: 'c13', name: 'Salary', icon: 'briefcase', type: 'income' },
  { id: 'c14', name: 'Bonus', icon: 'award', type: 'income' },
  { id: 'c15', name: 'Investment', icon: 'chart-line', type: 'income' },
  { id: 'c16', name: 'Gifts Received', icon: 'gift', type: 'income' },
  { id: 'c17', name: 'Rental Income', icon: 'building', type: 'income' },
  { id: 'c18', name: 'Other Income', icon: 'plus-circle', type: 'income' },
];

export const transactions: Transaction[] = [
  {
    id: 't1',
    amount: 45.99,
    description: 'Grocery shopping',
    date: '2023-09-15T18:30:00',
    categoryId: 'c1',
    type: 'expense',
  },
  {
    id: 't2',
    amount: 9.99,
    description: 'Movie ticket',
    date: '2023-09-14T20:00:00',
    categoryId: 'c4',
    type: 'expense',
  },
  {
    id: 't3',
    amount: 25.50,
    description: 'Uber ride',
    date: '2023-09-13T13:15:00',
    categoryId: 'c3',
    type: 'expense',
  },
  {
    id: 't4',
    amount: 1500,
    description: 'Rent payment',
    date: '2023-09-10T09:00:00',
    categoryId: 'c6',
    type: 'expense',
  },
  {
    id: 't5',
    amount: 2500,
    description: 'Monthly salary',
    date: '2023-09-05T10:00:00',
    categoryId: 'c13',
    type: 'income',
  },
  {
    id: 't6',
    amount: 100,
    description: 'Birthday gift from aunt',
    date: '2023-09-03T16:20:00',
    categoryId: 'c16',
    type: 'income',
  },
  {
    id: 't7',
    amount: 60.75,
    description: 'Dinner with friends',
    date: '2023-09-16T19:45:00',
    categoryId: 'c1',
    type: 'expense',
  },
  {
    id: 't8',
    amount: 120,
    description: 'New shoes',
    date: '2023-09-12T14:30:00',
    categoryId: 'c2',
    type: 'expense',
  },
  {
    id: 't9',
    amount: 350,
    description: 'Freelance work',
    date: '2023-09-08T11:30:00',
    categoryId: 'c18',
    type: 'income',
  },
  {
    id: 't10',
    amount: 85.50,
    description: 'Electricity bill',
    date: '2023-09-07T08:45:00',
    categoryId: 'c7',
    type: 'expense',
  },
];
