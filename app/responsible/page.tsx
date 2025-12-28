'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Phone,
  AlertTriangle,
  Heart,
  Car,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const guidelines = [
  {
    icon: Clock,
    title: 'Know Your Limits',
    description: 'Understand your tolerance and drink slowly. One standard drink per hour is generally safe.',
    tips: [
      'Start with non-alcoholic beverages',
      'Eat before and while drinking',
      'Alternate with water',
      'Know when to stop'
    ]
  },
  {
    icon: Car,
    title: 'Never Drink and Drive',
    description: 'Alcohol impairs judgment, coordination, and reaction time. Always plan for a safe ride home.',
    tips: [
      'Use designated drivers',
      'Call a taxi or rideshare',
      'Stay overnight if needed',
      'Have emergency contacts ready'
    ]
  },
  {
    icon: Users,
    title: 'Drink with Trusted People',
    description: 'Surround yourself with friends who respect your boundaries and will help if needed.',
    tips: [
      'Choose drinking companions wisely',
      'Have a buddy system',
      'Watch out for each other',
      'Know the signs of alcohol poisoning'
    ]
  },
  {
    icon: Heart,
    title: 'Health Considerations',
    description: 'Be aware of how alcohol interacts with medications and health conditions.',
    tips: [
      'Check medication interactions',
      'Consider underlying health conditions',
      'Stay hydrated',
      'Monitor blood alcohol levels'
    ]
  }
];

const mythsVsFacts = [
  {
    myth: 'Coffee sobers you up quickly',
    fact: 'Coffee may make you more alert but doesn\'t reduce blood alcohol levels. Only time does that.',
    icon: XCircle
  },
  {
    myth: 'Beer before liquor, never sicker',
    fact: 'Mixing different types of alcohol doesn\'t prevent hangovers or intoxication.',
    icon: XCircle
  },
  {
    myth: 'You can drink on an empty stomach safely',
    fact: 'Drinking without food increases absorption rate and intoxication effects.',
    icon: XCircle
  },
  {
    myth: 'Cold showers help you sober up',
    fact: 'Cold showers don\'t reduce blood alcohol levels. Rest and time are the only solutions.',
    icon: XCircle
  }
];

const helplines = [
  {
    name: 'National Helpline (India)',
    number: '1800-XXX-XXXX',
    description: '24/7 alcohol and drug abuse helpline',
    hours: '24 hours'
  },
  {
    name: 'Emergency Services',
    number: '112',
    description: 'For medical emergencies and immediate help',
    hours: '24 hours'
  },
  {
    name: 'Delhi Addiction Helpline',
    number: '011-12345678',
    description: 'Delhi-based alcohol and substance abuse support',
    hours: '9 AM - 9 PM'
  },
  {
    name: 'Mumbai Helpline',
    number: '022-12345678',
    description: 'Mumbai-based alcohol and drug counseling',
    hours: '8 AM - 10 PM'
  }
];

export default function ResponsiblePage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-6">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Responsible Drinking
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At Daru GPT, we believe in promoting responsible consumption.
              Here are guidelines, facts, and resources to help you drink safely.
            </p>
          </motion.div>

          {/* Guidelines Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Drinking Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guidelines.map((guideline, index) => {
                const Icon = guideline.icon;
                return (
                  <motion.div
                    key={guideline.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {guideline.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {guideline.description}
                    </p>
                    <ul className="space-y-2">
                      {guideline.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Myths vs Facts */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Myths vs Facts</h2>
            <div className="space-y-4">
              {mythsVsFacts.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-red-500/10 rounded-lg flex-shrink-0">
                        <Icon className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-muted-foreground">Myth:</span>
                          <span className="text-foreground font-medium">{item.myth}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-sm font-medium text-green-400 flex-shrink-0">Fact:</span>
                          <span className="text-muted-foreground">{item.fact}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Legal Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="glass-card p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Info className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Legal Information</h2>
              </div>

              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Age Restrictions:</strong> The legal drinking age in India varies by state,
                  but most states require individuals to be 21 years or older to purchase and consume alcohol.
                  Daru GPT strictly enforces age verification.
                </p>

                <p>
                  <strong className="text-foreground">Licensing:</strong> All alcohol sales and service must comply with
                  local licensing laws. Always purchase from licensed establishments and verify the authenticity of products.
                </p>

                <p>
                  <strong className="text-foreground">Public Consumption:</strong> Public intoxication is illegal in most jurisdictions.
                  Always drink responsibly and be aware of local laws regarding alcohol consumption in public spaces.
                </p>

                <p>
                  <strong className="text-foreground">Health Warnings:</strong> Excessive alcohol consumption can lead to serious health issues
                  including liver disease, addiction, and increased risk of certain cancers. Pregnant women should avoid alcohol entirely.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Helplines */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Help & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {helplines.map((helpline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{helpline.name}</h3>
                      <p className="text-sm text-muted-foreground">{helpline.hours}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{helpline.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold amber-text">{helpline.number}</span>
                    <span className="text-xs text-muted-foreground">Toll-free</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Emergency Warning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 border-l-4 border-red-500"
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">When to Seek Help</h3>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Unconscious or unresponsive person</li>
                  <li>• Vomiting while unconscious (risk of aspiration)</li>
                  <li>• Slow or irregular breathing (less than 8 breaths per minute)</li>
                  <li>• Seizures or convulsions</li>
                  <li>• Hypothermia (body temperature below 36°C)</li>
                  <li>• Severe confusion or disorientation</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  <strong>If you suspect alcohol poisoning:</strong> Call emergency services immediately.
                  Do not leave the person alone and do not try to make them vomit.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
