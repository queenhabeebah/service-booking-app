import { motion } from "framer-motion";

const HeroText = () => {
  const sentences = [
    "Book appointments with trusted professionals.",
    "Choose from our wide range of services.",
    "Find the perfect time that works for you.",
  ];

  return (
    <div className="text-center mt-6 max-w-xl mx-auto">
      <motion.h1
        className="text-3xl font-extrabold mb-4 md:text-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Luxury Service Booking
      </motion.h1>
      {sentences.map((sentence, index) => (
        <div>
          <motion.p
            key={index}
            className="text-sm md:text-lg text-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index + 1) * 2, duration: 1 }}
          >
            {sentence}
          </motion.p>
        </div>
      ))}
    </div>
  );
};

export default HeroText;
