import { AnimatePresence, motion } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Transaction {
  name: string;
  amount: number;
  date: string;
  type: 'recurring' | 'one-time';
  status: 'completed' | 'pending';
}

interface FinanceDetailsPanelProps {
  type: 'moneyIn' | 'moneyOut';
  isVisible: boolean;
  onClose: () => void;
}

const expenses: Transaction[] = [
  { name: 'Bolt.new', amount: 50, date: '2024-03-01', type: 'recurring', status: 'completed' },
  { name: 'Notion', amount: 15, date: '2024-02-28', type: 'recurring', status: 'completed' },
  { name: 'Zapier', amount: 30, date: '2024-02-25', type: 'recurring', status: 'completed' },
  { name: 'Framer', amount: 25, date: '2024-02-20', type: 'recurring', status: 'completed' },
  { name: 'Formless', amount: 15, date: '2024-02-15', type: 'recurring', status: 'completed' },
  { name: 'GitHub', amount: 20, date: '2024-02-10', type: 'recurring', status: 'completed' },
  { name: 'Vercel', amount: 40, date: '2024-02-05', type: 'recurring', status: 'completed' },
  { name: 'AWS', amount: 100, date: '2024-02-01', type: 'recurring', status: 'completed' },
];

const income: Transaction[] = [
  { name: 'CAFERACER ID', amount: 470, date: '2024-03-01', type: 'one-time', status: 'completed' },
  { name: 'PT Hasta Kencana', amount: 350, date: '2024-02-15', type: 'one-time', status: 'completed' },
  { name: 'Digital Ocean', amount: 250, date: '2024-02-10', type: 'recurring', status: 'completed' },
  { name: 'Stripe', amount: 180, date: '2024-02-05', type: 'one-time', status: 'completed' },
  { name: 'AWS Marketplace', amount: 290, date: '2024-02-01', type: 'recurring', status: 'completed' },
];

export function FinanceDetailsPanel({ type, isVisible, onClose }: FinanceDetailsPanelProps) {
  const transactions = type === 'moneyIn' ? income : expenses;
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const panelWidth = viewportWidth < 640 ? '85vw' : '320px';
  const maxHeight = viewportHeight - 120; // Leave space for padding

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-4 top-4 z-50"
          style={{ width: panelWidth }}
        >
          <motion.div
            className="bg-black/40 backdrop-blur-sm rounded-xl p-4"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ maxHeight }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#44ff88] text-sm font-medium">
                {type === 'moneyIn' ? 'Revenue History' : 'Expense History'}
              </h2>
              <motion.button
                onClick={onClose}
                className="text-white/80 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            </div>

            <div 
              className="space-y-2 overflow-y-auto custom-scrollbar pr-2" 
              style={{ maxHeight: maxHeight - 80 }}
            >
              {transactions.map((transaction, index) => (
                <motion.div
                  key={`${transaction.name}-${transaction.date}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/5 rounded-lg p-3"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-white font-medium text-sm">{transaction.name}</div>
                      <div className="flex items-center gap-1 text-white/60 text-xs">
                        <Calendar size={12} />
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${type === 'moneyIn' ? 'text-[#4488ff]' : 'text-[#ff4444]'}`}>
                      {type === 'moneyIn' ? '+' : '-'}${transaction.amount}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/40 text-xs">{transaction.type}</span>
                    <span className={`text-xs ${transaction.status === 'completed' ? 'text-[#44ff88]' : 'text-yellow-400'}`}>
                      {transaction.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}