'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  IndianRupee,
  Palette,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { states, tasteProfiles, occasions } from '../../lib/liquorDatabase';

const steps = [
  { id: 1, title: 'Location', icon: MapPin, description: 'Select your state' },
  { id: 2, title: 'Budget', icon: IndianRupee, description: 'Set your price range' },
  { id: 3, title: 'Taste', icon: Palette, description: 'Choose your preferences' },
  { id: 4, title: 'Occasion', icon: Calendar, description: 'What\'s the occasion?' }
];



interface FormData {
  state: string;
  budget: [number, number];
  tasteProfile: string[];
  occasion: string;
}

export default function DiscoverPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    state: '',
    budget: [500, 5000],
    tasteProfile: [],
    occasion: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  console.log("api key", process.env.GEMINI_API_KEY);

  const handleSubmit = async () => {
    setIsLoading(true);
     console.log("hello");
  
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log("response", response);
  
      const data = await response.json();
  
      // Store the AI's response to show it on the results page
      localStorage.setItem('aiRecommendation', data.recommendation);
      
      router.push('/results');
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while getting recommendations.");
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.state !== '';
      case 2:
        return formData.budget[0] < formData.budget[1];
      case 3:
        return formData.tasteProfile.length > 0;
      case 4:
        return formData.occasion !== '';
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Where are you located?</h2>
              <p className="text-muted-foreground">Select your state for accurate pricing information</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {states.map((state) => (
                <motion.button
                  key={state}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateFormData('state', state)}
                  className={`p-4 glass-card rounded-lg text-left transition-all ${
                    formData.state === state
                      ? 'ring-2 ring-primary gold-glow bg-primary/10'
                      : 'hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{state}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">What's your budget?</h2>
              <p className="text-muted-foreground">Set your preferred price range</p>
            </div>

            <div className="glass-card p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Minimum</span>
                  <span className="text-lg font-bold amber-text">₹{formData.budget[0]}</span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={formData.budget[0]}
                  onChange={(e) => updateFormData('budget', [parseInt(e.target.value), formData.budget[1]])}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
                />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Maximum</span>
                  <span className="text-lg font-bold amber-text">₹{formData.budget[1]}</span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={formData.budget[1]}
                  onChange={(e) => updateFormData('budget', [formData.budget[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
                />

                <div className="text-center text-sm text-muted-foreground">
                  Selected range: ₹{formData.budget[0]} - ₹{formData.budget[1]}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">What do you enjoy?</h2>
              <p className="text-muted-foreground">Select your preferred taste profiles</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {tasteProfiles.map((taste) => (
                <motion.button
                  key={taste}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const isSelected = formData.tasteProfile.includes(taste);
                    if (isSelected) {
                      updateFormData('tasteProfile', formData.tasteProfile.filter(t => t !== taste));
                    } else {
                      updateFormData('tasteProfile', [...formData.tasteProfile, taste]);
                    }
                  }}
                  className={`p-4 glass-card rounded-lg text-center transition-all ${
                    formData.tasteProfile.includes(taste)
                      ? 'ring-2 ring-primary gold-glow bg-primary/10'
                      : 'hover:bg-primary/5'
                  }`}
                >
                  <Palette className="h-6 w-6 text-primary mx-auto mb-2" />
                  <span className="font-medium">{taste}</span>
                </motion.button>
              ))}
            </div>

            {formData.tasteProfile.length > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                Selected: {formData.tasteProfile.join(', ')}
              </div>
            )}
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">What's the occasion?</h2>
              <p className="text-muted-foreground">Help us recommend the perfect spirit</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {occasions.map((occasion) => (
                <motion.button
                  key={occasion}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateFormData('occasion', occasion)}
                  className={`p-6 glass-card rounded-lg text-center transition-all ${
                    formData.occasion === occasion
                      ? 'ring-2 ring-primary gold-glow bg-primary/10'
                      : 'hover:bg-primary/5'
                  }`}
                >
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
                  <span className="text-lg font-semibold">{occasion}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : isCurrent
                        ? 'bg-primary/20 text-primary ring-2 ring-primary'
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="hidden sm:block ml-3">
                      <div className={`text-sm font-medium ${
                        isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                    {step.id < steps.length && (
                      <div className={`w-12 h-0.5 mx-4 ${
                        isCompleted ? 'bg-primary' : 'bg-border'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="glass-card p-8">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-secondary text-muted-foreground cursor-not-allowed'
                    : 'glass-card text-foreground hover:bg-primary/10'
                }`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    !isStepValid()
                      ? 'bg-secondary text-muted-foreground cursor-not-allowed'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90 gold-glow'
                  }`}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid() || isLoading}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    !isStepValid() || isLoading
                      ? 'bg-secondary text-muted-foreground cursor-not-allowed'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90 gold-glow'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Finding matches...
                    </>
                  ) : (
                    <>
                      Get Recommendations
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
