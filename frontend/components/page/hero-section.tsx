"use client";

import { motion } from "framer-motion";
import Aurora from "@/src/blocks/Backgrounds/Aurora/Aurora";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#ec7b24", "#1babdd", "#ecac16"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.3}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center text-white p-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="font-tomorrow text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        >
          Himafortic UNESA
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          className="mt-4 max-w-2xl font-sans text-lg text-gray-300 md:text-xl"
        >
          Wadah aspirasi, inovasi, dan kolaborasi bagi mahasiswa D4 Manajemen Informatika Universitas Negeri Surabaya.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
          className="mt-8"
        >
          <button className="btn-gradient">
            <span>
              Jelajahi Program Kami
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
