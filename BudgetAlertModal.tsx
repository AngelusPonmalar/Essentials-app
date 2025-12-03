import { AlertCircle, X } from 'lucide-react';

interface BudgetAlertModalProps {
  onClose: () => void;
  monthlyBudget: number;
  currentSpent: number;
}

export function BudgetAlertModal({ onClose, monthlyBudget, currentSpent }: BudgetAlertModalProps) {
  const overAmount = currentSpent - monthlyBudget;
  const overPercentage = ((overAmount / monthlyBudget) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-400 to-orange-400 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-full">
                <AlertCircle size={32} />
              </div>
              <h2 className="text-2xl">Budget Alert</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-3">
              You've exceeded your monthly budget!
            </p>
            <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
              <p className="text-red-600 mb-2">Budget Exceeded By</p>
              <p className="text-4xl text-red-600 mb-1">
                ${overAmount.toFixed(2)}
              </p>
              <p className="text-red-500">
                ({overPercentage}% over budget)
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Monthly Budget:</span>
              <span className="text-gray-800">${monthlyBudget.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Spending:</span>
              <span className="text-red-600">${currentSpent.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <p className="text-blue-800 text-sm">
              💡 <strong>Tip:</strong> Review your expenses and consider reducing non-essential spending to stay within budget.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-red-400 to-orange-400 text-white py-4 rounded-xl hover:shadow-lg transition-all"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
