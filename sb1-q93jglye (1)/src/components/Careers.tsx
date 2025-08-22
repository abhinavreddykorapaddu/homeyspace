import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, Clock, DollarSign, Users, Code, Palette, 
  BarChart3, Headphones, Briefcase, ArrowRight, Heart
} from 'lucide-react'

export const Careers: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Hyderabad / Remote',
      type: 'Full-time',
      salary: '₹15-25 LPA',
      experience: '4-6 years',
      icon: Code,
      description: 'Lead the development of our React-based design studio and marketplace interfaces.',
      requirements: ['React.js', 'TypeScript', 'Three.js', 'Tailwind CSS', 'WebGL'],
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Bangalore / Remote',
      type: 'Full-time',
      salary: '₹12-18 LPA',
      experience: '3-5 years',
      icon: Palette,
      description: 'Design intuitive user experiences for our home design platform and mobile app.',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
      posted: '1 week ago'
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'Product',
      location: 'Mumbai / Remote',
      type: 'Full-time',
      salary: '₹20-30 LPA',
      experience: '5-8 years',
      icon: BarChart3,
      description: 'Drive product strategy and roadmap for our integrated home design ecosystem.',
      requirements: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'B2B/B2C Experience'],
      posted: '3 days ago'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Chennai / Remote',
      type: 'Full-time',
      salary: '₹18-28 LPA',
      experience: '4-7 years',
      icon: Code,
      description: 'Build and maintain scalable infrastructure for our growing platform.',
      requirements: ['AWS/Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
      posted: '5 days ago'
    },
    {
      id: 5,
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Delhi / Remote',
      type: 'Full-time',
      salary: '₹10-16 LPA',
      experience: '2-4 years',
      icon: Headphones,
      description: 'Ensure customer satisfaction and drive adoption of our platform features.',
      requirements: ['Customer Success', 'SaaS Experience', 'Communication', 'Analytics', 'CRM'],
      posted: '1 week ago'
    },
    {
      id: 6,
      title: 'Business Development Executive',
      department: 'Sales',
      location: 'Pune / Remote',
      type: 'Full-time',
      salary: '₹8-15 LPA',
      experience: '2-5 years',
      icon: Briefcase,
      description: 'Drive business growth through strategic partnerships and client acquisition.',
      requirements: ['B2B Sales', 'Relationship Building', 'Market Research', 'Negotiation', 'CRM'],
      posted: '4 days ago'
    },
    {
      id: 7,
      title: 'Mobile App Developer',
      department: 'Engineering',
      location: 'Hyderabad / Remote',
      type: 'Full-time',
      salary: '₹12-20 LPA',
      experience: '3-6 years',
      icon: Code,
      description: 'Develop and maintain our React Native mobile application for society management.',
      requirements: ['React Native', 'iOS/Android', 'Redux', 'API Integration', 'Mobile UI/UX'],
      posted: '6 days ago'
    }
  ]

  const departments = [
    { id: 'all', label: 'All Departments', count: jobOpenings.length },
    { id: 'Engineering', label: 'Engineering', count: jobOpenings.filter(job => job.department === 'Engineering').length },
    { id: 'Design', label: 'Design', count: jobOpenings.filter(job => job.department === 'Design').length },
    { id: 'Product', label: 'Product', count: jobOpenings.filter(job => job.department === 'Product').length },
    { id: 'Sales', label: 'Sales', count: jobOpenings.filter(job => job.department === 'Sales').length },
    { id: 'Customer Success', label: 'Customer Success', count: jobOpenings.filter(job => job.department === 'Customer Success').length }
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance for you and your family'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Work-life balance with flexible working hours'
    },
    {
      icon: Users,
      title: 'Remote First',
      description: 'Work from anywhere with our remote-first culture'
    },
    {
      icon: BarChart3,
      title: 'Growth Opportunities',
      description: 'Continuous learning and career advancement'
    }
  ]

  const filteredJobs = selectedDepartment === 'all' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === selectedDepartment)

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
            <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Help us revolutionize the home design industry. We're looking for passionate 
              individuals who want to make a real impact.
            </p>
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="text-center">
                <div className="text-3xl font-bold">30+</div>
                <div className="text-sm">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{jobOpenings.length}</div>
                <div className="text-sm">Open Positions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">5</div>
                <div className="text-sm">Departments</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-gray-600">Great benefits and culture that puts people first</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#1a237e] to-[#2196f3] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">Find your next opportunity with us</p>
          </motion.div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((dept) => (
              <motion.button
                key={dept.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedDepartment === dept.id
                    ? 'bg-[#2196f3] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {dept.label} ({dept.count})
              </motion.button>
            ))}
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1a237e] to-[#2196f3] rounded-lg flex items-center justify-center">
                      <job.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <p className="text-[#2196f3] font-medium">{job.department}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {job.posted}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{job.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{job.experience}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 bg-[#1a237e] text-white py-3 rounded-lg font-medium hover:bg-[#2196f3] transition-colors"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Hiring Process</h2>
            <p className="text-xl text-gray-600">Simple, transparent, and focused on finding the right fit</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Application', description: 'Submit your application with resume and portfolio' },
              { step: '02', title: 'Screening', description: 'Initial screening call to discuss your background' },
              { step: '03', title: 'Interview', description: 'Technical/behavioral interviews with the team' },
              { step: '04', title: 'Offer', description: 'Final decision and offer discussion' }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#1a237e] to-[#2196f3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1a237e] to-[#2196f3] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Don't see a position that fits? We're always looking for exceptional talent.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#1a237e] px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Send Us Your Resume
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More About Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}