import { motion } from 'framer-motion';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20 text-center"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      {/* Logo */}
      <div className="flex justify-center items-center mb-4">
        <img
          src="https://i.postimg.cc/Wzkw3vr5/IMG-20241118-WA0000-removebg-preview.png"
          alt="Linber AI"
          className="w-40 h-auto" // Tamaño ajustado del logo
        />
      </div>

      {/* Frase */}
      <p className="text-gray-600 text-sm">
        Hecho con{' '}
        <span className="text-red-500">
          ❤️ {/* Icono de corazón */}
        </span>{' '}
        por{' '}
        <a
          href="https://linberai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          LinberAI
        </a>{' '}
        con talento misionero{' '}
        <span>
          {/* Icono o emoji de Misiones */}
          🧉 {/* Usé el emoji de mate como símbolo de la provincia */}
        </span>
      </p>
    </motion.div>
  );
};
