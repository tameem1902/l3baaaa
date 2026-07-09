import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import React from 'react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children,
  ...props 
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white focus:ring-amber-500/50 shadow-amber-900/20",
    secondary: "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white focus:ring-blue-500/50 shadow-blue-900/20",
    danger: "bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white focus:ring-red-500/50 shadow-red-900/20",
    ghost: "bg-transparent hover:bg-white/10 text-white shadow-none hover:shadow-none focus:ring-white/20",
    outline: "bg-transparent border-2 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 focus:ring-yellow-500/20 shadow-none",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-xl",
    xl: "px-12 py-5 text-2xl uppercase",
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children as any}</span>
      {variant !== 'ghost' && variant !== 'outline' && (
        <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300 ease-out" />
      )}
    </motion.button>
  );
}
