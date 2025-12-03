import { useState } from 'react';
import { Plus, Trash2, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import type { Expense } from '../App';

interface ExpenseTrackerProps {
  expenses: Expense[];
  monthlyBudget: number;
  onAddExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  onDeleteExpense: (id: string) => void;
}

type TimeFilter = 'day' | 'week' | 'month';

const categoryColors: Record<string, { bg: string; text: string }> = {
  food: { bg: 'bg-orange-100', text: 'text-orange-700' },
  transport: { bg: 'bg-blue-100', text: 'text-blue-700' },
  shopping: { bg: 'bg-pink-100', text: 'text-pink-700' },
  bills: { bg: 'bg-purple-100', text: 'text-purple-700' },
  health: { bg: 'bg-green-100', text: 'text-green-700' },
  other: { bg: 'bg-gray-100', text: 'text-gray-700' },
};

export function ExpenseTracker({
  expenses,
  monthlyBudget,
  onAddExpense,
  onDeleteExpense,
}: ExpenseTrackerProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('day');
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'food' as Expense['category'],
  });

  const getFilteredExpenses = () => {
    const now = new Date();
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      if (timeFilter === 'day') {
        return expenseDate.toDateString() === now.toDateString();
      } else if (timeFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return expenseDate >= weekAgo;
      } else {
        return (
          expenseDate.getMonth() === now.getMonth() &&
          expenseDate.getFullYear() === now.getFullYear()
        );
      }
    });
  };

  const filteredExpenses = getFilteredExpenses();
  const totalSpent = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthExpenses = expenses.filter(exp => {
    const now = new Date();
    return (
      exp.date.getMonth() === now.getMonth() &&
      exp.date.getFullYear() === now.getFullYear()
    );
  });
  const monthTotal = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetPercentage = (monthTotal / monthlyBudget) * 100;
  const isOverBudget = monthTotal > monthlyBudget;

  const handleAddExpense = () => {
    if (newExpense.title && newExpense.amount) {
      onAddExpense({
        title: newExpense.title,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
      });
      setNewExpense({ title: '', amount: '', category: 'food' });
      setShowAddExpense(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-800 mb-2">Expense Tracker</h2>
        <p className="text-gray-500">Monitor your spending</p>
      </div>

      {/* Monthly Budget Card */}
      <div className={`rounded-2xl p-5 shadow-md ${isOverBudget ? 'bg-gradient-to-br from-red-50 to-red-100' : 'bg-gradient-to-br from-green-50 to-green-100'}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-gray-700 mb-1">Monthly Budget</p>
            <p className={`text-3xl ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
              ${monthTotal.toFixed(2)} / ${monthlyBudget}
            </p>
          </div>
          <div className={`p-3 rounded-2xl ${isOverBudget ? 'bg-red-400' : 'bg-green-400'}`}>
            {isOverBudget ? (
              <AlertCircle size={32} className="text-white" />
            ) : (
              <TrendingUp size={32} className="text-white" />
            )}
          </div>
        </div>
        <div className="w-full bg-white rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              isOverBudget
                ? 'bg-gradient-to-r from-red-400 to-red-500'
                : 'bg-gradient-to-r from-green-400 to-green-500'
            }`}
            style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
          />
        </div>
        {isOverBudget && (
          <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
            <AlertCircle size={16} />
            You've exceeded your budget by ${(monthTotal - monthlyBudget).toFixed(2)}
          </p>
        )}
      </div>

      {/* Time Filter */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl">
        {(['day', 'week', 'month'] as TimeFilter[]).map((filter) => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={`flex-1 py-3 rounded-xl transition-all ${
              timeFilter === filter
                ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {filter === 'day' ? 'Today' : filter === 'week' ? 'This Week' : 'This Month'}
          </button>
        ))}
      </div>

      {/* Total for Period */}
      <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar size={24} className="text-green-600" />
            <div>
              <p className="text-gray-500 text-sm">Total Spent</p>
              <p className="text-2xl text-gray-800">${totalSpent.toFixed(2)}</p>
            </div>
          </div>
          <p className="text-gray-500">{filteredExpenses.length} transactions</p>
        </div>
      </div>

      {/* Add Expense Button */}
      {!showAddExpense ? (
        <button
          onClick={() => setShowAddExpense(true)}
          className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
        >
          <Plus size={24} />
          <span className="text-lg">Add Expense</span>
        </button>
      ) : (
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
          <h3 className="text-lg text-gray-800 mb-4">Add New Expense</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Expense name"
              value={newExpense.title}
              onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-lg"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-lg"
              step="0.01"
            />
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as Expense['category'] })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-lg"
            >
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="bills">Bills</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAddExpense}
                className="flex-1 bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddExpense(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expenses List */}
      <div className="space-y-3">
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No expenses for this period</p>
            <p className="text-gray-400">Add an expense to start tracking</p>
          </div>
        ) : (
          filteredExpenses.map((expense) => {
            const colors = categoryColors[expense.category];
            return (
              <div
                key={expense.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg text-gray-800">{expense.title}</h3>
                      <span className={`${colors.bg} ${colors.text} px-3 py-1 rounded-full text-xs capitalize`}>
                        {expense.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {expense.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xl text-gray-800">${expense.amount.toFixed(2)}</p>
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
