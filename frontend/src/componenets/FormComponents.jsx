import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaIdCard, FaCodeBranch, FaLaptopCode, FaHome } from 'react-icons/fa';

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
    visible: { opacity: 1, x: 0 }
  };

  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={formAnimation}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Registration Form</h2>
            <p className="mt-2 text-sm text-gray-600">Please fill in your details</p>
          </div>

          {submitMessage.text && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-md ${submitMessage.isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}
            >
              {submitMessage.text}
            </motion.div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <motion.div variants={inputAnimation}>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {formik.touched.firstName && formik.errors.firstName ? (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.firstName}</p>
                ) : null}
              </motion.div>

              <motion.div variants={inputAnimation}>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {formik.touched.lastName && formik.errors.lastName ? (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.lastName}</p>
                ) : null}
              </motion.div>

              <motion.div variants={inputAnimation}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                ) : null}
              </motion.div>

              <motion.div variants={inputAnimation}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                ) : null}
              </motion.div>

              <motion.div variants={inputAnimation}>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dob}
                    className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {formik.touched.dob && formik.errors.dob ? (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.dob}</p>
                ) : null}
              </motion.div>

              <motion.div variants={inputAnimation}>
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
                  ID Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaIdCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="idNumber"
                    name="idNumber"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.idNumber}
                    className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {formik.touched.idNumber && formik.errors.idNumber ? (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.idNumber}</p>
                ) : null}
              </motion.div>

              <motion.div variants={inputAnimation}>
                <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">
                  Branch Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCodeBranch className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="branchName"
                    name="branchName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.branchName}
                    className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
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

              <motion.div variants={inputAnimation}>
                <label htmlFor="interestedDomain" className="block text-sm font-medium text-gray-700">
                  Interested Domain
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLaptopCode className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="interestedDomain"
                    name="interestedDomain"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.interestedDomain}
                    className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
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

            <motion.div variants={inputAnimation}>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaHome className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {formik.touched.address && formik.errors.address ? (
                <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
              ) : null}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default FormComponent;