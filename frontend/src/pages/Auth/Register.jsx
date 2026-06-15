import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [globalError, setGlobalError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setGlobalError('');
      setSuccessMsg('');
      try {
        await api.post('/auth/register', {
          name: values.name,
          email: values.email,
          password: values.password
        });
        setSuccessMsg('Registration successful! Please login.');
        setTimeout(() => navigate('/login'), 2000);
      } catch (err) {
        console.error("Register caught error:", err);
        const errorMessage = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
        setGlobalError(errorMessage);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 py-12 px-4">
      <Helmet>
        <title>Register | EAFC26 Admin</title>
      </Helmet>
      
      <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Create Account
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Join the platform to manage EAFC26 data</p>
        </div>

        {globalError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border-l-4 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm">
            {globalError}
          </div>
        )}
        
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border-l-4 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm">
            {successMsg}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
            <input 
              type="text" 
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`mt-1.5 block w-full rounded-xl border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700/50 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:text-white px-4 py-3 transition-all duration-200 outline-none`} 
              placeholder="John Doe"
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.name}</p>
            ) : null}
          </div>

          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`mt-1.5 block w-full rounded-xl border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700/50 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:text-white px-4 py-3 transition-all duration-200 outline-none`} 
              placeholder="admin@example.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Password</label>
            <input 
              type="password" 
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`mt-1.5 block w-full rounded-xl border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700/50 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:text-white px-4 py-3 transition-all duration-200 outline-none`} 
              placeholder="••••••••"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.password}</p>
            ) : null}
          </div>

          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={`mt-1.5 block w-full rounded-xl border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700/50 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:text-white px-4 py-3 transition-all duration-200 outline-none`} 
              placeholder="••••••••"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.confirmPassword}</p>
            ) : null}
          </div>

          <button 
            type="submit" 
            disabled={formik.isSubmitting}
            className="w-full mt-2 flex justify-center py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-500/30 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800"
          >
            {formik.isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
