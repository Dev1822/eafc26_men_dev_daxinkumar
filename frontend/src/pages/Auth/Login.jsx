import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import api from '../../services/api';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [globalError, setGlobalError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      setGlobalError('');
      dispatch(loginStart());
      try {
        const response = await api.post('/auth/login', values);
        // Assuming response structure has { success: true, token: '...', data: { user } }
        const { token, data } = response.data;
        dispatch(loginSuccess({ token, user: data.user }));
        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.error("Login caught error:", err);
        const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please try again.';
        setGlobalError(errorMessage);
        dispatch(loginFailure(errorMessage));
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 px-4">
      <Helmet>
        <title>Login | EAFC26 Admin</title>
      </Helmet>
      
      <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Welcome Back
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Please sign in to access your dashboard</p>
        </div>

        {globalError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border-l-4 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm">
            {globalError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`mt-2 block w-full rounded-xl border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700/50 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:text-white px-4 py-3 transition-all duration-200 outline-none`} 
              placeholder="admin@example.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="relative">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
              <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Forgot password?</a>
            </div>
            <input 
              type="password" 
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`mt-2 block w-full rounded-xl border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700/50 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:text-white px-4 py-3 transition-all duration-200 outline-none`} 
              placeholder="••••••••"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.password}</p>
            ) : null}
          </div>

          <button 
            type="submit" 
            disabled={formik.isSubmitting}
            className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-500/30 text-sm font-bold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800"
          >
            {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
