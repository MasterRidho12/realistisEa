import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Shield, Lock, User, Eye, EyeOff, KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';

export const AdminLogin = ({ onLoginSuccess }) => {
  const { loginAdmin } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const res = loginAdmin(username, password);
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setError(res.message);
      }
      setIsLoading(false);
    }, 300);
  };

  const handleUseDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#06100C] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#10B981]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-[#0B241A]/60 rounded-full blur-[120px] pointer-events-none" />

      {/* Centered Login Card */}
      <div className="relative w-full max-w-md bg-[#0D1B16] border border-[#1E382E] rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-10 transition-all">
        
        {/* Brand & Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#081410] border border-[#1E382E] flex items-center justify-center mx-auto mb-4 text-[#10B981] shadow-[0_0_25px_rgba(16,185,129,0.25)]">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Admin CMS Login
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            RealistisEA Management System
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2.5 text-xs text-red-400 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form: Username & Password */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username admin..."
                className="w-full bg-[#081410] border border-[#1E382E] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 transition-colors outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin..."
                className="w-full bg-[#081410] border border-[#1E382E] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-500 transition-colors outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#10B981] hover:bg-[#059669] text-[#06100C] font-extrabold text-sm py-3.5 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard Admin'}
          </button>
        </form>

        {/* Demo Helper */}
        <div className="mt-8 pt-6 border-t border-[#1E382E] flex items-center justify-between text-xs text-gray-400">
          <span>Demo Access:</span>
          <button
            onClick={handleUseDemo}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#081410] border border-[#1E382E] hover:border-[#10B981]/50 text-xs text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Isi otomatis admin123</span>
          </button>
        </div>

      </div>
    </div>
  );
};
