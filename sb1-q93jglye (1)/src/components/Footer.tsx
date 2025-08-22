import React from 'react'
import { motion } from 'framer-motion'
import { Home, Github, Twitter, Linkedin, Mail, MapPin, Phone, Briefcase } from 'lucide-react'
import type { DemoSection } from '../App'

interface FooterProps {
  setActiveSection: (section: DemoSection) => void
}

export const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 text-white py-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/OnlyHomeyspace-trans.png" 
                alt="HomeySpace" 
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transform your home experience with our integrated platform for design, 
              shopping, management, and business operations.
            </p>
            <div className="flex space-x-4">
              {[Github, Twitter, Linkedin, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Applications</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => setActiveSection('studio')}
                  className="hover:text-white transition-colors"
                >
                  3D Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('market')}
                  className="hover:text-white transition-colors"
                >
                  Marketplace
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('mobile')}
                  className="hover:text-white transition-colors"
                >
                  Mobile App
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('flow')}
                  className="hover:text-white transition-colors"
                >
                  Business Flow
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => setActiveSection('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection('careers')}
                  className="hover:text-white transition-colors flex items-center space-x-2"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Careers</span>
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Hyderabad, India</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>hello@homeyspace.com</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-end items-start md:items-center space-y-2 md:space-y-0 md:space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-400 text-sm text-center">
              © 2024 HomeySpace. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}