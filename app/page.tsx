'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Wine,
  MapPin,
  Target,
  Shield,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AgeVerification from '../components/AgeVerification';

const valueProps = [
  {
    icon: MapPin,
    title: 'State-wise Pricing',
    description: 'Get accurate pricing information tailored to your location with real-time updates.',
    color: 'text-blue-400'
  },
  {
    icon: Target,
    title: 'Taste-based Matching',
    description: 'Our AI analyzes your preferences to recommend spirits that perfectly match your palate.',
    color: 'text-green-400'
  },
  {
    icon: Shield,
    title: 'Safe Drinking Guides',
    description: 'Expert recommendations on responsible consumption and standard serving sizes.',
    color: 'text-orange-400'
  }
];

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Recommendations',
    description: 'Advanced algorithms learn your taste preferences for personalized suggestions.'
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description: 'Stay updated with trending brands and seasonal recommendations.'
  },
  {
    icon: Award,
    title: 'Premium Collection',
    description: 'Access to an extensive catalog of verified premium spirits and brands.'
  }
];

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = () => {
    setIsVerified(true);
  };

  return (
    <>
      <AgeVerification onVerified={handleVerification} />

      {isVerified && (
        <div className="min-h-screen gradient-bg">
          <Navigation />

          {/* Hero Section */}
          <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Hero Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center lg:text-left"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6"
                  >
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-primary font-medium text-sm">AI-Powered Sommelier</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                  >
                    Your Personal
                    <span className="block amber-text">AI Sommelier</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl"
                  >
                    Discover premium spirits tailored to your taste, occasion, and location.
                    Let our AI guide you to the perfect drink with intelligent recommendations and responsible serving advice.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  >
                    <Link
                      href="/discover"
                      className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors gold-glow group"
                    >
                      Start Discovery
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/brands"
                      className="inline-flex items-center justify-center px-8 py-4 glass-card text-foreground rounded-lg font-semibold text-lg hover:bg-primary/10 transition-colors"
                    >
                      Browse Brands
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Hero Visual */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative flex justify-center lg:justify-end"
                >
                  <div className="relative">
                    {/* 3D Bottle Effect */}
                    <motion.div
                      animate={{
                        rotateY: [0, 5, 0, -5, 0],
                        rotateX: [0, 2, 0, -2, 0]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative w-64 h-96 perspective-1000"
                    >
                      <div className="glass-card w-full h-full rounded-2xl p-8 flex flex-col items-center justify-center text-center transform-gpu">
                        <Wine className="h-24 w-24 text-primary mb-6" />
                        <div className="w-16 h-32 bg-gradient-to-t from-primary/20 to-primary/5 rounded-lg mb-4 relative">
                          <div className="absolute inset-x-2 top-2 bottom-2 bg-gradient-to-t from-primary/30 to-primary/10 rounded"></div>
                        </div>
                        <div className="text-sm text-muted-foreground">Premium Selection</div>
                      </div>

                      {/* Floating Elements */}
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, 0, -5, 0]
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -top-4 -right-4 glass-card p-3 rounded-full"
                      >
                        <Sparkles className="h-6 w-6 text-primary" />
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 10, 0],
                          rotate: [0, -5, 0, 5, 0]
                        }}
                        transition={{
                          duration: 7,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                        className="absolute -bottom-4 -left-4 glass-card p-3 rounded-full"
                      >
                        <Award className="h-6 w-6 text-primary" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Value Propositions */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Why Choose Daru GPT?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Experience the future of spirit discovery with our intelligent platform
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {valueProps.map((prop, index) => {
                  const Icon = prop.icon;
                  return (
                    <motion.div
                      key={prop.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="glass-card p-6 text-center"
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 ${prop.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {prop.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {prop.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                    Advanced AI Technology
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Our sophisticated AI analyzes thousands of data points to provide you with
                    the most accurate and personalized spirit recommendations.
                  </p>

                  <div className="space-y-6">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-4"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">
                              {feature.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="glass-card p-8"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Ready to Discover?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Join thousands of spirit enthusiasts who trust Daru GPT for their premium selections.
                    </p>
                    <Link
                      href="/discover"
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors gold-glow"
                    >
                      Get Started Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      )}
    </>
  );
}
