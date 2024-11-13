import { AnimatePresence, motion } from 'framer-motion';
import { X, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useDashboardStore } from '../../store';
import { FinanceVisualization } from './FinanceVisualization';
import { FinanceDetailsPanel } from './FinanceDetailsPanel';
import { useState, useEffect } from 'react';

export function FinanceOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [detailsType, setDetailsType] = useState<'moneyIn' | 'moneyOut' | null>(null);
  const selectedUnit = useDashboardStore((state) => state.selectedUnit);

  useEffect(() => {
    setIsVisible(selectedUnit === 'finance');
    if (selectedUnit !== 'finance') {
      setDetailsType(null);
    }
  }, [selectedUnit]);

  const handleClose = () => {
    setIsVisible(false);
    useDashboardStore.getState().setSelectedUnit(null);
  };

  const handleDetailsClick = (type: 'moneyIn' | 'moneyOut') => {
    setDetailsType(detailsType === type ? null : type);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-4 top-4 z-50 w-[280px]"
          >
            <motion.div
              className="rounded-xl bg-black/40 backdrop-blur-sm p-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-[#44ff88]/20 flex items-center justify-center">
                    <TrendingUp size={12} className="text-[#44ff88]" />
                  </div>
                  <h2 className="text-[#44ff88] text-sm font-medium">Balance</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="text-3xl font-bold text-white mb-4">$329</div>

              <div className="relative h-[180px] rounded-lg mb-4 overflow-hidden">
                <FinanceVisualization detailsType={detailsType} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <motion.button 
                  className="text-left"
                  onClick={() => handleDetailsClick('moneyIn')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#4488ff]" />
                    <span className="text-white/60 text-xs">Money in</span>
                  </div>
                  <div className="text-xl font-bold text-white">$470</div>
                  <div className="flex items-center gap-1 text-[#44ff88] text-xs">
                    <ArrowUpRight size={12} />
                    <span>19.6%</span>
                    <span className="text-white/40 ml-1">44,214 USD</span>
                  </div>
                </motion.button>
                <motion.button
                  className="text-left"
                  onClick={() => handleDetailsClick('moneyOut')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#ff4444]" />
                    <span className="text-white/60 text-xs">Money out</span>
                  </div>
                  <div className="text-xl font-bold text-white">$50</div>
                  <div className="flex items-center gap-1 text-[#44ff88] text-xs">
                    <ArrowDownRight size={12} />
                    <span>2.5%</span>
                    <span className="text-white/40 ml-1">301,002 USD</span>
                  </div>
                </motion.button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-white bg-black/20 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#ff4444]" />
                    <div className="text-xs">Recent payment for bolt.new</div>
                  </div>
                  <div className="text-xs font-medium text-[#ff4444]">-$50</div>
                </div>
                <div className="flex items-center justify-between text-white bg-black/20 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#4488ff]" />
                    <div className="text-xs">New client CAFERACER ID</div>
                  </div>
                  <div className="text-xs font-medium text-[#4488ff]">+$470</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <FinanceDetailsPanel 
            type={detailsType || 'moneyIn'} 
            isVisible={detailsType !== null}
            onClose={() => setDetailsType(null)}
          />
        </>
      )}
    </AnimatePresence>
  );
}