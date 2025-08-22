import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Shield, Globe, ShoppingBag, BarChart3, Smartphone } from 'lucide-react'
import type { DemoSection } from '../App'

interface HeroProps {
  setActiveSection: (section: DemoSection) => void
}

export const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const features = [
    {
      icon: Sparkles,
      title: '3D Studio',
      description: 'Design your space in stunning 3D with real-time rendering',
      color: 'from-purple-500 to-pink-500',
      demo: 'studio' as const
    },
    {
      icon: ShoppingBag,
      title: 'Marketplace',
      description: 'Shop premium furniture with integrated payments',
      color: 'from-blue-500 to-cyan-500',
      demo: 'market' as const
    },
    {
      icon: BarChart3,
      title: 'Business Flow',
      description: 'Complete ERP/CRM for home service businesses',
      color: 'from-green-500 to-emerald-500',
      demo: 'flow' as const
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Manage your home with wallet and maintenance tools',
      color: 'from-orange-500 to-red-500',
      demo: 'home' as const
    }
  ]

  const stats = [
    { label: 'Beta Users', value: '2K+' },
    { label: 'Projects Created', value: '1.5K+' },
    { label: 'Revenue Generated', value: '₹5Cr+' },
    { label: 'Partner Businesses', value: '30+' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Complete Home Platform Demo</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Transform Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                  Home Experience
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                From 3D design to marketplace shopping, mobile management to business operations -
                experience the complete ecosystem for modern home living.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection('studio')}
                className="flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                <span>Start 3D Demo</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                <span>Watch Overview</span>
                <Globe className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-400/20 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl" />
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Four Powerful Applications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each module is designed to work seamlessly together, creating a comprehensive 
              ecosystem for home design, shopping, and management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveSection(feature.demo)}
                className="group cursor-pointer"
              >
                <div className="relative p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    <span>Try Demo</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Building the Future
            </h2>
            <p className="text-xl text-gray-600">
              Join the growing community transforming their homes
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Interactive Demo</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Experience the future of home design and management with our integrated platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                <Zap className="w-5 h-5" />
                <span>Start Free Trial</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                <Shield className="w-5 h-5" />
                <span>Enterprise Demo</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}