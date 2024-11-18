import { motion } from 'framer-motion';

export const Overview = () => {
  const sentence = "¿En qué puedo ayudarte?";
  const typingVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05, // Tiempo entre caracteres
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 text-center"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <motion.h1
        className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white"
        variants={typingVariants}
        initial="hidden"
        animate="visible"
      >
        {sentence.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
};
