import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, CreditCard, Wrench, User, Bell, Plus, ArrowRight } from 'lucide-react'

export const HomeDemo: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState('home')

  const quickActions = [
    { icon: CreditCard, title: 'Pay Bills', color: 'bg-blue-500' },
    { icon: Wrench, title: 'Book Service', color: 'bg-green-500' },
    { icon: Bell, title: 'Notifications', color: 'bg-yellow-500' },
    { icon: User, title: 'Profile', color: 'bg-purple-500' }
  ]

  const transactions = [
    { title: 'Electricity Bill', amount: '-₹2,340', date: 'Today', type: 'bill' },
    { title: 'Plumber Service', amount: '-₹850', date: 'Yesterday', type: 'service' },
    { title: 'Wallet Top-up', amount: '+₹5,000', date: '2 days ago', type: 'topup' }
  ]

  const services = [
    { name: 'Plumbing', icon: '🔧', available: true },
    { name: 'Electrical', icon: '⚡', available: true },
    { name: 'AC Repair', icon: '❄️', available: false },
    { name: 'Cleaning', icon: '🧹', available: true }
  ]

  const screens = [
    { id: 'home', label: 'Home' },
    { id: 'wallet', label: 'Wallet' },
    { id: 'services', label: 'Services' },
    { id: 'profile', label: 'Profile' }
  ]

  const renderScreen = () => {
    switch (activeScreen) {
      case 'wallet':
        return (
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl text-white">
              <h3 className="text-lg font-semibold mb-2">HomeySpace Wallet</h3>
              <div className="text-3xl font-bold mb-4">₹12,450</div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium"
              >
                Add Money
              </motion.button>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Recent Transactions</h4>
              <div className="space-y-3">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{transaction.title}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <span className={`font-semibold ${
                      transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'services':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Home Services</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 ${
                    service.available 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{service.icon}</div>
                  <h4 className="font-semibold text-gray-900">{service.name}</h4>
                  <p className={`text-sm ${
                    service.available ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {service.available ? 'Available' : 'Unavailable'}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-semibold text-blue-900 mb-2">Upcoming Service</h4>
              <p className="text-blue-800">AC Service - Tomorrow, 2:00 PM</p>
              <p className="text-sm text-blue-600">CoolTech Services</p>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold">Priya Sharma</h3>
              <p className="text-gray-600">priya.sharma@gmail.com</p>
            </div>

            <div className="space-y-3">
              {[
                'Edit Profile',
                'Payment Methods',
                'Notifications',
                'Help & Support',
                'Settings'
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">{item}</span>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl text-white">
              <h3 className="text-lg font-semibold mb-2">Good Morning</h3>
              <h2 className="text-2xl font-bold">Priya Sharma</h2>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl text-white">
              <p className="text-sm opacity-80 mb-2">HomeySpace Wallet</p>
              <div className="text-2xl font-bold mb-4">₹12,450</div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium"
              >
                Add Money
              </motion.button>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{action.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Recent Activity</h4>
              <div className="space-y-3">
                {transactions.slice(0, 2).map((transaction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{transaction.title}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <span className={`font-semibold ${
                      transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mobile App Demo</h1>
          <p className="text-gray-600 text-lg">
            Complete home management with digital wallet and service booking
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="relative">
            {/* Phone Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-80 h-[640px] bg-black rounded-[3rem] p-2 shadow-2xl"
            >
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="bg-white px-6 py-3 flex justify-between items-center text-sm font-medium">
                  <span>9:41</span>
                  <div className="flex space-x-1">
                    <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                    <div className="w-6 h-2 bg-gray-300 rounded-sm"></div>
                  </div>
                </div>

                {/* Screen Content */}
                <div className="flex-1 bg-gray-50">
                  {renderScreen()}
                </div>

                {/* Bottom Navigation */}
                <div className="bg-white border-t border-gray-200 px-4 py-2">
                  <div className="flex justify-around">
                    {screens.map((screen) => (
                      <motion.button
                        key={screen.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveScreen(screen.id)}
                        className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                          activeScreen === screen.id
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-600'
                        }`}
                      >
                        <div className="w-6 h-6 mb-1">
                          {screen.id === 'home' && <Smartphone className="w-full h-full" />}
                          {screen.id === 'wallet' && <CreditCard className="w-full h-full" />}
                          {screen.id === 'services' && <Wrench className="w-full h-full" />}
                          {screen.id === 'profile' && <User className="w-full h-full" />}
                        </div>
                        <span className="text-xs font-medium">{screen.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute left-full top-1/2 transform -translate-y-1/2 ml-8 space-y-4"
            >
              {[
                { title: 'Digital Wallet', desc: 'UPI payments & bill management' },
                { title: 'Service Booking', desc: 'On-demand home maintenance' },
                { title: 'Real-time Tracking', desc: 'Live updates & notifications' },
                { title: 'Secure Payments', desc: 'Multiple payment options' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white p-4 rounded-lg shadow-lg border border-gray-100 w-64"
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}