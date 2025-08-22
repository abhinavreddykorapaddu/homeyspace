import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Move3D, RotateCw, ZoomIn, Layers, Grid3X3, Ruler, Download, 
  FileImage, FileText, Box, ToggleLeft, ToggleRight, Home, 
  Sofa, Bed, Lamp, Table, Armchair as Chair, Tv, Bath, 
  Maximize, Search, Users, Share2, ShoppingCart, RotateCcw,
  FlipHorizontal, X, Plus, Minus, Eye, EyeOff, Copy, Trash2,
  Settings, Save, Upload, Palette, Sun, Moon, ChevronDown,
  ChevronUp, Menu, Calculator, MessageCircle, Sparkles,
  Wand2, Lightbulb, Zap, Target, Crosshair
} from 'lucide-react'
import { UnifiedGestureHandler, GestureState } from '../utils/gestureHandler'
import { assetManager, Asset3D } from '../utils/assetManager'

interface DesignElement {
  id: string
  assetId: string
  name: string
  position: { x: number; y: number; z?: number }
  rotation: number
  scale: number
  selected: boolean
  price: number
  color?: string
}

interface AIMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  actions?: Array<{
    type: 'add_element' | 'modify_element' | 'suggest_layout'
    data: any
  }>
}

export const StudioWorkspace: React.FC = () => {
  const [is3D, setIs3D] = useState(true)
  const [selectedTool, setSelectedTool] = useState('move')
  const [selectedCategory, setSelectedCategory] = useState('living')
  const [isMetric, setIsMetric] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [designElements, setDesignElements] = useState<DesignElement[]>([])
  const [showBubbleOverlay, setShowBubbleOverlay] = useState<{show: boolean, element?: DesignElement, position: {x: number, y: number}}>({show: false, position: {x: 0, y: 0}})
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showCollabModal, setShowCollabModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [availableAssets, setAvailableAssets] = useState<Asset3D[]>([])
  const [isLandscape, setIsLandscape] = useState(false)
  
  // New states for enhanced functionality
  const [showAssetLibrary, setShowAssetLibrary] = useState(false)
  const [showCostCalculator, setShowCostCalculator] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([])
  const [aiInput, setAiInput] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [calculatorPosition, setCalculatorPosition] = useState({ x: 20, y: 20 })
  const [isDraggingCalculator, setIsDraggingCalculator] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null)

  const canvasRef = useRef<HTMLDivElement>(null)
  const gestureHandlerRef = useRef<UnifiedGestureHandler | null>(null)

  const tools = [
    { id: 'move', label: 'Move', icon: Move3D, description: 'Move objects around' },
    { id: 'rotate', label: 'Rotate', icon: RotateCw, description: 'Rotate objects' },
    { id: 'zoom', label: 'Zoom', icon: ZoomIn, description: 'Zoom in/out' },
    { id: 'grid', label: 'Grid', icon: Grid3X3, description: 'Toggle grid' },
    { id: 'measure', label: 'Measure', icon: Ruler, description: 'Measure distances' },
    { id: 'layers', label: 'Layers', icon: Layers, description: 'Manage layers' },
  ]

  const furnitureCategories = [
    { id: 'living', label: 'Living Room', icon: Sofa, count: 1245 },
    { id: 'bedroom', label: 'Bedroom', icon: Bed, count: 892 },
    { id: 'dining', label: 'Dining', icon: Table, count: 456 },
    { id: 'kitchen', label: 'Kitchen', icon: Home, count: 678 },
    { id: 'bathroom', label: 'Bathroom', icon: Bath, count: 234 },
    { id: 'office', label: 'Office', icon: Table, count: 345 },
    { id: 'outdoor', label: 'Outdoor', icon: Home, count: 123 },
  ]

  const roomTemplates = [
    { 
      id: 'modern-living', 
      name: 'Modern Living', 
      preview: '🏠', 
      size: '20x15 ft', 
      elements: 5,
      description: 'Contemporary living room with minimalist furniture',
      items: ['Modern Sofa', 'Coffee Table', 'Floor Lamp', 'TV Unit', 'Side Table']
    },
    { 
      id: 'cozy-bedroom', 
      name: 'Cozy Bedroom', 
      preview: '🛏️', 
      size: '12x10 ft', 
      elements: 4,
      description: 'Comfortable bedroom setup with essential furniture',
      items: ['Queen Bed', 'Nightstand', 'Wardrobe', 'Reading Chair']
    },
    { 
      id: 'open-kitchen', 
      name: 'Open Kitchen', 
      preview: '🍳', 
      size: '15x12 ft', 
      elements: 8,
      description: 'Modern open kitchen with island and dining area',
      items: ['Kitchen Island', 'Bar Stools', 'Dining Table', 'Chairs']
    },
    { 
      id: 'home-office', 
      name: 'Home Office', 
      preview: '💻', 
      size: '10x8 ft', 
      elements: 3,
      description: 'Productive workspace with ergonomic furniture',
      items: ['Office Desk', 'Ergonomic Chair', 'Bookshelf']
    },
  ]

  const exportFormats = [
    { format: 'PDF', icon: FileText, color: 'text-red-600' },
    { format: 'PNG', icon: FileImage, color: 'text-green-600' },
    { format: '3D', icon: Box, color: 'text-blue-600' },
  ]

  // AI Assistant responses
  const aiResponses = [
    "I can help you design this space! What style are you going for?",
    "Let me suggest some furniture arrangements for better flow.",
    "I notice you have a large living area. Would you like me to add a sectional sofa?",
    "The lighting in this room could be improved. Shall I add some ambient lighting?",
    "This layout looks great! The traffic flow is optimal for daily use.",
    "I can help optimize your budget. Would you like me to suggest alternatives?",
    "Your color scheme is working well. Consider adding some accent pieces.",
    "The room proportions are good. Let me suggest some wall decorations."
  ]

  // Initialize with some default elements for demo
  useEffect(() => {
    const defaultElements: DesignElement[] = [
      {
        id: 'sofa-1',
        assetId: 'living-sofa-1',
        name: 'Modern Sofa',
        position: { x: 150, y: 100, z: is3D ? 0 : undefined },
        rotation: 0,
        scale: 1,
        selected: false,
        price: 45000,
        color: '#3B82F6'
      },
      {
        id: 'table-1',
        assetId: 'living-table-1',
        name: 'Coffee Table',
        position: { x: 200, y: 180, z: is3D ? 0 : undefined },
        rotation: 0,
        scale: 1,
        selected: false,
        price: 15000,
        color: '#8B5CF6'
      },
      {
        id: 'lamp-1',
        assetId: 'living-lamp-1',
        name: 'Floor Lamp',
        position: { x: 100, y: 150, z: is3D ? 0 : undefined },
        rotation: 0,
        scale: 1,
        selected: false,
        price: 8000,
        color: '#F59E0B'
      }
    ]
    setDesignElements(defaultElements)
  }, [is3D])

  // Initialize gesture handler
  useEffect(() => {
    if (canvasRef.current) {
      gestureHandlerRef.current = new UnifiedGestureHandler(canvasRef.current, {
        onGestureStart: (state: GestureState) => {
          console.log('Gesture started:', state)
        },
        onGestureUpdate: (state: GestureState) => {
          console.log('Gesture updated:', state)
        },
        onGestureEnd: (state: GestureState) => {
          console.log('Gesture ended:', state)
        }
      })
    }

    return () => {
      gestureHandlerRef.current = null
    }
  }, [])

  // Load assets when category changes
  useEffect(() => {
    const loadAssets = async () => {
      const assets = assetManager.getAssetsByCategory(selectedCategory, 20)
      setAvailableAssets(assets)
    }
    loadAssets()
  }, [selectedCategory])

  // Handle orientation change for mobile
  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(window.innerHeight < window.innerWidth && window.innerWidth < 1024)
    }

    window.addEventListener('resize', handleOrientationChange)
    handleOrientationChange()

    return () => window.removeEventListener('resize', handleOrientationChange)
  }, [])

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleElementClick = (element: DesignElement, event: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setShowBubbleOverlay({
        show: true,
        element,
        position: {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        }
      })
    }
  }

  const addElementToDesign = (asset: Asset3D) => {
    const newElement: DesignElement = {
      id: `element-${Date.now()}`,
      assetId: asset.id,
      name: asset.name,
      position: { 
        x: Math.random() * 300 + 50, 
        y: Math.random() * 200 + 50,
        z: is3D ? Math.random() * 100 : undefined
      },
      rotation: 0,
      scale: 1,
      selected: false,
      price: asset.price,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }
    setDesignElements(prev => [...prev, newElement])
    
    // AI Assistant feedback
    setTimeout(() => {
      addAIMessage('assistant', `Great choice! I've added the ${asset.name} to your design. Would you like me to suggest complementary pieces?`)
    }, 1000)
  }

  const applyTemplate = (template: any) => {
    const templateElements: DesignElement[] = template.items.map((item: string, index: number) => ({
      id: `template-${Date.now()}-${index}`,
      assetId: `template-${item.toLowerCase().replace(' ', '-')}`,
      name: item,
      position: { 
        x: 100 + (index % 3) * 120, 
        y: 100 + Math.floor(index / 3) * 100,
        z: is3D ? 0 : undefined
      },
      rotation: 0,
      scale: 1,
      selected: false,
      price: Math.floor(Math.random() * 50000) + 10000,
      color: `hsl(${index * 60}, 70%, 60%)`
    }))
    
    setDesignElements(templateElements)
    setActiveTemplate(template.id)
    setShowTemplates(false)
    
    addAIMessage('assistant', `I've applied the ${template.name} template! The layout includes ${template.items.join(', ')}. Would you like me to adjust anything?`)
  }

  const addAIMessage = (type: 'user' | 'assistant', content: string, actions?: any[]) => {
    const newMessage: AIMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      actions
    }
    setAiMessages(prev => [...prev, newMessage])
  }

  const handleAIInput = async () => {
    if (!aiInput.trim()) return
    
    addAIMessage('user', aiInput)
    setAiInput('')
    setIsAiTyping(true)
    
    // Simulate AI processing
    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      addAIMessage('assistant', response)
      setIsAiTyping(false)
    }, 1500)
  }

  const selectMultipleElements = (elementIds: string[]) => {
    setSelectedElements(elementIds)
    setDesignElements(prev => prev.map(el => ({
      ...el,
      selected: elementIds.includes(el.id)
    })))
  }

  const duplicateSelectedElements = () => {
    const elementsToDuplicate = designElements.filter(el => selectedElements.includes(el.id))
    const duplicatedElements = elementsToDuplicate.map(el => ({
      ...el,
      id: `element-${Date.now()}-${Math.random()}`,
      position: { 
        x: el.position.x + 20, 
        y: el.position.y + 20,
        z: el.position.z ? el.position.z + 10 : undefined
      }
    }))
    setDesignElements(prev => [...prev, ...duplicatedElements])
  }

  const deleteSelectedElements = () => {
    setDesignElements(prev => prev.filter(el => !selectedElements.includes(el.id)))
    setSelectedElements([])
  }

  const sendToMarket = () => {
    const bom = designElements.map(el => ({
      id: el.assetId,
      name: el.name,
      price: el.price,
      quantity: 1
    }))
    
    console.log('Sending BOM to marketplace:', bom)
    alert(`Sending ${bom.length} items to marketplace!\nTotal value: ₹${bom.reduce((sum, item) => sum + item.price, 0).toLocaleString()}`)
  }

  const totalCost = designElements.reduce((sum, el) => sum + el.price, 0)

  const theme = isDarkMode ? 'dark' : 'light'
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'

  return (
    <div className={`h-screen ${bgColor} flex ${isLandscape && isFullscreen ? 'landscape-mode' : ''}`}>
      {/* Collapsible Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.3 }}
            className={`w-80 ${cardBg} shadow-lg border-r border-gray-200 flex flex-col ${isLandscape && isFullscreen ? 'w-64' : ''}`}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold ${textPrimary}`}>Design Studio</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                  >
                    {isDarkMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-600" />}
                  </button>
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={`p-2 hover:bg-gray-100 rounded ${isDarkMode ? 'hover:bg-gray-700' : ''}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* 2D/3D Toggle */}
              <div className={`flex items-center justify-between p-3 ${isDarkMode ? 'bg-blue-900' : 'bg-[#90caf9]'} rounded-lg`}>
                <span className={`text-sm font-medium ${textPrimary}`}>View Mode</span>
                <button
                  onClick={() => setIs3D(!is3D)}
                  className="flex items-center space-x-2"
                >
                  {is3D ? (
                    <ToggleRight className="w-6 h-6 text-[#1a237e]" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                  <span className="text-sm font-medium">{is3D ? '3D' : '2D'}</span>
                </button>
              </div>
            </div>

            {/* Tools Section */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-sm font-semibold ${textSecondary}`}>Tools</h3>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={duplicateSelectedElements}
                    disabled={selectedElements.length === 0}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50"
                    title="Duplicate selected"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={deleteSelectedElements}
                    disabled={selectedElements.length === 0}
                    className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                    title="Delete selected"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {tools.map((tool) => (
                  <motion.button
                    key={tool.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
                      selectedTool === tool.id
                        ? 'bg-[#2196f3] text-white'
                        : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-[#e3f2fd]'} ${textSecondary}`
                    }`}
                    title={tool.description}
                  >
                    <tool.icon className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">{tool.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Templates - Collapsible */}
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="w-full flex items-center justify-between mb-3"
              >
                <h3 className={`text-sm font-semibold ${textSecondary}`}>Quick Templates</h3>
                {showTemplates ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <AnimatePresence>
                {showTemplates && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 gap-2"
                  >
                    {roomTemplates.map((template) => (
                      <motion.button
                        key={template.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-[#e3f2fd]'} rounded-lg transition-all text-center ${
                          activeTemplate === template.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => applyTemplate(template)}
                        title={template.description}
                      >
                        <div className="text-lg mb-1">{template.preview}</div>
                        <div className={`text-xs font-medium ${textPrimary}`}>{template.name}</div>
                        <div className={`text-xs ${textSecondary}`}>{template.elements} items</div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Asset Library - Collapsible */}
            <div className="flex-1 p-4 overflow-y-auto">
              <button
                onClick={() => setShowAssetLibrary(!showAssetLibrary)}
                className="w-full flex items-center justify-between mb-3"
              >
                <h3 className={`text-sm font-semibold ${textSecondary}`}>Asset Library</h3>
                {showAssetLibrary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <AnimatePresence>
                {showAssetLibrary && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search 10,000+ assets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'
                        }`}
                      />
                    </div>
                    
                    {furnitureCategories.map((category) => (
                      <div key={category.id}>
                        <button
                          onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                          className={`w-full flex items-center justify-between p-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-lg transition-colors`}
                        >
                          <div className="flex items-center space-x-2">
                            <category.icon className="w-4 h-4 text-[#1a237e]" />
                            <span className={`text-sm font-medium ${textPrimary}`}>{category.label}</span>
                          </div>
                          <span className={`text-xs ${textSecondary}`}>{category.count}</span>
                        </button>
                        
                        {selectedCategory === category.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2 space-y-2 max-h-64 overflow-y-auto"
                          >
                            {availableAssets.slice(0, 10).map((asset) => (
                              <motion.div
                                key={asset.id}
                                whileHover={{ scale: 1.02 }}
                                className={`p-2 ${cardBg} border border-gray-200 rounded cursor-grab hover:shadow-sm transition-all`}
                                draggable
                                onDragEnd={() => addElementToDesign(asset)}
                                onClick={() => addElementToDesign(asset)}
                              >
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center text-white text-xs">
                                    {asset.name.charAt(0)}
                                  </div>
                                  <div className="flex-1">
                                    <p className={`text-xs font-medium ${textPrimary}`}>{asset.name}</p>
                                    <p className={`text-xs ${textSecondary}`}>₹{asset.price.toLocaleString()}</p>
                                  </div>
                                  <Plus className="w-4 h-4 text-blue-600" />
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className={`h-12 ${cardBg} border-b border-gray-200 flex items-center justify-between px-4`}>
          <div className="flex items-center space-x-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}
            <span className={`text-sm font-medium ${textPrimary}`}>
              {is3D ? '3D Design View' : '2D Floor Plan'}
            </span>
            <div className={`flex items-center space-x-2 text-xs ${textSecondary}`}>
              <Ruler className="w-3 h-3" />
              <span>Precision: {isMetric ? '1cm' : '0.5in'}</span>
            </div>
            {selectedElements.length > 0 && (
              <div className={`text-xs ${textSecondary}`}>
                {selectedElements.length} selected
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAIAssistant(true)}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-medium">AI Co-Pilot</span>
            </button>
            
            <button
              onClick={() => setShowCollabModal(true)}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all text-purple-600"
            >
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Collaborate</span>
            </button>
            
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all text-green-600"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-xs font-medium">Share</span>
            </button>

            {exportFormats.map((format) => (
              <motion.button
                key={format.format}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (format.format === 'PDF' || format.format === 'PNG') {
                    alert(`Exporting as ${format.format} with watermark (Free tier)`)
                  } else {
                    alert(`Exporting 3D model...`)
                  }
                }}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all ${format.color}`}
              >
                <format.icon className="w-4 h-4" />
                <span className="text-xs font-medium">{format.format}</span>
              </motion.button>
            ))}

            <button
              onClick={toggleFullscreen}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all text-blue-600"
            >
              <Maximize className="w-4 h-4" />
              <span className="text-xs font-medium">Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="text-gray-400">
              <defs>
                <pattern id="workspace-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#workspace-grid)" />
            </svg>
          </div>

          {/* Interactive 3D/2D Workspace */}
          <div 
            ref={canvasRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ touchAction: 'none' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full h-full max-w-4xl max-h-96"
            >
              {is3D ? (
                // Enhanced 3D View
                <div className={`w-full h-full ${isDarkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-blue-100 to-purple-100'} rounded-xl border-2 border-gray-300 relative overflow-hidden`}>
                  {/* 3D Scene with Interactive Elements */}
                  <div className="absolute inset-0 perspective-1000">
                    <div className="w-full h-full transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                      {/* Floor */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 opacity-50 transform rotateX-90" />
                      
                      {/* Interactive Design Elements */}
                      {designElements.map((element, index) => (
                        <motion.div
                          key={element.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ 
                            opacity: 1, 
                            scale: element.scale,
                            rotateY: element.rotation 
                          }}
                          className={`absolute cursor-pointer transition-all duration-300 ${
                            element.selected ? 'ring-2 ring-blue-400 shadow-lg' : 'hover:shadow-md'
                          }`}
                          style={{ 
                            left: element.position.x,
                            top: element.position.y,
                            transform: `translateZ(${element.position.z || 0}px) rotateY(${element.rotation}deg) scale(${element.scale})`,
                            transformStyle: 'preserve-3d'
                          }}
                          onClick={(e) => handleElementClick(element, e)}
                          whileHover={{ scale: element.scale * 1.1 }}
                          drag
                          dragMomentum={false}
                          onDrag={(event, info) => {
                            setDesignElements(prev => prev.map(el => 
                              el.id === element.id 
                                ? { ...el, position: { ...el.position, x: el.position.x + info.delta.x, y: el.position.y + info.delta.y } }
                                : el
                            ))
                          }}
                        >
                          {/* 3D-like representation */}
                          <div 
                            className="w-16 h-12 rounded transform-gpu"
                            style={{ 
                              backgroundColor: element.color,
                              boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
                            }}
                          >
                            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                              {element.name.charAt(0)}
                            </div>
                            {/* 3D depth effect */}
                            <div 
                              className="absolute top-0 left-0 w-full h-full rounded transform translate-x-1 translate-y-1 -z-10"
                              style={{ backgroundColor: element.color, filter: 'brightness(0.7)' }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* 3D Controls */}
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors">
                      <RotateCw className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors">
                      <ZoomIn className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors">
                      <Target className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ) : (
                // Enhanced 2D View
                <div className={`w-full h-full ${cardBg} rounded-xl border-2 border-gray-300 relative`}>
                  <div className="absolute inset-0 p-4">
                    <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg relative bg-white">
                      {/* Grid overlay for 2D */}
                      <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%" className="text-gray-400">
                          <defs>
                            <pattern id="floor-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#floor-grid)" />
                        </svg>
                      </div>

                      {/* 2D Design Elements */}
                      {designElements.map((element, index) => (
                        <motion.div
                          key={element.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`absolute cursor-pointer transition-all ${
                            element.selected ? 'ring-2 ring-blue-400 bg-blue-100' : 'hover:bg-gray-100'
                          }`}
                          style={{ 
                            left: element.position.x,
                            top: element.position.y,
                            transform: `rotate(${element.rotation}deg)`,
                            width: 40 * element.scale,
                            height: 40 * element.scale
                          }}
                          onClick={(e) => handleElementClick(element, e)}
                          drag
                          dragMomentum={false}
                          onDrag={(event, info) => {
                            setDesignElements(prev => prev.map(el => 
                              el.id === element.id 
                                ? { ...el, position: { ...el.position, x: el.position.x + info.delta.x, y: el.position.y + info.delta.y } }
                                : el
                            ))
                          }}
                        >
                          <div 
                            className="w-full h-full border-2 rounded flex items-center justify-center text-xs font-bold"
                            style={{ 
                              borderColor: element.color,
                              backgroundColor: element.selected ? element.color + '20' : 'white'
                            }}
                          >
                            {element.name.charAt(0)}
                          </div>
                        </motion.div>
                      ))}

                      {/* Room boundaries */}
                      <div className="absolute inset-4 border-4 border-gray-400 rounded-lg pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Bubble Overlay */}
          <AnimatePresence>
            {showBubbleOverlay.show && showBubbleOverlay.element && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute z-50 ${cardBg} rounded-lg shadow-xl border border-gray-200 p-4 min-w-48`}
                style={{
                  left: showBubbleOverlay.position.x,
                  top: showBubbleOverlay.position.y - 100
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-semibold ${textPrimary}`}>{showBubbleOverlay.element.name}</h4>
                  <button
                    onClick={() => setShowBubbleOverlay({show: false, position: {x: 0, y: 0}})}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    <ShoppingCart className="w-3 h-3" />
                    <span>View in Market</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    <Plus className="w-3 h-3" />
                    <span>Add to Cart</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                    <RotateCw className="w-3 h-3" />
                    <span>Rotate</span>
                  </button>
                  <button className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                    <FlipHorizontal className="w-3 h-3" />
                    <span>Flip</span>
                  </button>
                </div>
                
                <div className={`text-xs ${textSecondary}`}>
                  Price: ₹{showBubbleOverlay.element.price.toLocaleString()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Measurement Overlay */}
          <div className={`absolute top-4 left-4 ${cardBg}/90 backdrop-blur-sm p-2 rounded-lg border border-gray-200`}>
            <div className="flex items-center space-x-2 text-xs">
              <Ruler className="w-3 h-3 text-[#1a237e]" />
              <span className={`font-medium ${textPrimary}`}>Room: 20x15 {isMetric ? 'ft' : 'm'}</span>
            </div>
          </div>

          {/* Floating Cost Calculator */}
          <AnimatePresence>
            {showCostCalculator && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                drag
                dragMomentum={false}
                className={`absolute z-40 ${cardBg}/95 backdrop-blur-sm p-4 rounded-lg border border-gray-200 min-w-64 cursor-move`}
                style={{
                  left: calculatorPosition.x,
                  top: calculatorPosition.y
                }}
                onDrag={(event, info) => {
                  setCalculatorPosition({
                    x: calculatorPosition.x + info.delta.x,
                    y: calculatorPosition.y + info.delta.y
                  })
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-sm font-semibold ${textPrimary}`}>Live Cost Calculator</h4>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={sendToMarket}
                      className="flex items-center space-x-1 bg-[#2196f3] text-white px-2 py-1 rounded text-xs hover:bg-[#1976d2] transition-colors"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Send to Market</span>
                    </button>
                    <button
                      onClick={() => setShowCostCalculator(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="space-y-1 text-xs mb-3">
                  <div className="flex justify-between">
                    <span className={textSecondary}>Items ({designElements.length}):</span>
                    <span className={`font-medium ${textPrimary}`}>₹{totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={textSecondary}>Installation:</span>
                    <span className={`font-medium ${textPrimary}`}>₹{Math.floor(totalCost * 0.12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={textSecondary}>Delivery:</span>
                    <span className={`font-medium ${textPrimary}`}>₹{Math.floor(totalCost * 0.03).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-1 mt-2">
                    <div className="flex justify-between font-semibold text-[#1a237e]">
                      <span>Total:</span>
                      <span>₹{Math.floor(totalCost * 1.15).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`text-xs ${textSecondary}`}>
                  Real-time supplier rates • Bulk pricing available
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Action Buttons */}
          <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCostCalculator(!showCostCalculator)}
              className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
              title="Cost Calculator"
            >
              <Calculator className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowAIAssistant(true)}
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all"
              title="AI Assistant"
            >
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {showAIAssistant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAIAssistant(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`${cardBg} rounded-xl max-w-md w-full max-h-[80vh] flex flex-col`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${textPrimary}`}>AI Design Co-Pilot</h3>
                    <p className={`text-xs ${textSecondary}`}>Real-time design assistance</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAIAssistant(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {aiMessages.length === 0 && (
                  <div className="text-center py-8">
                    <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className={`${textSecondary} mb-2`}>Hi! I'm your AI design assistant.</p>
                    <p className={`text-sm ${textSecondary}`}>Ask me anything about your design!</p>
                  </div>
                )}
                
                {aiMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isAiTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAIInput()}
                    placeholder="Ask me about your design..."
                    className={`flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'
                    }`}
                  />
                  <button
                    onClick={handleAIInput}
                    disabled={!aiInput.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
                  >
                    <Zap className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    "Suggest furniture layout",
                    "Optimize for small space",
                    "Add lighting suggestions",
                    "Color scheme ideas"
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setAiInput(suggestion)
                        handleAIInput()
                      }}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collaboration Modal */}
      <AnimatePresence>
        {showCollabModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowCollabModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`${cardBg} p-6 rounded-xl max-w-md w-full mx-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Collaborate on Design</h3>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter collaborator email"
                  className={`w-full p-3 border border-gray-200 rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                />
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="edit-permission" />
                  <label htmlFor="edit-permission" className={`text-sm ${textSecondary}`}>
                    Allow editing permissions
                  </label>
                </div>
                <div className="flex space-x-3">
                  <button className="flex-1 bg-[#2196f3] text-white py-2 rounded-lg">
                    Send Invite
                  </button>
                  <button 
                    onClick={() => setShowCollabModal(false)}
                    className={`flex-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} ${textPrimary} py-2 rounded-lg`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`${cardBg} p-6 rounded-xl max-w-md w-full mx-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Share Design</h3>
              <div className="space-y-3">
                <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
                  <p className={`text-sm ${textSecondary} mb-2`}>Share Link:</p>
                  <p className={`text-xs ${textPrimary} font-mono`}>
                    https://homeyspace.com/design/abc123
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-blue-600 text-white py-2 rounded-lg text-sm">
                    Copy Link
                  </button>
                  <button className="bg-green-600 text-white py-2 rounded-lg text-sm">
                    WhatsApp
                  </button>
                </div>
                <button 
                  onClick={() => setShowShareModal(false)}
                  className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} ${textPrimary} py-2 rounded-lg`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}