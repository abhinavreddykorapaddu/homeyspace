import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, CreditCard, Wrench, Bell, User, Plus, QrCode, 
  Calendar, MessageSquare, Shield, Settings, Moon, Sun,
  IndianRupee, Clock, CheckCircle, AlertCircle, Users,
  MapPin, Phone, Mail, Camera, Scan, Wifi, Battery,
  Signal, ArrowLeft, ArrowRight, Search, Filter,
  Star, Heart, Share, Download, Upload, Edit, Trash2,
  Eye, EyeOff, Lock, Unlock, Volume2, VolumeX,
  Bluetooth, Zap, Package, Truck, Building, Smartphone
} from 'lucide-react'

interface Transaction {
  id: string
  title: string
  amount: number
  type: 'credit' | 'debit'
  category: string
  date: string
  status: 'completed' | 'pending' | 'failed'
  description: string
}

interface ServiceRequest {
  id: string
  type: string
  issue: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  date: string
  technician?: string
  rating?: number
  cost?: number
}

interface CommunityPost {
  id: string
  title: string
  content: string
  author: string
  time: string
  type: 'announcement' | 'alert' | 'event' | 'general'
  likes: number
  comments: number
  image?: string
}

export const MobileApp: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)
  const [walletBalance, setWalletBalance] = useState(12450)
  const [selectedTab, setSelectedTab] = useState('home')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showQRScanner, setShowQRScanner] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'payments', label: 'Wallet', icon: CreditCard },
    { id: 'maintenance', label: 'Services', icon: Wrench },
    { id: 'community', label: 'Community', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  const quickActions = [
    { icon: CreditCard, title: 'Pay Bills', color: 'bg-blue-500', screen: 'payments', count: 3 },
    { icon: Wrench, title: 'Book Service', color: 'bg-green-500', screen: 'maintenance', count: 0 },
    { icon: QrCode, title: 'QR Scanner', color: 'bg-purple-500', screen: 'qr', count: 0 },
    { icon: Bell, title: 'Notifications', color: 'bg-orange-500', screen: 'notifications', count: 5 }
  ]

  const transactions: Transaction[] = [
    {
      id: '1',
      title: 'Electricity Bill',
      amount: -2340,
      type: 'debit',
      category: 'utilities',
      date: 'Today, 2:30 PM',
      status: 'completed',
      description: 'TSPDCL electricity bill payment'
    },
    {
      id: '2',
      title: 'Plumber Service',
      amount: -850,
      type: 'debit',
      category: 'services',
      date: 'Yesterday, 4:15 PM',
      status: 'completed',
      description: 'Kitchen sink repair service'
    },
    {
      id: '3',
      title: 'Wallet Top-up',
      amount: 5000,
      type: 'credit',
      category: 'topup',
      date: '2 days ago',
      status: 'completed',
      description: 'UPI transfer from SBI account'
    },
    {
      id: '4',
      title: 'Maintenance Fee',
      amount: -3500,
      type: 'debit',
      category: 'maintenance',
      date: '3 days ago',
      status: 'completed',
      description: 'Monthly society maintenance'
    }
  ]

  const serviceRequests: ServiceRequest[] = [
    {
      id: '1',
      type: 'Plumbing',
      issue: 'Kitchen sink leak repair',
      status: 'completed',
      date: '12 Jan 2024',
      technician: 'Ravi Kumar',
      rating: 5,
      cost: 850
    },
    {
      id: '2',
      type: 'Electrical',
      issue: 'Bedroom light fixture replacement',
      status: 'in-progress',
      date: '15 Jan 2024',
      technician: 'Suresh Reddy'
    },
    {
      id: '3',
      type: 'AC Service',
      issue: 'Annual maintenance and cleaning',
      status: 'pending',
      date: '18 Jan 2024'
    }
  ]

  const communityPosts: CommunityPost[] = [
    {
      id: '1',
      title: 'Society Meeting - Important',
      content: 'Monthly society meeting scheduled for 20th Jan at 7 PM in the community hall. Agenda includes budget discussion and new amenities.',
      author: 'Society Secretary',
      time: '2 hours ago',
      type: 'announcement',
      likes: 24,
      comments: 8
    },
    {
      id: '2',
      title: 'Water Supply Interruption',
      content: 'Water supply will be interrupted tomorrow (16th Jan) from 10 AM to 12 PM for maintenance work. Please store water accordingly.',
      author: 'Maintenance Team',
      time: '5 hours ago',
      type: 'alert',
      likes: 12,
      comments: 3
    },
    {
      id: '3',
      title: 'New Year Celebration',
      content: 'Thank you everyone for making our New Year celebration a grand success! Photos from the event are now available.',
      author: 'Events Committee',
      time: '1 day ago',
      type: 'event',
      likes: 45,
      comments: 15,
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ]

  const bills = [
    { id: '1', title: 'Electricity Bill', amount: 2340, dueDate: '25 Jan 2024', status: 'pending' },
    { id: '2', title: 'Water Charges', amount: 450, dueDate: '28 Jan 2024', status: 'pending' },
    { id: '3', title: 'Internet Bill', amount: 999, dueDate: '30 Jan 2024', status: 'pending' }
  ]

  // Handle orientation change
  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(window.innerHeight < window.innerWidth && window.innerWidth < 1024)
    }

    window.addEventListener('resize', handleOrientationChange)
    handleOrientationChange()

    return () => window.removeEventListener('resize', handleOrientationChange)
  }, [])

  const theme = isDarkMode ? 'dark' : 'light'
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'

  const payBill = (billId: string) => {
    const bill = bills.find(b => b.id === billId)
    if (bill && walletBalance >= bill.amount) {
      setWalletBalance(prev => prev - bill.amount)
      // Add transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        title: bill.title,
        amount: -bill.amount,
        type: 'debit',
        category: 'utilities',
        date: 'Just now',
        status: 'completed',
        description: `${bill.title} payment`
      }
      // In a real app, you'd update the transactions state
      alert(`${bill.title} paid successfully!`)
    } else {
      alert('Insufficient balance!')
    }
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'payments':
        return (
          <div className="p-4 space-y-4">
            {/* Wallet Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-blue-100 text-sm mb-1">HomeySpace Wallet</p>
                  <div className="text-3xl font-bold">₹{walletBalance.toLocaleString()}</div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-white/20 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-lg">
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Add Money
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Send Money
                </motion.button>
              </div>
            </div>

            {/* Quick Pay Bills */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Pending Bills</h3>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  {bills.filter(b => b.status === 'pending').length} pending
                </span>
              </div>
              
              <div className="space-y-3">
                {bills.filter(b => b.status === 'pending').map((bill) => (
                  <div key={bill.id} className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className={`font-medium ${textPrimary}`}>{bill.title}</p>
                        <p className={`text-sm ${textSecondary}`}>Due: {bill.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${textPrimary}`}>₹{bill.amount}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => payBill(bill.id)}
                      className="w-full bg-[#1a237e] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#2196f3] transition-colors"
                    >
                      Pay Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Recent Transactions</h3>
                <button className={`text-blue-600 text-sm font-medium`}>View All</button>
              </div>
              
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowLeft className="w-4 h-4 text-green-600 rotate-180" />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${textPrimary}`}>{transaction.title}</p>
                        <p className={`text-sm ${textSecondary}`}>{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <p className={`text-xs ${textSecondary}`}>{transaction.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Payment Methods</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'UPI', icon: Smartphone, color: 'bg-green-100 text-green-700' },
                  { name: 'Cards', icon: CreditCard, color: 'bg-blue-100 text-blue-700' },
                  { name: 'Net Banking', icon: Building, color: 'bg-purple-100 text-purple-700' },
                  { name: 'Wallet', icon: Package, color: 'bg-orange-100 text-orange-700' }
                ].map((method) => (
                  <button key={method.name} className={`p-3 ${method.color} rounded-lg text-center transition-colors hover:opacity-80`}>
                    <method.icon className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm font-medium">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 'maintenance':
        return (
          <div className="p-4 space-y-4">
            {/* Service Requests Header */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Service Requests</h3>
                <button 
                  className="bg-[#2196f3] text-white p-2 rounded-lg"
                  onClick={() => alert('Book new service feature')}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {serviceRequests.filter(r => r.status === 'pending').length}
                  </div>
                  <div className={`text-xs ${textSecondary}`}>Pending</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {serviceRequests.filter(r => r.status === 'in-progress').length}
                  </div>
                  <div className={`text-xs ${textSecondary}`}>In Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {serviceRequests.filter(r => r.status === 'completed').length}
                  </div>
                  <div className={`text-xs ${textSecondary}`}>Completed</div>
                </div>
              </div>
            </div>

            {/* Service Requests List */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <h4 className={`font-semibold ${textPrimary} mb-3`}>Recent Requests</h4>
              <div className="space-y-3">
                {serviceRequests.map((request) => (
                  <div key={request.id} className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className={`font-medium ${textPrimary}`}>{request.type}</p>
                        <p className={`text-sm ${textSecondary}`}>{request.issue}</p>
                        <p className={`text-xs ${textSecondary}`}>{request.date}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        request.status === 'completed' ? 'bg-green-100 text-green-800' :
                        request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status.replace('-', ' ')}
                      </span>
                    </div>
                    
                    {request.technician && (
                      <div className={`text-sm ${textSecondary} mb-2`}>
                        Technician: {request.technician}
                      </div>
                    )}
                    
                    {request.status === 'completed' && request.rating && (
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < request.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        {request.cost && (
                          <span className={`text-sm ${textSecondary}`}>
                            • ₹{request.cost}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Services */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Quick Book Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Plumbing', icon: '🔧', available: true, price: 'From ₹500' },
                  { name: 'Electrical', icon: '⚡', available: true, price: 'From ₹300' },
                  { name: 'AC Service', icon: '❄️', available: false, price: 'From ₹800' },
                  { name: 'Cleaning', icon: '🧹', available: true, price: 'From ₹400' },
                  { name: 'Painting', icon: '🎨', available: true, price: 'From ₹1200' },
                  { name: 'Carpentry', icon: '🔨', available: true, price: 'From ₹600' }
                ].map((service) => (
                  <button 
                    key={service.name} 
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      service.available 
                        ? `border-green-200 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-50 hover:bg-green-100'}` 
                        : `border-gray-200 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} opacity-50`
                    }`}
                    disabled={!service.available}
                    onClick={() => service.available && alert(`Booking ${service.name} service`)}
                  >
                    <div className="text-2xl mb-1">{service.icon}</div>
                    <h4 className={`font-semibold ${textPrimary} text-sm`}>{service.name}</h4>
                    <p className={`text-xs ${service.available ? 'text-green-600' : textSecondary}`}>
                      {service.available ? service.price : 'Unavailable'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <h4 className="font-semibold text-red-900 mb-2">Emergency Services</h4>
              <p className="text-red-800 text-sm mb-3">
                For urgent repairs and emergencies, call our 24/7 helpline
              </p>
              <button className="w-full bg-red-600 text-white py-2 rounded-lg font-medium flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Call Emergency: +91 9999-HELP</span>
              </button>
            </div>
          </div>
        )

      case 'community':
        return (
          <div className="p-4 space-y-4">
            {/* Community Header */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Community Board</h3>
                <div className="flex space-x-2">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Search className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { label: 'Announcements', count: 3, color: 'text-blue-600' },
                  { label: 'Events', count: 2, color: 'text-green-600' },
                  { label: 'Alerts', count: 1, color: 'text-red-600' },
                  { label: 'General', count: 8, color: 'text-purple-600' }
                ].map((item) => (
                  <div key={item.label}>
                    <div className={`text-xl font-bold ${item.color}`}>{item.count}</div>
                    <div className={`text-xs ${textSecondary}`}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Posts */}
            <div className="space-y-3">
              {communityPosts.map((post) => (
                <div key={post.id} className={`${cardBg} p-4 rounded-xl shadow-sm`}>
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      post.type === 'alert' ? 'bg-red-500' :
                      post.type === 'announcement' ? 'bg-blue-500' :
                      post.type === 'event' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-semibold ${textPrimary}`}>{post.title}</h4>
                        <span className={`text-xs ${textSecondary}`}>{post.time}</span>
                      </div>
                      <p className={`text-sm ${textSecondary} mb-2`}>{post.content}</p>
                      <p className={`text-xs ${textSecondary} mb-3`}>By {post.author}</p>
                      
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="Post image" 
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm">{post.comments}</span>
                          </button>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Share className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visitor Management */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Visitor Management</h3>
              <div className="space-y-3">
                <button 
                  className="w-full bg-[#2196f3] text-white py-3 rounded-lg flex items-center justify-center space-x-2"
                  onClick={() => setShowQRScanner(true)}
                >
                  <QrCode className="w-5 h-5" />
                  <span>Generate Visitor Pass</span>
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg text-center`}>
                    <p className={`text-2xl font-bold ${textPrimary}`}>12</p>
                    <p className={`text-xs ${textSecondary}`}>Today's Visitors</p>
                  </div>
                  <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg text-center`}>
                    <p className={`text-2xl font-bold ${textPrimary}`}>3</p>
                    <p className={`text-xs ${textSecondary}`}>Active Passes</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className={`font-medium ${textPrimary}`}>Recent Visitors</h4>
                  {[
                    { name: 'Delivery - Amazon', time: '2:30 PM', status: 'completed' },
                    { name: 'Guest - Ravi Kumar', time: '1:15 PM', status: 'active' },
                    { name: 'Service - Plumber', time: '11:00 AM', status: 'completed' }
                  ].map((visitor, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div>
                        <p className={`text-sm font-medium ${textPrimary}`}>{visitor.name}</p>
                        <p className={`text-xs ${textSecondary}`}>{visitor.time}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        visitor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {visitor.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="p-4 space-y-4">
            {/* Profile Header */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm text-center`}>
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 bg-[#2196f3] rounded-full mx-auto flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Camera className="w-3 h-3 text-white" />
                </button>
              </div>
              <h3 className={`text-xl font-bold ${textPrimary}`}>Rajesh Kumar</h3>
              <p className={`${textSecondary}`}>Block A, Flat 304</p>
              <p className={`text-sm ${textSecondary}`}>Sunrise Apartments</p>
              <p className={`text-sm ${textSecondary}`}>rajesh.kumar@email.com</p>
            </div>

            {/* Quick Stats */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <h4 className={`font-semibold ${textPrimary} mb-3`}>Quick Stats</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">₹{walletBalance.toLocaleString()}</div>
                  <div className={`text-xs ${textSecondary}`}>Wallet Balance</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{serviceRequests.length}</div>
                  <div className={`text-xs ${textSecondary}`}>Service Requests</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">4.8</div>
                  <div className={`text-xs ${textSecondary}`}>Community Rating</div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Settings</h3>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
                </button>
              </div>
              
              <div className="space-y-3">
                {[
                  { icon: Edit, label: 'Edit Profile', action: () => alert('Edit profile') },
                  { icon: Bell, label: 'Notification Settings', action: () => alert('Notification settings') },
                  { icon: CreditCard, label: 'Payment Methods', action: () => alert('Payment methods') },
                  { icon: Shield, label: 'Privacy & Security', action: () => alert('Privacy settings') },
                  { icon: Phone, label: 'Help & Support', action: () => alert('Help & support') },
                  { icon: Settings, label: 'App Settings', action: () => alert('App settings') }
                ].map((item) => (
                  <button 
                    key={item.label} 
                    onClick={item.action}
                    className={`w-full flex items-center justify-between p-3 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-lg transition-colors`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={`w-5 h-5 ${textSecondary}`} />
                      <span className={`${textPrimary}`}>{item.label}</span>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${textSecondary}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* App Info */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <h4 className={`font-semibold ${textPrimary} mb-3`}>App Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={textSecondary}>Version</span>
                  <span className={textPrimary}>2.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className={textSecondary}>Last Updated</span>
                  <span className={textPrimary}>Jan 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className={textSecondary}>Storage Used</span>
                  <span className={textPrimary}>45.2 MB</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full text-red-600 font-medium py-2">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="p-4 space-y-4">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Good Morning</h3>
                  <h2 className="text-2xl font-bold">Rajesh Kumar</h2>
                  <p className="text-blue-100 text-sm mt-1">Block A, Flat 304 • Sunrise Apartments</p>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-80">Weather</div>
                  <div className="text-2xl">🌤️</div>
                  <div className="text-sm">28°C</div>
                </div>
              </div>
            </div>

            {/* Wallet Summary */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <div className="flex justify-between items-center mb-3">
                <h4 className={`font-semibold ${textPrimary}`}>Wallet Balance</h4>
                <button className="text-blue-600 text-sm font-medium">View Details</button>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-green-600">₹{walletBalance.toLocaleString()}</div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Add Money
                </motion.button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <h4 className={`font-semibold ${textPrimary} mb-4`}>Quick Actions</h4>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.title}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (action.screen === 'qr') {
                        setShowQRScanner(true)
                      } else if (action.screen === 'notifications') {
                        setShowNotifications(true)
                      } else {
                        setActiveScreen(action.screen)
                      }
                    }}
                    className={`relative flex flex-col items-center p-4 ${cardBg} rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all`}
                  >
                    {action.count > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {action.count}
                      </div>
                    )}
                    <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-sm font-medium ${textPrimary}`}>{action.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <div className="flex justify-between items-center mb-4">
                <h4 className={`font-semibold ${textPrimary}`}>Recent Activity</h4>
                <button className="text-blue-600 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-3">
                {[
                  { icon: CheckCircle, text: 'Electricity bill paid', time: '2 hours ago', color: 'text-green-500' },
                  { icon: Clock, text: 'Plumber service scheduled', time: 'Yesterday', color: 'text-blue-500' },
                  { icon: Users, text: 'Visitor pass generated', time: '2 days ago', color: 'text-purple-500' },
                  { icon: Bell, text: 'Society meeting reminder', time: '3 days ago', color: 'text-orange-500' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${textPrimary}`}>{activity.text}</p>
                      <p className={`text-xs ${textSecondary}`}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Society Updates */}
            <div className={`${cardBg} p-4 rounded-xl shadow-sm`}>
              <h4 className={`font-semibold ${textPrimary} mb-3`}>Society Updates</h4>
              <div className="space-y-3">
                {communityPosts.slice(0, 2).map((post) => (
                  <div key={post.id} className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <h5 className={`font-medium ${textPrimary} text-sm mb-1`}>{post.title}</h5>
                    <p className={`text-xs ${textSecondary} line-clamp-2`}>{post.content}</p>
                    <p className={`text-xs ${textSecondary} mt-1`}>{post.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className={`min-h-screen ${bgColor} py-8`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className={`text-4xl font-bold ${textPrimary} mb-4`}>MyHomeySpace Mobile App</h1>
          <p className={`${textSecondary} text-lg`}>
            Complete society management with digital payments and community features
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="relative">
            {/* Phone Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`w-80 h-[640px] bg-black rounded-[3rem] p-2 shadow-2xl ${
                isLandscape ? 'transform rotate-90 origin-center' : ''
              }`}
            >
              <div className={`w-full h-full ${bgColor} rounded-[2.5rem] overflow-hidden relative`}>
                {/* Status Bar */}
                <div className={`${cardBg} px-6 py-3 flex justify-between items-center text-sm font-medium border-b border-gray-200`}>
                  <div className="flex items-center space-x-1">
                    <span className={textPrimary}>9:41</span>
                    <Signal className="w-3 h-3 text-gray-600" />
                    <Wifi className="w-3 h-3 text-gray-600" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Battery className="w-4 h-4 text-green-500" />
                    <span className={`text-xs ${textSecondary}`}>85%</span>
                  </div>
                </div>

                {/* Screen Content */}
                <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
                  {renderScreen()}
                </div>

                {/* Bottom Navigation */}
                <div className={`${cardBg} border-t border-gray-200 px-2 py-2`}>
                  <div className="flex justify-around">
                    {navItems.map((item) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveScreen(item.id)}
                        className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                          activeScreen === item.id
                            ? 'text-[#2196f3] bg-[#e3f2fd]'
                            : `${textSecondary}`
                        }`}
                      >
                        <item.icon className="w-5 h-5 mb-1" />
                        <span className="text-xs font-medium">{item.label}</span>
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
                { title: 'Digital Wallet', desc: 'UPI payments & bill management with real-time balance' },
                { title: 'Service Booking', desc: 'On-demand maintenance with live tracking & ratings' },
                { title: 'Community Board', desc: 'Society updates, events & visitor management' },
                { title: 'Smart Features', desc: 'QR scanner, dark mode & landscape support' },
                { title: 'Real-time Updates', desc: 'Live notifications & activity tracking' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`${cardBg} p-4 rounded-lg shadow-lg border border-gray-100 w-64`}
                >
                  <h4 className={`font-semibold ${textPrimary} mb-1`}>{feature.title}</h4>
                  <p className={`text-sm ${textSecondary}`}>{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      <AnimatePresence>
        {showQRScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setShowQRScanner(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`${cardBg} p-6 rounded-xl max-w-sm w-full mx-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-gray-400" />
                </div>
                <h3 className={`text-lg font-semibold ${textPrimary} mb-2`}>Visitor QR Code</h3>
                <p className={`text-sm ${textSecondary} mb-4`}>
                  Show this QR code to your visitor for easy entry
                </p>
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                    Share QR Code
                  </button>
                  <button 
                    onClick={() => setShowQRScanner(false)}
                    className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} ${textPrimary} py-2 rounded-lg`}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Modal */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowNotifications(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`${cardBg} p-6 rounded-xl max-w-md w-full mx-4 max-h-96 overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {[
                  { title: 'Bill Payment Due', desc: 'Electricity bill due in 2 days', time: '1h ago', type: 'warning' },
                  { title: 'Service Completed', desc: 'Plumbing service completed successfully', time: '3h ago', type: 'success' },
                  { title: 'Society Meeting', desc: 'Monthly meeting tomorrow at 7 PM', time: '1d ago', type: 'info' },
                  { title: 'Visitor Arrived', desc: 'Your guest has arrived at the gate', time: '2d ago', type: 'info' },
                  { title: 'Payment Successful', desc: 'Water bill payment of ₹450 completed', time: '3d ago', type: 'success' }
                ].map((notification, index) => (
                  <div key={index} className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === 'warning' ? 'bg-yellow-500' :
                        notification.type === 'success' ? 'bg-green-500' :
                        'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <h4 className={`font-medium ${textPrimary} text-sm`}>{notification.title}</h4>
                        <p className={`text-xs ${textSecondary} mt-1`}>{notification.desc}</p>
                        <p className={`text-xs ${textSecondary} mt-1`}>{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}