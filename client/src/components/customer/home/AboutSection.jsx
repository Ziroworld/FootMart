import React from "react";
import { motion } from "framer-motion";

function AboutSection() {
  return (
    <motion.section
      className="max-w-3xl mx-auto my-12 sm:my-20 px-4 sm:px-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight text-black"
        initial={{ letterSpacing: "-.08em" }}
        whileInView={{ letterSpacing: ".01em" }}
        transition={{ duration: 0.8, type: "tween" }}
      >
        Power Your Passion <span className="text-[#00754A]">with FootMart</span>
      </motion.h2>
      <motion.div
        className="flex flex-col gap-6 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.17 }
          }
        }}
      >
        <motion.p
          className="text-black text-lg sm:text-xl font-medium"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
          }}
        >
          <span className="font-bold text-[#00754A]">FootMart</span> is the ultimate destination for football lovers, fusing cutting-edge e-commerce with a thriving local football community.<br className="hidden sm:block" />
          Discover top-quality gear—boots, jerseys, and more—at competitive prices with a quality guarantee.<br className="hidden sm:block" />
          Engage with <span className="text-[#00754A] font-semibold">live tournament standings</span>, connect through player profiles, and join events that bring your football passion to life.
        </motion.p>
        <motion.p
          className="text-black text-lg sm:text-xl font-medium"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
        >
          Whether you’re a player chasing goals or a fan cheering from the stands,<br className="hidden sm:block" />
          <span className="font-bold text-[#00754A]">FootMart</span> empowers you with innovative tools and gear to fuel your journey.<br className="hidden sm:block" />
          <span className="font-semibold">Shop now</span> and become part of a dynamic football network!
        </motion.p>
      </motion.div>
    </motion.section>
  );
}

export default AboutSection;
