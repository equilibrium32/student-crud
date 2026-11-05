import React from 'react';
import { GraduationCap, Users, UserCheck, Server } from 'lucide-react';

export default function Navbar({ totalStudents, activeStudents, apiUrl }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Manager</h1>
              <p className="text-xs text-slate-500 font-medium">CRUD Frontend • React & Vite</p>
            </div>
          </div>

          {/* Quick Stats & API Badge */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="hidden sm:flex items-center space-x-4 bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-200/80 text-xs text-slate-600">
              <div className="flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>Total: <strong className="text-slate-900">{totalStudents}</strong></span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center space-x-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Active: <strong className="text-slate-900">{activeStudents}</strong></span>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-mono" title={`Target API: ${apiUrl}`}>
              <Server className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline max-w-[200px] truncate">{apiUrl}</span>
              <span className="md:hidden">API</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
