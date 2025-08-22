import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, Users, FolderOpen, FileText, TrendingUp, DollarSign, 
  Calendar, AlertCircle, Plus, Search, Filter, Download, Upload,
  Edit, Trash2, Eye, Phone, Mail, MapPin, Clock, CheckCircle,
  XCircle, Settings, Bell, CreditCard, Zap, Building, Home,
  Package, Truck, Star, MessageSquare, PieChart, Activity
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalProjects: number
  totalSpent: number
  status: 'active' | 'inactive' | 'potential'
  lastContact: string
  avatar: string
}

interface Project {
  id: string
  name: string
  client: string
  clientId: string
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold'
  progress: number
  budget: number
  spent: number
  startDate: string
  endDate: string
  team: string[]
  priority: 'low' | 'medium' | 'high'
  category: string
}

interface Invoice {
  id: string
  clientName: string
  projectId: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  dueDate: string
  createdDate: string
  gstAmount: number
  items: Array<{
    description: string
    quantity: number
    rate: number
    amount: number
  }>
}

export const FlowDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false)
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹3,28,000',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Active Projects',
      value: '24',
      change: '+8.2%',
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Customers',
      value: '156',
      change: '+15.3%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Growth Rate',
      value: '23.1%',
      change: '+2.4%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  const customers: Customer[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 9876543210',
      address: 'Banjara Hills, Hyderabad',
      totalProjects: 3,
      totalSpent: 450000,
      status: 'active',
      lastContact: '2024-01-15',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'Priya Singh',
      email: 'priya.singh@email.com',
      phone: '+91 9876543211',
      address: 'Jubilee Hills, Hyderabad',
      totalProjects: 1,
      totalSpent: 180000,
      status: 'active',
      lastContact: '2024-01-12',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '3',
      name: 'TechCorp Solutions',
      email: 'contact@techcorp.com',
      phone: '+91 9876543212',
      address: 'HITEC City, Hyderabad',
      totalProjects: 2,
      totalSpent: 850000,
      status: 'active',
      lastContact: '2024-01-10',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ]

  const projects: Project[] = [
    {
      id: 'PRJ-001',
      name: 'Modern Villa Renovation',
      client: 'Rajesh Kumar',
      clientId: '1',
      status: 'in-progress',
      progress: 65,
      budget: 2500000,
      spent: 1200000,
      startDate: '2024-01-01',
      endDate: '2024-03-15',
      team: ['Architect', 'Interior Designer', 'Project Manager'],
      priority: 'high',
      category: 'Residential'
    },
    {
      id: 'PRJ-002',
      name: 'Office Interior Design',
      client: 'TechCorp Solutions',
      clientId: '3',
      status: 'planning',
      progress: 15,
      budget: 1800000,
      spent: 0,
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      team: ['Interior Designer', 'Space Planner'],
      priority: 'medium',
      category: 'Commercial'
    },
    {
      id: 'PRJ-003',
      name: 'Apartment Makeover',
      client: 'Priya Singh',
      clientId: '2',
      status: 'completed',
      progress: 100,
      budget: 800000,
      spent: 750000,
      startDate: '2023-11-01',
      endDate: '2024-01-10',
      team: ['Interior Designer'],
      priority: 'low',
      category: 'Residential'
    }
  ]

  const invoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      clientName: 'Rajesh Kumar',
      projectId: 'PRJ-001',
      amount: 450000,
      status: 'paid',
      dueDate: '2024-01-30',
      createdDate: '2024-01-15',
      gstAmount: 81000,
      items: [
        { description: 'Design Consultation', quantity: 1, rate: 50000, amount: 50000 },
        { description: 'Material Supply', quantity: 1, rate: 300000, amount: 300000 },
        { description: 'Installation Services', quantity: 1, rate: 100000, amount: 100000 }
      ]
    },
    {
      id: 'INV-2024-002',
      clientName: 'TechCorp Solutions',
      projectId: 'PRJ-002',
      amount: 200000,
      status: 'sent',
      dueDate: '2024-02-15',
      createdDate: '2024-01-20',
      gstAmount: 36000,
      items: [
        { description: 'Space Planning', quantity: 1, rate: 75000, amount: 75000 },
        { description: 'Design Development', quantity: 1, rate: 125000, amount: 125000 }
      ]
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'project',
      title: 'Project milestone completed: Villa Renovation',
      description: 'Electrical work phase completed successfully',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'invoice',
      title: 'Invoice INV-2024-089 paid',
      description: 'Payment received from Rajesh Kumar',
      time: '4 hours ago',
      icon: CreditCard,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'customer',
      title: 'New customer inquiry',
      description: 'Arjun Patel interested in home renovation',
      time: '6 hours ago',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Material delivery delayed',
      description: 'Tiles delivery for Project #PRJ-045 delayed by 2 days',
      time: '1 day ago',
      icon: AlertCircle,
      color: 'text-yellow-600'
    }
  ]

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'services', label: 'Professional Services', icon: Users },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const statusColors = {
    'planning': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'on-hold': 'bg-red-100 text-red-800',
    'active': 'bg-green-100 text-green-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'potential': 'bg-blue-100 text-blue-800',
    'draft': 'bg-gray-100 text-gray-800',
    'sent': 'bg-blue-100 text-blue-800',
    'paid': 'bg-green-100 text-green-800',
    'overdue': 'bg-red-100 text-red-800'
  }

  // Professional services data
  const professionalServices = [
    {
      id: 'arch-1',
      name: 'Rajesh Architects',
      category: 'Architecture',
      rating: 4.9,
      reviews: 127,
      experience: '15+ years',
      projects: 200,
      price: 'From ₹150/sq ft',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      specialties: ['Residential', 'Commercial', 'Sustainable Design'],
      location: 'Hyderabad',
      verified: true,
      description: 'Award-winning architectural firm specializing in modern residential and commercial designs'
    },
    {
      id: 'interior-1',
      name: 'Design Studio Pro',
      category: 'Interior Design',
      rating: 4.8,
      reviews: 89,
      experience: '10+ years',
      projects: 150,
      price: 'From ₹80/sq ft',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      specialties: ['Interior Design', 'Space Planning', 'Furniture Selection'],
      location: 'Bangalore',
      verified: true,
      description: 'Creative interior design studio known for innovative space solutions and luxury finishes'
    },
    {
      id: 'consultant-1',
      name: 'BuildRight Consultants',
      category: 'Engineering',
      rating: 4.7,
      reviews: 156,
      experience: '20+ years',
      projects: 300,
      price: 'From ₹5000/consultation',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      specialties: ['Structural Engineering', 'Project Management', 'Quality Control'],
      location: 'Mumbai',
      verified: true,
      description: 'Leading engineering consultancy providing comprehensive construction and project management services'
    },
    {
      id: 'legal-1',
      name: 'PropertyLaw Associates',
      category: 'Legal',
      rating: 4.6,
      reviews: 203,
      experience: '12+ years',
      projects: 500,
      price: 'From ₹2000/consultation',
      image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      specialties: ['Property Law', 'Real Estate', 'Documentation'],
      location: 'Delhi',
      verified: true,
      description: 'Specialized legal services for real estate transactions and property documentation'
    },
    {
      id: 'ca-1',
      name: 'TaxPro Chartered Accountants',
      category: 'Finance',
      rating: 4.8,
      reviews: 134,
      experience: '18+ years',
      projects: 400,
      price: 'From ₹1500/consultation',
      image: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      specialties: ['Tax Planning', 'GST Compliance', 'Financial Advisory'],
      location: 'Chennai',
      verified: true,
      description: 'Expert chartered accountants providing comprehensive financial and tax advisory services'
    }
  ]

  const priorityColors = {
    'low': 'bg-gray-100 text-gray-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-red-100 text-red-800'
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className={`text-sm font-medium mt-2 ${stat.color}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
              <button
                onClick={() => setActiveTab('projects')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.client}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[project.status]}`}>
                        {project.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[project.priority]}`}>
                        {project.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="bg-blue-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Budget: ₹{project.budget.toLocaleString()}
                    </span>
                    <span className="text-gray-600">
                      Spent: ₹{project.spent.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="p-2 rounded-full bg-gray-100">
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Revenue Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Overview</h2>
        <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p className="text-gray-600">Interactive revenue analytics</p>
            <p className="text-sm text-gray-500">Monthly and yearly trends</p>
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
        <button
          onClick={() => setShowNewCustomerModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.totalProjects}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[customer.status]}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
        <button
          onClick={() => setShowNewProjectModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.client}</p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className={`px-2 py-1 text-xs rounded-full ${statusColors[project.status]}`}>
                  {project.status.replace('-', ' ')}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[project.priority]}`}>
                  {project.priority}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Budget:</span>
                <span className="font-medium">₹{project.budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Spent:</span>
                <span className="font-medium">₹{project.spent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining:</span>
                <span className="font-medium text-green-600">
                  ₹{(project.budget - project.spent).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Team: {project.team.length} members</span>
                <span className="text-gray-600">{project.category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Professional Services</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Service Provider</span>
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-2">Hire Verified Professionals</h3>
        <p className="text-blue-100">Connect with architects, interior designers, engineers, legal experts, and chartered accountants</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionalServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-32 object-cover"
              />
              {service.verified && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {service.category}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{service.description}</p>
              
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(service.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  {service.rating} ({service.reviews})
                </span>
              </div>
              
              <div className="space-y-1 text-xs mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{service.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects:</span>
                  <span className="font-medium">{service.projects}+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{service.location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-600">{service.price}</span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                  Contact Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-2">Need Custom Services?</h3>
        <p className="text-yellow-800 mb-4">
          Can't find what you're looking for? Post your requirements and get quotes from verified professionals.
        </p>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
          Post Requirement
        </button>
      </div>
    </div>
  )

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Invoice Management</h2>
        <button
          onClick={() => setShowInvoiceModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Invoice</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{invoice.amount.toLocaleString()}
                    <div className="text-xs text-gray-500">
                      +₹{invoice.gstAmount.toLocaleString()} GST
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[invoice.status]}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Business Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <div className="h-64 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-gray-600">Monthly revenue analysis</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Distribution</h3>
          <div className="h-64 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-600">Project category breakdown</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
            <div className="text-sm text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
            <div className="text-sm text-gray-600">On-Time Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">₹2.3L</div>
            <div className="text-sm text-gray-600">Avg Project Value</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderIntegrations = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Google Calendar', icon: Calendar, status: 'connected', color: 'text-blue-600' },
          { name: 'QuickBooks', icon: CreditCard, status: 'available', color: 'text-green-600' },
          { name: 'Zoho Books', icon: FileText, status: 'available', color: 'text-orange-600' },
          { name: 'Slack', icon: MessageSquare, status: 'connected', color: 'text-purple-600' },
          { name: 'WhatsApp Business', icon: Phone, status: 'available', color: 'text-green-600' },
          { name: 'Zapier', icon: Zap, status: 'available', color: 'text-yellow-600' }
        ].map((integration) => (
          <div key={integration.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <integration.icon className={`w-6 h-6 ${integration.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                <p className={`text-sm ${
                  integration.status === 'connected' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {integration.status === 'connected' ? 'Connected' : 'Available'}
                </p>
              </div>
            </div>
            <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
              integration.status === 'connected'
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}>
              {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Custom Integrations</h3>
        <p className="text-blue-800 mb-4">
          Need a custom integration? Our API allows you to connect with any third-party service.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          View API Documentation
        </button>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'customers': return renderCustomers()
      case 'projects': return renderProjects()
      case 'services': return renderServices()
      case 'invoices': return renderInvoices()
      case 'analytics': return renderAnalytics()
      case 'integrations': return renderIntegrations()
      case 'settings': return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600">Settings panel with billing, notifications, and preferences.</p>
          </div>
        </div>
      )
      default: return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HomeySpace</h1>
                <p className="text-sm text-gray-500">Flow ERP/CRM</p>
              </div>
            </div>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>

      {/* Modals would go here - simplified for brevity */}
      {/* Customer Detail Modal, Project Detail Modal, Invoice Modal, etc. */}
    </div>
  )
}