import { motion } from 'framer-motion';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex justify-center items-center">
        <img
          src="https://i.postimg.cc/qRD2Mny4/Linber-ai-1-removebg-preview.png"
          alt="Linber AI"
          className="max-w-full h-auto"
        />
      </div>
    </motion.div>
  );
};

