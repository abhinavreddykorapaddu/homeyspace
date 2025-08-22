import React from 'react'
import { motion } from 'framer-motion'
import { Home, Palette, ShoppingBag, BarChart3, Smartphone, Users, Briefcase, Bell, Search, User } from 'lucide-react'
import type { DemoSection } from '../App'

interface HeaderProps {
  activeSection: DemoSection
  setActiveSection: (section: DemoSection) => void
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'overview' as const, label: 'Home', icon: Home },
    { id: 'studio' as const, label: 'Studio', icon: Palette },
    { id: 'market' as const, label: 'Market', icon: ShoppingBag },
    { id: 'flow' as const, label: 'Flow', icon: BarChart3 },
    { id: 'mobile' as const, label: 'Mobile', icon: Smartphone },
    { id: 'about' as const, label: 'About', icon: Users },
    { id: 'careers' as const, label: 'Careers', icon: Briefcase },
  ]

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#1a237e] shadow-lg"
      style={{ boxShadow: '0 2px 4px rgba(26, 35, 126, 0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setActiveSection('overview')}
          >
            <img 
              src="/OnlyHomeyspace-trans.png" 
              alt="HomeySpace" 
              className="h-10 w-auto"
            />
          </motion.div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-[#2196f3] text-white'
                    : 'text-white/80 hover:bg-[#e3f2fd]/10 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Profile"
            >
              <User className="w-5 h-5" />
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden absolute top-full left-0 right-0 bg-[#1a237e] border-t border-[#2196f3]/20">
        <div className="px-4 py-2">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-[#2196f3] text-white'
                    : 'text-white/80 hover:bg-[#e3f2fd]/10 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  )
}