import { motion } from 'framer-motion';
import { FaUserPlus, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const WelcomeDashboard = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const stats = [
    { title: "Total Users", value: "1,024", icon: <FaUsers className="text-3xl" />, color: "bg-indigo-100 text-indigo-600" },
    { title: "New Signups", value: "42", icon: <FaUserPlus className="text-3xl" />, color: "bg-green-100 text-green-600" },
    { title: "Growth Rate", value: "12%", icon: <FaChartLine className="text-3xl" />, color: "bg-blue-100 text-blue-600" },
    { title: "Settings", value: "Configure", icon: <FaCog className="text-3xl" />, color: "bg-purple-100 text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to UserHub
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your users, view analytics, and configure settings from one centralized dashboard.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={`p-6 rounded-2xl shadow-sm border border-gray-100 ${stat.color} bg-opacity-50 backdrop-blur-sm`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-30`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/users"
              className="p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all"
            >
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg mr-4">
                  <FaUsers className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium">View All Users</h3>
                  <p className="text-sm text-gray-500">See registered users</p>
                </div>
              </div>
            </Link>
            <Link
              to="/register"
              className="p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all"
            >
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-4">
                  <FaUserPlus className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Add New User</h3>
                  <p className="text-sm text-gray-500">Register someone</p>
                </div>
              </div>
            </Link>
            <div className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-4">
                  <FaCog className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Settings</h3>
                  <p className="text-sm text-gray-500">Configure system</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + item * 0.1 }}
                className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <FaUserPlus className="text-blue-600 text-sm" />
                </div>
                <div>
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-gray-500">John Doe joined the platform</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeDashboard;