import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Move3D, Layers, Download, RotateCcw, ZoomIn } from 'lucide-react'

export const StudioDemo: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('move')
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const tools = [
    { id: 'move', label: 'Move', icon: Move3D },
    { id: 'rotate', label: 'Rotate', icon: RotateCcw },
    { id: 'zoom', label: 'Zoom', icon: ZoomIn },
    { id: 'layers', label: 'Layers', icon: Layers },
  ]

  const furnitureItems = [
    { id: 'sofa', name: 'Modern Sofa', price: 45000, color: '#3B82F6' },
    { id: 'table', name: 'Coffee Table', price: 15000, color: '#8B5CF6' },
    { id: 'chair', name: 'Accent Chair', price: 12000, color: '#10B981' },
    { id: 'lamp', name: 'Floor Lamp', price: 8000, color: '#F59E0B' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">3D Studio Demo</h1>
          <p className="text-slate-300 text-lg">
            Design your space in stunning 3D with real-time rendering and live cost calculation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Left Sidebar - Tools */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <div className="space-y-2 mb-6">
              {tools.map((tool) => (
                <motion.button
                  key={tool.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    selectedTool === tool.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700/50 hover:bg-slate-700'
                  }`}
                >
                  <tool.icon className="w-5 h-5" />
                  <span>{tool.label}</span>
                </motion.button>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-4">Furniture Library</h3>
            <div className="space-y-3">
              {furnitureItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-slate-700/50 rounded-lg border border-slate-600 cursor-grab hover:bg-slate-700/70 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-400">₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main 3D Canvas */}
          <div className="lg:col-span-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full bg-gradient-to-b from-blue-900/20 to-purple-900/20 rounded-xl border border-slate-700 relative overflow-hidden"
            >
              {/* 3D Scene Mockup */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Floor Grid */}
                  <div className="absolute inset-0 opacity-20">
                    <svg width="400" height="300" className="text-blue-400">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* 3D Objects */}
                  <div className="relative z-10 space-y-4">
                    {furnitureItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedItem(item.id)}
                        className={`w-16 h-12 rounded-lg cursor-pointer transition-all ${
                          selectedItem === item.id ? 'ring-2 ring-blue-400' : ''
                        }`}
                        style={{ 
                          backgroundColor: item.color,
                          transform: `translate(${index * 30}px, ${index * 20}px) perspective(100px) rotateX(45deg)`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating UI */}
              <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-sm p-3 rounded-lg border border-slate-600">
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">3D Design Mode</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm p-3 rounded-lg border border-slate-600">
                <p className="text-sm text-slate-300">
                  Drag items from the library • Use tools to manipulate objects
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar - Properties */}
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-semibold mb-4">Cost Calculator</h3>
            
            <div className="space-y-3 mb-6">
              {furnitureItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 bg-slate-700/30 rounded">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm text-green-400">₹{item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-600 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total Cost</span>
                <span className="text-xl font-bold text-green-400">
                  ₹{furnitureItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 py-3 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export Design</span>
              </motion.button>
            </div>

            <div className="mt-6 p-4 bg-purple-900/30 rounded-lg border border-purple-700">
              <h4 className="font-semibold text-purple-300 mb-2">Live Features</h4>
              <ul className="text-sm text-purple-200 space-y-1">
                <li>• Real-time 3D rendering</li>
                <li>• Physics-based lighting</li>
                <li>• Material previews</li>
                <li>• AR/VR export ready</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}