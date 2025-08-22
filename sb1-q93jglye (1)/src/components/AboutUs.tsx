import React from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Award, Globe, Heart, Lightbulb } from 'lucide-react'

export const AboutUs: React.FC = () => {
  const founders = [
    {
      name: 'Rakesh Reddy Nayani',
      role: 'Co-Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Visionary leader with 12+ years in real estate technology and home design innovation.'
    },
    {
      name: 'Abhinav Reddy K',
      role: 'Co-Founder, Director, Head of Finance and Operations',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Strategic operations expert with extensive experience in scaling technology platforms.'
    },
    {
      name: 'Anurag Rao G',
      role: 'Director, Chief Product Officer',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Product visionary focused on creating intuitive user experiences and innovative solutions.'
    }
  ]

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Constantly pushing boundaries in home design technology'
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every decision is made with our users\' needs at the forefront'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality products and services'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making professional home design tools accessible to everyone'
    }
  ]

  const stats = [
    { number: '1.7K+', label: 'Active Users' },
    { number: '23+', label: 'Projects Created' },
    { number: '30+', label: 'MOUs' },
    { number: '30', label: 'Team Members' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#1a237e] to-[#2196f3] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">About HomeySpace</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing how people design, shop for, and manage their homes through 
              innovative technology and comprehensive integrated solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To democratize home design and management by providing powerful, intuitive tools 
                that make professional-quality results accessible to everyone. We believe that 
                everyone deserves a beautiful, functional home that reflects their personality and lifestyle.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through our integrated platform combining 3D design, marketplace, mobile management, 
                and business tools, we're creating an ecosystem that serves homeowners, designers, 
                and service providers alike.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <Target className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-blue-100">
                  To become the world's leading platform for home design and management, 
                  empowering millions of people to create their dream spaces with confidence and ease.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-gray-600">Numbers that reflect our commitment to excellence</p>
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
                <div className="text-4xl font-bold text-[#1a237e] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Meet the visionaries behind HomeySpace's innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#1a237e] to-[#2196f3] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                  <p className="text-[#2196f3] font-medium mb-3">{founder.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{founder.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#1a237e] to-[#2196f3] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Culture</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At HomeySpace, we foster a culture of innovation, collaboration, and continuous learning. 
                Our team of 30 dedicated professionals comes from diverse backgrounds, bringing unique 
                perspectives to solve complex challenges in the home design industry.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2196f3] rounded-full"></div>
                  <span className="text-gray-700">Remote-first work environment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2196f3] rounded-full"></div>
                  <span className="text-gray-700">Continuous learning and development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2196f3] rounded-full"></div>
                  <span className="text-gray-700">Innovation-driven mindset</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2196f3] rounded-full"></div>
                  <span className="text-gray-700">Work-life balance priority</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
                <Users className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
                <p className="text-purple-100 mb-6">
                  We're always looking for talented individuals who share our passion 
                  for innovation and excellence in home design technology.
                </p>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                  View Open Positions
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}