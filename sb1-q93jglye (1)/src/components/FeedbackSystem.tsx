import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bug, Lightbulb, Star, Smartphone, Monitor } from 'lucide-react'

interface FeedbackData {
  type: 'bug' | 'suggestion' | 'general'
  message: string
  rating?: number
  device: 'desktop' | 'mobile'
  page: string
  element?: string
}

export const FeedbackSystem: React.FC = () => {
  const [showFeedback, setShowFeedback] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const [clickedElement, setClickedElement] = useState<string>('')
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    type: 'general',
    message: '',
    device: window.innerWidth < 768 ? 'mobile' : 'desktop',
    page: window.location.pathname
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const currentTime = Date.now()
      
      // Reset click count if more than 2 seconds have passed
      if (currentTime - lastClickTime > 2000) {
        setClickCount(1)
      } else {
        setClickCount(prev => prev + 1)
      }
      
      setLastClickTime(currentTime)
      
      // Store the clicked element info
      const elementInfo = `${target.tagName.toLowerCase()}${target.className ? '.' + target.className.split(' ').join('.') : ''}`
      setClickedElement(elementInfo)
      
      // Show feedback form after 4 clicks
      if (clickCount >= 3) {
        setShowFeedback(true)
        setFeedbackData(prev => ({
          ...prev,
          element: elementInfo
        }))
        setClickCount(0)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [clickCount, lastClickTime])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Feedback submitted:', feedbackData)
    setIsSubmitting(false)
    setSubmitted(true)
    
    setTimeout(() => {
      setShowFeedback(false)
      setSubmitted(false)
      setFeedbackData({
        type: 'general',
        message: '',
        device: window.innerWidth < 768 ? 'mobile' : 'desktop',
        page: window.location.pathname
      })
    }, 2000)
  }

  const feedbackTypes = [
    { id: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-600' },
    { id: 'suggestion', label: 'Suggestion', icon: Lightbulb, color: 'text-yellow-600' },
    { id: 'general', label: 'General Feedback', icon: MessageSquare, color: 'text-blue-600' }
  ]

  return (
    <AnimatePresence>
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowFeedback(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {!submitted ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Share Feedback</h3>
                      <p className="text-sm text-gray-500">Help us improve HomeySpace</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFeedback(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Feedback Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feedback Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {feedbackTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFeedbackData(prev => ({ ...prev, type: type.id as any }))}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            feedbackData.type === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <type.icon className={`w-5 h-5 mx-auto mb-1 ${
                            feedbackData.type === type.id ? 'text-blue-600' : type.color
                          }`} />
                          <span className={`text-xs font-medium ${
                            feedbackData.type === type.id ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      value={feedbackData.message}
                      onChange={(e) => setFeedbackData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us what you think or report an issue..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Rating for general feedback */}
                  {feedbackData.type === 'general' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Overall Rating
                      </label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFeedbackData(prev => ({ ...prev, rating: star }))}
                            className="text-2xl focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                (feedbackData.rating || 0) >= star
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Device Info */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Device:</span>
                      <div className="flex items-center space-x-1">
                        {feedbackData.device === 'mobile' ? (
                          <Smartphone className="w-4 h-4" />
                        ) : (
                          <Monitor className="w-4 h-4" />
                        )}
                        <span className="capitalize">{feedbackData.device}</span>
                      </div>
                    </div>
                    {clickedElement && (
                      <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                        <span>Element:</span>
                        <code className="text-xs bg-gray-200 px-2 py-1 rounded">
                          {clickedElement}
                        </code>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !feedbackData.message.trim()}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Feedback</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">Your feedback helps us improve HomeySpace for everyone.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}