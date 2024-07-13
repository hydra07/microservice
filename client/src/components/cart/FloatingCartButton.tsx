import { useState, useEffect } from 'react';
import { ShoppingBasket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingCartButton = ({ cart } : {cart:any}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    // Trigger bounce animation when cart length changes
    setBounce(true);
    const timer = setTimeout(() => setBounce(false), 300);
    return () => clearTimeout(timer);
  }, [cart?.length]);

  return (
    <motion.button
      className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 dark:from-primary-600 dark:to-primary-700"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={bounce ? { y: [0, -10, 0] } : {}}
      transition={bounce ? { duration: 0.3 } : {}}
    >
      <ShoppingBasket className="h-6 w-6" />
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="font-semibold"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
          >
            View Cart
          </motion.span>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: cart?.length > 0 ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {cart?.length || 0}
      </motion.div>
    </motion.button>
  );
};

export default FloatingCartButton;