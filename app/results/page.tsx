'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Wine, Star, Shield, Info, RefreshCw, AlertCircle, ArrowLeft, IndianRupee } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function ResultsPage() {
  const router = useRouter();
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAIRecommendations = async () => {
    setLoading(true);
    setError(false);
    
    try {
      const storedData = localStorage.getItem('discoveryFormData');
      if (!storedData) {
        router.push('/discover');
        return;
      }

      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: storedData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server Error');
      }

      const data = await response.json();
      
      // Safety check: Ensure the AI returned the expected recommendations array
      if (!data.recommendations || data.recommendations.length === 0) {
        setAiResponse({ recommendations: [] });
      } else {
        setAiResponse(data);
      }
    } catch (err: any) {
      console.error("Frontend Error:", err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIRecommendations();
  }, []);

  // 1. LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col items-center justify-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Wine className="h-16 w-16 text-primary" />
        </motion.div>
        <h2 className="text-2xl font-bold amber-text uppercase tracking-widest animate-pulse">
          Sommelier is fetching from database...
        </h2>
      </div>
    );
  }

  // 2. ERROR OR EMPTY STATE
  if (error || !aiResponse?.recommendations || aiResponse.recommendations.length === 0) {
    return (
      <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Matches Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Our AI couldn't find drinks in your budget or state. Try increasing your budget or changing your taste profile.
        </p>
        <div className="flex space-x-4">
          <button 
            onClick={() => router.push('/discover')}
            className="flex items-center px-6 py-3 bg-secondary rounded-lg font-bold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Discover
          </button>
          <button 
            onClick={fetchAIRecommendations}
            className="flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Retry AI Search
          </button>
        </div>
      </div>
    );
  }

  // 3. SUCCESS STATE
  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-foreground mb-2"
          >
            THE AI SELECTION
          </motion.h1>
          <div className="h-1 w-24 bg-primary mx-auto mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {aiResponse.recommendations.map((rec: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col border border-primary/10 hover:border-primary/40 transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-1 rounded tracking-tighter">
                  DATABASE VERIFIED
                </span>
                <Star className="h-5 w-5 text-primary fill-current" />
              </div>

              <h3 className="text-2xl font-bold mb-1 group-hover:amber-text transition-colors leading-tight">
                {rec.name}
              </h3>
              <div className="flex items-center text-white mb-4">
                <IndianRupee className="h-4 w-4 text-primary mr-1" />
                <span className="text-lg font-bold">{rec.price}</span>
              </div>
              
              <div className="flex-grow">
                <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">
                  "{rec.description}"
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-white/10 bg-white/5 -mx-6 px-6 -mb-6 pb-6">
                <div className="flex items-center space-x-2 text-green-400 mb-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">The Safe Pour Advice</span>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">
                  {rec.serving}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-6 border-l-4 border-orange-500 bg-orange-500/5">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">RAG Verification:</strong> These prices and brands are retrieved directly from our curated database for your state. Final availability may vary by retail outlet.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}