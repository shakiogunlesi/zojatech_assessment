import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Logo from './assets/icons/logo.svg';
import Checkbox from './assets/icons/Checkbox.svg';
import MailIcon from './assets/icons/Mail.svg';
import GoogleIcon from './assets/icons/google-logo.svg';
import ChatIcon from './assets/icons/chat.svg';
import EmailIcon from './assets/icons/emailIcon.svg';
import EnvilopeIcon from './assets/icons/envelope-circle-check-solid 1.svg'
import SentMailIcon from './assets/icons/emailSentIcon.svg';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import api from './api';
import Dashboard from './Dashboard';

function App() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showEmailVerified, setShowEmailVerified] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [otpInput, setOtpInput] = useState('');
  const [error, setError] = useState('');
  // const [otp, setOtp] = useState('');
  const [focusedFields, setFocusedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    otp: false,
  });

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      isValidEmail(formData.email) &&
      formData.password.trim() !== ''
    );
  };

  const isLoginFormValid = () => {
    return (
      loginData.email.trim() !== '' &&
      isValidEmail(loginData.email) &&
      loginData.password.trim() !== ''
    );
  };

  const isOtpValid = () => {
    return otpInput.length === 4 && /^\d{4}$/.test(otpInput);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleOtpDigitChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 1) {
      const newOtp = otpInput.split('');
      while (newOtp.length < 4) newOtp.push('');
      newOtp[index] = value;
      setOtpInput(newOtp.join(''));
      if (value && index < 3) {
        const nextInput = e.target.parentNode.children[index + 1];
        nextInput?.focus();
      }
    }
    setError('');
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      const prevInput = e.target.parentNode.children[index - 1];
      prevInput?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput = e.target.parentNode.children[index - 1];
      prevInput?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      const nextInput = e.target.parentNode.children[index + 1];
      nextInput?.focus();
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const payload = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
        };
        console.log('Registration payload:', payload);
        const response = await api.post('/admin/register', payload);
        console.log('Registration response:', response.data);
        if (response.data.success) {
          localStorage.setItem('token', response.data.data.token);
          // setOtp(response.data.data.otp);
          setShowConfirmation(true);
          setShowEmailForm(false);
          setError('');
          console.log('OTP:', response.data.data.otp, 'Email:', formData.email);
        } else {
          setError(response.data.message || 'Registration failed. Please try again.');
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to create account.';
        setError(errorMessage);
        console.error('Error creating account:', err.response || err);
      }
    } else {
      setError('Please fill out all fields correctly.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoginFormValid()) {
      try {
        const payload = {
          email: loginData.email,
          password: loginData.password,
        };
        const response = await api.post('/admin/login', payload);
        if (response.data.success) {
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          setError('');
          console.log('Login successful:', response.data);
          console.log('User data:', response.data.data.user);
          console.log('Token stored:', response.data.data.token);
          navigate('/dashboard'); // Navigate to dashboard
        } else {
          setError(response.data.message || 'Login failed. Please check your credentials.');
        }
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to login. Please check your credentials and try again.'
        );
        console.error('Error logging in:', err);
      }
    }
  };

  const handleResendEmail = async () => {
    try {
      console.log('Resend email payload:', { email: formData.email });
      const response = await api.post('/admin/resend-email', { email: formData.email });
      console.log('Resend email response:', response.data);
      if (response.data.success) {
        setError('');
        alert('Email resent successfully!');
      } else {
        setError(response.data.message || 'Failed to resend email.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to resend email.';
      setError(errorMessage);
      console.error('Error resending email:', err.response || err);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (isOtpValid()) {
      try {
        const payload = {
          otp: otpInput,
        };
        const response = await api.post('/admin/verify-otp', payload);
        if (response.data.success) {
          setError('');
          console.log('OTP verified:', response.data);
          alert('OTP verified successfully! Your account is now active.');
          setShowOtpForm(false);
          setShowEmailVerified(true);
        } else {
          setError(response.data.message || 'OTP verification failed. Please try again.');
        }
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to verify OTP. Please try again.'
        );
        console.error('Error verifying OTP:', err);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (fieldName) => {
    setFocusedFields((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const handleBlur = (fieldName) => {
    setFocusedFields((prev) => ({
      ...prev,
      [fieldName]: false,
    }));
  };

  const shouldShowLabel = (fieldName) => {
    return focusedFields[fieldName] || formData[fieldName]?.trim() !== '' || otpInput.trim() !== '';
  };

  const shouldShowLoginLabel = (fieldName) => {
    return focusedFields[fieldName] || loginData[fieldName].trim() !== '';
  };

  const shouldShowPasswordToggle = (isLoginForm = false) => {
    const passwordValue = isLoginForm ? loginData.password : formData.password;
    return passwordValue.trim() !== '' || focusedFields.password;
  };

  const resetToInitialState = () => {
    setShowEmailForm(false);
    setShowLoginForm(false);
    setShowConfirmation(false);
    setShowOtpForm(false);
    setShowEmailVerified(false);
    setError('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    setLoginData({
      email: '',
      password: '',
    });
    setOtpInput('');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-6 py-12">
              <div className="max-w-md mx-auto w-full">
                <div className="flex items-center mb-12 lg:mb-16 lg:mt-[-100px]">
                  <img src={Logo} alt="Logo" className="w-[120px] h-[36px] mr-3" />
                </div>
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center mt-3">
                      <img src={Checkbox} alt="Checkbox" className="w-[24px] h-[24px]" />
                    </div>
                    <p className="leading-relaxed text-[18px]">
                      Track real-time overview of the company's financial performance.
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center mt-3">
                      <img src={Checkbox} alt="Checkbox" className="w-[24px] h-[24px]" />
                    </div>
                    <p className="leading-relaxed text-[18px]">
                      Track created projects budget against actual revenue and expenses.
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center mt-3">
                      <img src={Checkbox} alt="Checkbox" className="w-[48px] h-[48px]" />
                    </div>
                    <p className="leading-relaxed text-[18px]">
                      Highlighted reports on budget deficit and surplus, accounting dimensions, balance sheets and real-time sales margin estimation.
                    </p>
                  </div>
                </div>
                <p className="text-[#84919A] text-[13px] mt-8 lg:mt-16">© 2022 Revvex. All rights reserved</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 bg-[#F8FAFC] px-6 py-8 lg:p-16 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="bg-white p-6 lg:p-10 rounded-[8px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] border border-[#DDE2E4]">
                  {!showEmailForm && !showConfirmation && !showOtpForm && !showLoginForm && !showEmailVerified ? (
                    <>
                      <h2 className="text-[24px] font-bold text-[#1D1D18] mb-6 lg:mb-8 text-left">Register your account</h2>
                      <div className="space-y-4">
                        <button
                          onClick={() => setShowEmailForm(true)}
                          className="w-full p-3 lg:p-2 border border-[#DDE2E4] rounded-[6px] text-[#5B6871] hover:border-gray-400 transition-colors flex items-center justify-center text-[14px]"
                        >
                          <img src={MailIcon} alt="Mail Icon" className="w-[24px] h-[24px] mr-2" />
                          Sign up with email
                        </button>
                        <div className="flex items-center">
                          <div className="flex-1 border-t border-[#DDE2E4]"></div>
                          <span className="px-4 text-[#5B6871] text-[13px]">or</span>
                          <div className="flex-1 border-t border-[#DDE2E4]"></div>
                        </div>
                        <button className="w-full p-3 lg:p-2 border border-[#DDE2E4] rounded-[6px] text-[#5B6871] hover:border-gray-400 transition-colors flex items-center justify-center text-[14px]">
                          <img src={GoogleIcon} alt="Google Icon" className="w-[24px] h-[24px] mr-2" />
                          Sign up with Google
                        </button>
                        <p className="text-[13px] text-[#84919A] text-left px-2 py-4">
                          By clicking the button above, you agree to our{' '}
                          <span className="text-[#FF8600] hover:text-orange-600 cursor-pointer">Terms of Service</span> and{' '}
                          <span className="text-[#FF8600] hover:text-orange-600 cursor-pointer">Privacy Policy</span>.
                        </p>
                        <p className="text-left text-[14px] text-[#5B6871] mt-10 lg:mt-14">
                          Already have an account?{' '}
                          <span 
                            onClick={() => {
                              setShowLoginForm(true);
                              setShowEmailForm(false);
                              setShowConfirmation(false);
                              setShowOtpForm(false);
                              setShowEmailVerified(false);
                            }}
                            className="text-[#FF8600] hover:text-orange-600 cursor-pointer font-medium"
                          >
                            Login
                          </span>
                        </p>
                      </div>
                    </>
                  ) : showEmailForm ? (
                    <>
                      <h2 className="text-[24px] font-bold text-[#1D1D18] mb-2 text-left">Register your account</h2>
                      <p className="text-[#5B6871] text-[13px] mb-6 text-left">Proceed to create account and setup your organization</p>
                      {error && (
                        <p className="text-red-500 text-[14px] mb-4 text-left">{error}</p>
                      )}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            {shouldShowLabel('firstName') && (
                              <label htmlFor="firstName" className="text-[14px] text-[#5B6871] font-medium mb-1 block">First Name</label>
                            )}
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#84919A]" />
                              <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('firstName')}
                                onBlur={() => handleBlur('firstName')}
                                className="w-full pl-10 pr-4 py-2 border border-[#DDE2E4] rounded-[6px] text-[14px] placeholder-[#84919A] focus:outline-none focus:border-[#FF8600] transition-colors"
                              />
                            </div>
                          </div>
                          <div className="relative">
                            {shouldShowLabel('lastName') && (
                              <label htmlFor="lastName" className="text-[14px] text-[#5B6871] font-medium mb-1 block">Last Name</label>
                            )}
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#84919A]" />
                              <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('lastName')}
                                onBlur={() => handleBlur('lastName')}
                                className="w-full pl-10 pr-4 py-2 border border-[#DDE2E4] rounded-[6px] text-[14px] placeholder-[#84919A] focus:outline-none focus:border-[#FF8600] transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          {shouldShowLabel('email') && (
                            <div className="flex items-center space-x-1 mb-1">
                              <label htmlFor="email" className="text-[14px] text-[#5B6871] font-medium">
                                Email
                              </label>
                              <img src={EmailIcon} alt="Icon" className="w-[16px] h-[16px]" />
                            </div>
                          )}
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#84919A]" />
                            <input
                              type="email"
                              name="email"
                              placeholder="Work email"
                              value={formData.email}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus('email')}
                              onBlur={() => handleBlur('email')}
                              className={`w-full pl-10 pr-16 py-2 border rounded-[6px] text-[14px] focus:outline-none transition-all duration-200 ${
                                isValidEmail(formData.email) && formData.email.trim() !== ''
                                  ? 'border-[#FF8600]'
                                  : 'border-[#DDE2E4] focus:border-[#FF8600]'
                              }`}
                              maxLength="60"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                              {isValidEmail(formData.email) && formData.email.trim() !== '' && (
                                <svg className="w-5 h-5 text-[#119C2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                          {focusedFields.email && (
                            <div className="absolute right-0">
                              <span className="text-[11px] text-[#84919A] px-1 min-w-[35px] text-center">
                                {formData.email.length} / 60
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          {shouldShowLabel('password') && (
                            <label htmlFor="password" className="text-[14px] text-[#5B6871] font-medium mb-1 block">Password</label>
                          )}
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#84919A]" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              placeholder="Password"
                              value={formData.password}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus('password')}
                              onBlur={() => handleBlur('password')}
                              className="w-full pl-10 pr-20 py-2 border border-[#DDE2E4] rounded-[6px] text-[14px] placeholder-[#84919A] focus:outline-none focus:border-[#FF8600] transition-colors"
                              maxLength="15"
                            />
                            {shouldShowPasswordToggle() && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={togglePasswordVisibility}
                                  className="text-[#84919A] hover:text-[#5B6871] transition-colors"
                                >
                                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                              </div>
                            )}
                          </div>
                          {focusedFields.password && (
                            <div className="absolute right-0">
                              <span className="text-[12px] text-[#84919A] px-1 min-w-[35px] text-center">
                                {formData.password.length} / 15
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={handleCreateAccount}
                          className={`w-full py-2 rounded-[6px] text-[14px] font-medium transition-colors ${
                            isFormValid()
                              ? 'bg-[#FF8600] hover:bg-orange-600 text-[#F6F8F9] cursor-pointer'
                              : 'bg-[#ECEDED] text-[#C3C7CE] cursor-not-allowed'
                          }`}
                          disabled={!isFormValid()}
                        >
                          Create account
                        </button>
                        <p className="text-[13px] text-[#84919A] text-left px-2 py-4">
                          By clicking the button above, you agree to our{' '}
                          <span className="text-[#FF8600] hover:text-orange-600 cursor-pointer">Terms of Service</span> and{' '}
                          <span className="text-[#FF8600] hover:text-orange-600 cursor-pointer">Privacy Policy</span>.
                        </p>
                        <p className="text-left text-[14px] text-[#5B6871] mt-10 lg:mt-14">
                          Already have an account?{' '}
                          <span 
                            onClick={() => {
                              setShowLoginForm(true);
                              setShowEmailForm(false);
                              setShowConfirmation(false);
                              setShowOtpForm(false);
                              setShowEmailVerified(false);
                            }}
                            className="text-[#FF8600] hover:text-orange-600 cursor-pointer font-medium"
                          >
                            Login
                          </span>
                        </p>
                      </div>
                    </>
                  ) : showConfirmation ? (
                    <div className="text-center py-8">
                      <div className="flex justify-center mb-2">
                        <div className="relative">
                          <div className="flex items-center justify-center">
                            <img src={SentMailIcon} alt="SentMailIcon" className="w-[117px] h-[117px]" />
                          </div>
                        </div>
                      </div>
                      <h2 className="text-[24px] font-bold text-[#1D1D18] mb-6">Check your mailbox!</h2>
                      <p className="text-[#252C32] text-[14px] leading-relaxed mb-8 max-w-sm mx-auto">
                        We've sent an email to <span className="text-[#1D1D18] font-medium">{formData.email}</span> with
                        a one-time password (OTP) to confirm your account. Check your inbox to activate your account.
                      </p>
                      {/* <p className="text-red-500 font-medium mb-4">
                        Test OTP (for development): <span className="text-black">{otp}</span>
                      </p> */}
                      <button
                        onClick={() => {
                          setShowConfirmation(false);
                          setShowOtpForm(true);
                        }}
                        className="w-[160px] bg-[#FF8600] hover:bg-orange-600 text-white py-2 px-6 rounded-[6px] text-[14px] font-medium transition-colors mb-8"
                      >
                        Confirm Email
                      </button>
                      <p className="text-[#6B7280] text-[14px]">
                        Didn't get the mail?{' '}
                        <button
                          onClick={handleResendEmail}
                          className="text-[#FF8600] hover:text-orange-600 font-medium cursor-pointer"
                        >
                          Resend
                        </button>
                      </p>
                    </div>
                  ) : showOtpForm ? (
                    <div className="text-center py-8">
                      <h2 className="text-[24px] font-bold text-[#1D1D18] mb-6">Verify your email</h2>
                      <p className="text-[#252C32] text-[14px] leading-relaxed mb-8 max-w-sm mx-auto">
                        A four digit OTP code has been sent to your email{' '}
                        <span className="text-[#FF8600] font-medium">{formData.email}</span>.
                      </p>
                      {error && (
                        <p className="text-red-500 text-[14px] mb-4">{error}</p>
                      )}
                      <div className="flex justify-center gap-4 mb-8">
                        {[0, 1, 2, 3].map((index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={otpInput[index] || ''}
                            onChange={(e) => handleOtpDigitChange(e, index)}
                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                            onFocus={() => handleFocus('otp')}
                            onBlur={() => handleBlur('otp')}
                            className="w-16 h-16 text-center text-[20px] font-medium text-[#6B7280] border-2 border-[#FF8600] rounded-[8px] focus:outline-none focus:border-[#FF8600] transition-colors"
                          />
                        ))}
                      </div>
                      <button
                        onClick={handleVerifyOtp}
                        className={`w-[200px] py-3 rounded-[8px] text-[16px] font-medium transition-colors ${
                          isOtpValid()
                            ? 'bg-[#FF8600] hover:bg-orange-600 text-white cursor-pointer'
                            : 'bg-[#ECEDED] text-[#C3C7CE] cursor-not-allowed'
                        }`}
                        disabled={!isOtpValid()}
                      >
                        Confirm code
                      </button>
                      <p className="text-[#6B7280] text-[14px] mt-6">
                        Didn't get the mail?{' '}
                        <button
                          onClick={handleResendEmail}
                          className="text-[#FF8600] hover:text-orange-600 font-medium cursor-pointer"
                        >
                          Resend
                        </button>
                      </p>
                    </div>
                  ) : showEmailVerified ? (
                    <div className="text-center py-8">
                      <div className="flex justify-center mb-2">
                        <div className="relative">
                          <div className="flex items-center justify-center">
                            <img src={EnvilopeIcon} alt="EnvilopeIcon" className="w-[76px] h-[60px]" />
                          </div>
                        </div>
                      </div>
                      <h2 className="text-[24px] font-bold text-[#1D1D18] mb-6">Email verified!</h2>
                      <p className="text-[#252C32] text-[14px] leading-relaxed mb-8 max-w-sm mx-auto">
                        The verified email address will be associated with your account. Click on the button below to continue
                      </p>
                      <button
                        onClick={() => {
                          setShowEmailVerified(false);
                          setShowLoginForm(true);
                          setLoginData((prev) => ({ ...prev, email: formData.email }));
                        }}
                        className="w-[160px] bg-[#FF8600] hover:bg-orange-600 text-white py-2 px-6 rounded-[6px] text-[14px] font-medium transition-colors mb-8"
                      >
                        Continue
                      </button>
                    </div>
                  ) : showLoginForm ? (
                    <>
                      <h2 className="text-[24px] font-bold text-[#1D1D18] mb-2 text-left">Log in to your account</h2>
                      <p className="text-[#5B6871] text-[13px] mb-6 text-left">Proceed to log in to your account</p>
                      {error && (
                        <p className="text-red-500 text-[14px] mb-4 text-left">{error}</p>
                      )}
                      <div className="space-y-6">
                        <div className="relative">
                          {shouldShowLoginLabel('email') && (
                            <div className="flex items-center space-x-1 mb-1">
                              <label htmlFor="email" className="text-[14px] text-[#5B6871] font-medium">
                                Email
                              </label>
                              <img src={EmailIcon} alt="Icon" className="w-[16px] h-[16px]" />
                            </div>
                          )}
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#84919A]" />
                            <input
                              type="email"
                              name="email"
                              placeholder="Work email"
                              value={loginData.email}
                              onChange={handleLoginInputChange}
                              onFocus={() => handleFocus('email')}
                              onBlur={() => handleBlur('email')}
                              className={`w-full pl-10 pr-16 py-2 border rounded-[6px] text-[14px] focus:outline-none transition-all duration-200 ${
                                isValidEmail(loginData.email) && loginData.email.trim() !== ''
                                  ? 'border-[#FF8600]'
                                  : 'border-[#DDE2E4] focus:border-[#FF8600]'
                              }`}
                              maxLength="60"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                              {isValidEmail(loginData.email) && loginData.email.trim() !== '' && (
                                <svg className="w-5 h-5 text-[#119C2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                          {focusedFields.email && (
                            <div className="absolute right-0">
                              <span className="text-[11px] text-[#84919A] px-1 min-w-[35px] text-center">
                                {loginData.email.length} / 60
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          {shouldShowLoginLabel('password') && (
                            <label htmlFor="password" className="text-[14px] text-[#5B6871] font-medium mb-1 block">Password</label>
                          )}
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#84919A]" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              placeholder="Password"
                              value={loginData.password}
                              onChange={handleLoginInputChange}
                              onFocus={() => handleFocus('password')}
                              onBlur={() => handleBlur('password')}
                              className="w-full pl-10 pr-20 py-2 border border-[#DDE2E4] rounded-[6px] text-[14px] placeholder-[#84919A] focus:outline-none focus:border-[#FF8600] transition-colors"
                              maxLength="15"
                            />
                            {shouldShowPasswordToggle(true) && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={togglePasswordVisibility}
                                  className="text-[#84919A] hover:text-[#5B6871] transition-colors"
                                >
                                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                              </div>
                            )}
                          </div>
                          {focusedFields.password && (
                            <div className="absolute right-0">
                              <span className="text-[12px] text-[#84919A] px-1 min-w-[35px] text-center">
                                {loginData.password.length} / 15
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={handleLogin}
                          className={`w-full py-2 rounded-[6px] text-[14px] font-medium transition-colors ${
                            isLoginFormValid()
                              ? 'bg-[#FF8600] hover:bg-orange-600 text-[#F6F8F9] cursor-pointer'
                              : 'bg-[#ECEDED] text-[#C3C7CE] cursor-not-allowed'
                          }`}
                          disabled={!isLoginFormValid()}
                        >
                          Login
                        </button>
                        <p className="text-[13px] text-[#84919A] text-left px-2 py-4">
                          By clicking the button above, you agree to our{' '}
                          <span className="text-[#FF8600] hover:text-orange-600 cursor-pointer">Terms of Service</span> and{' '}
                          <span className="text-[#FF8600] hover:text-orange-600 cursor-pointer">Privacy Policy</span>.
                        </p>
                        <p className="text-left text-[14px] text-[#5B6871] mt-10 lg:mt-14">
                          Don't have an account?{' '}
                          <span 
                            onClick={() => {
                              setShowLoginForm(false);
                              setShowEmailForm(false);
                              setShowConfirmation(false);
                              setShowOtpForm(false);
                              setShowEmailVerified(false);
                              resetToInitialState();
                            }}
                            className="text-[#FF8600] hover:text-orange-600 cursor-pointer font-medium"
                          >
                            Register
                          </span>
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="fixed bottom-4 right-4 lg:bottom-8 lg:right-28">
                  <button className="bg-[#FF8600] hover:bg-orange-600 text-white px-4 py-2 lg:px-3 lg:py-3 rounded-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] flex items-center transition-colors text-[14px]">
                    <span className="hidden sm:inline">Get Help</span>
                    <span className="sm:hidden">Help</span>
                    <img src={ChatIcon} alt="Chat Icon" className="w-[19.43px] h-[19.43px] ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;