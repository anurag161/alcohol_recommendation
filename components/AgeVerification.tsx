'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, differenceInYears } from 'date-fns';
import { Calendar, Shield, AlertTriangle } from 'lucide-react';

interface AgeVerificationProps {
  onVerified: () => void;
}

export default function AgeVerification({ onVerified }: AgeVerificationProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [error, setError] = useState<string>('');

  // Check if user has already been verified - only on client side
  useEffect(() => {
    setIsMounted(true);
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsVisible(false);
      onVerified();
    }
  }, [onVerified]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
    setError('');
  };

  const handleVerify = () => {
    if (!selectedDate) {
      setError('Please select your date of birth');
      return;
    }

    const age = differenceInYears(new Date(), selectedDate);

    if (age < 21) {
      setError('You must be 21 or older to access this site');
      return;
    }

    // Store verification in localStorage
    localStorage.setItem('ageVerified', 'true');
    setIsVisible(false);
    onVerified();
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center gradient-bg"
      >
        {/* Background Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Main Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div className="glass-card p-8 rounded-2xl text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 rounded-full bg-primary/10 gold-glow">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-foreground mb-2"
            >
              Age Verification Required
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground mb-8"
            >
              To access Daru GPT, you must be 21 years or older.
              Please enter your date of birth below.
            </motion.p>

            {/* Date Picker */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
              <div className="relative">
                <button
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="w-full glass-input px-4 py-3 rounded-lg text-left flex items-center justify-between hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className={selectedDate ? 'text-foreground' : 'text-muted-foreground'}>
                      {selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : 'Select your date of birth'}
                    </span>
                  </div>
                </button>

                {/* Simple Date Picker */}
                <AnimatePresence>
                  {isCalendarOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 glass-card rounded-lg p-4 z-20"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Month
                          </label>
                          <select
                            className="w-full glass-input px-3 py-2 rounded text-sm"
                            onChange={(e) => {
                              const month = parseInt(e.target.value);
                              const currentDate = selectedDate || new Date();
                              const newDate = new Date(currentDate.getFullYear(), month, currentDate.getDate());
                              setSelectedDate(newDate);
                            }}
                          >
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i} value={i}>
                                {format(new Date(2000, i, 1), 'MMMM')}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Day
                          </label>
                          <select
                            className="w-full glass-input px-3 py-2 rounded text-sm"
                            onChange={(e) => {
                              const day = parseInt(e.target.value);
                              const currentDate = selectedDate || new Date();
                              const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                              setSelectedDate(newDate);
                            }}
                          >
                            {Array.from({ length: 31 }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Year
                          </label>
                          <select
                            className="w-full glass-input px-3 py-2 rounded text-sm"
                            onChange={(e) => {
                              const year = parseInt(e.target.value);
                              const currentDate = selectedDate || new Date();
                              const newDate = new Date(year, currentDate.getMonth(), currentDate.getDate());
                              setSelectedDate(newDate);
                            }}
                          >
                            {Array.from({ length: 100 }, (_, i) => {
                              const year = new Date().getFullYear() - i;
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsCalendarOpen(false)}
                        className="w-full mt-4 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      >
                        Done
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center space-x-2 text-destructive text-sm mb-4 p-3 glass-card rounded-lg"
                >
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <button
                onClick={handleVerify}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors gold-glow"
              >
                I am 21 or older
              </button>

              <button
                onClick={handleExit}
                className="w-full bg-transparent border border-border text-muted-foreground py-3 rounded-lg font-medium hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
              >
                I am under 21 - Exit
              </button>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-muted-foreground mt-6 leading-relaxed"
            >
              By entering this site, you certify that you are of legal drinking age in your country.
              Daru GPT promotes responsible drinking and does not encourage underage consumption.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
