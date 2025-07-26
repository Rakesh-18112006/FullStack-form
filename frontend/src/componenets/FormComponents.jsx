import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaCalendarAlt, 
  FaIdCard, 
  FaCodeBranch, 
  FaLaptopCode, 
  FaHome,
  FaChevronRight
} from 'react-icons/fa';

const FormComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: '', isError: false });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dob: '',
      idNumber: '',
      branchName: '',
      interestedDomain: '',
      address: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
      dob: Yup.date()
        .required('Required')
        .max(new Date(), 'Date of birth cannot be in the future'),
      idNumber: Yup.string()
        .required('Required')
        .matches(/^[0-9]+$/, 'Must be only digits'),
      branchName: Yup.string().required('Required'),
      interestedDomain: Yup.string().required('Required'),
      address: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitMessage({ text: '', isError: false });
      
      try {
       const response = await axios.post(`${import.meta.env.VITE_API_URL}api/users`, values);
        setSubmitMessage({ text: 'Form submitted successfully!', isError: false });
        formik.resetForm();
      } catch (error) {
        setSubmitMessage({ 
          text: error.response?.data?.message || 'Submission failed', 
          isError: true 
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const inputAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
      }
    })
  };

  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonHover = {
    scale: 1.02,
    boxShadow: "0px 5px 15px rgba(99, 102, 241, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  };

  const buttonTap = {
    scale: 0.98,
    boxShadow: "0px 2px 5px rgba(99, 102, 241, 0.2)"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-400 to-indigo-500 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={formAnimation}
        className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden md:max-w-2xl backdrop-blur-sm bg-opacity-90"
      >
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
          <div className="p-8 relative z-10">
            <div className="text-center mb-8">
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
              >
                Registration Form
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 text-sm text-gray-600"
              >
                Join our community today
              </motion.p>
            </div>

            {submitMessage.text && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg ${submitMessage.isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}
              >
                {submitMessage.text}
              </motion.div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <motion.div 
                  variants={inputAnimation}
                  custom={0}
                >
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-indigo-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      className="py-3 pl-10 block w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {formik.errors.firstName}
                    </motion.p>
                  ) : null}
                </motion.div>

                <motion.div 
                  variants={inputAnimation}
                  custom={1}
                >
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-indigo-400" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      className="py-3 pl-10 block w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.lastName}</p>
                  ) : null}
                </motion.div>

                <motion.div 
                  variants={inputAnimation}
                  custom={2}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-indigo-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="py-3 pl-10 block w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                  ) : null}
                </motion.div>

                <motion.div 
                  variants={inputAnimation}
                  custom={3}
                >
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-indigo-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="py-3 pl-10 block w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                  ) : null}
                </motion.div>

                <motion.div 
                  variants={inputAnimation}
                  custom={4}
                >
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="h-5 w-5 text-indigo-400" />
                    </div>
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dob}
                      className="py-3 pl-10 block w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  {formik.touched.dob && formik.errors.dob ? (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.dob}</p>
                  ) : null}
                </motion.div>

                <motion.div 
                  variants={inputAnimation}
                  custom={5}
                >
                  <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
                    ID Number
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaIdCard className="h-5 w-5 text-indigo-400" />
                    </div>
                    <input
                      id="idNumber"
                      name="idNumber"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.idNumber}
                      className="py-3 pl-10 block w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  {formik.touched.idNumber && formik.errors.idNumber ? (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.idNumber}</p>
                  ) : null}
                </motion.div>

                <motion.div 
                  variants={inputAnimation}
                  custom={6}
                >
                  <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">
                    Branch Name
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCodeBranch className="h-5 w-5 text-indigo-400" />
                    </div>
                    <select
                      id="branchName"
                      name="branchName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.branchName}
                      className="py-3 pl-10 block w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    >
                      <option value="">Select a branch</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Business Administration">Business Administration</option>
                    </select>
                  </div>
                  {formik.touched.branchName && formik.errors.branchName ? (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.branchName}</p>
                  ) : null}
                </motion.div>

                <motion.div 
                  variants={inputAnimation}
                  custom={7}
                >
                  <label htmlFor="interestedDomain" className="block text-sm font-medium text-gray-700">
                    Interested Domain
                  </label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLaptopCode className="h-5 w-5 text-indigo-400" />
                    </div>
                    <select
                      id="interestedDomain"
                      name="interestedDomain"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.interestedDomain}
                      className="py-3 pl-10 block w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    >
                      <option value="">Select a domain</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Cloud Computing">Cloud Computing</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                  </div>
                  {formik.touched.interestedDomain && formik.errors.interestedDomain ? (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.interestedDomain}</p>
                  ) : null}
                </motion.div>
              </div>

              <motion.div 
                variants={inputAnimation}
                custom={8}
              >
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1 relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                    <FaHome className="h-5 w-5 text-indigo-400" />
                  </div>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    className="py-3 pl-10 block w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>
                {formik.touched.address && formik.errors.address ? (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
                ) : null}
              </motion.div>

              <motion.div
                whileHover={buttonHover}
                whileTap={buttonTap}
                className="pt-4"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Submit Now <FaChevronRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default FormComponent;