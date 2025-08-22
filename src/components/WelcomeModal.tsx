import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageSquare, Lightbulb, Bug, Smartphone, Monitor, ArrowRight } from 'lucide-react'

export const WelcomeModal: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('homeyspace-welcome-seen')
    if (!hasSeenWelcome) {
      setTimeout(() => setShowWelcome(true), 1000)
    }
  }, [])

  const handleClose = () => {
    setShowWelcome(false)
    localStorage.setItem('homeyspace-welcome-seen', 'true')
  }

  const steps = [
    {
      title: 'Welcome to HomeySpace',
      content: (
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Demo Platform</h3>
          <p className="text-gray-600 leading-relaxed">
            This is an <span className="font-semibold text-blue-600">interactive preview</span> of our comprehensive home design and management platform. 
            The actual product offers more advanced features and capabilities.
          </p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Note:</span> This demo showcases our core concepts and user experience design.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Help Us Improve',
      content: (
        <div>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Your Feedback Matters</h3>
            <p className="text-gray-600">
              We value your input to create the best possible experience. Your feedback directly influences our development priorities.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 font-bold text-sm">4x</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Quick Feedback</h4>
                <p className="text-sm text-gray-600">
                  Tap any element <span className="font-medium">4 times quickly</span> to open the feedback form
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <Bug className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <span className="text-xs font-medium text-red-700">Report Bugs</span>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <Lightbulb className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <span className="text-xs font-medium text-yellow-700">Suggestions</span>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <span className="text-xs font-medium text-blue-700">General</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Device Compatibility',
      content: (
        <div className="text-center">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Monitor className="w-8 h-8 text-purple-600" />
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Optimized Experience</h3>
          <p className="text-gray-600 mb-4">
            Our platform works seamlessly across desktop and mobile devices. The feedback system automatically detects your device type.
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Pro Tip:</span> Try the design studio in landscape mode on mobile for the best editing experience!
            </p>
          </div>
        </div>
      )
    }
  ]

  return (
    <AnimatePresence>
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {currentStep + 1} of {steps.length}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {steps[currentStep].content}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 bg-gray-50">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleClose}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Get Started
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}