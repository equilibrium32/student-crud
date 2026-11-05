import React, { useState, useEffect } from 'react';
import { User, BookOpen, Layers, CheckCircle2, UserPlus, RefreshCw, XCircle } from 'lucide-react';

export default function StudentForm({ editingStudent, onSave, onCancelEdit, isSubmitting }) {
  const initialFormState = {
    firstName: '',
    lastName: '',
    course: '',
    section: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstName: editingStudent.firstName || '',
        lastName: editingStudent.lastName || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setErrors({});
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.course.trim()) errs.course = 'Course is required';
    if (!formData.section.trim()) errs.section = 'Section is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  const handleReset = () => {
    if (editingStudent) {
      onCancelEdit();
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  };

  const isEditMode = Boolean(editingStudent);

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm overflow-hidden ${
      isEditMode ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'
    }`}>
      {/* Form Header */}
      <div className={`px-6 py-4.5 border-b flex items-center justify-between ${
        isEditMode ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-50/70 border-slate-200'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isEditMode ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'
          }`}>
            {isEditMode ? <RefreshCw className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {isEditMode ? 'Edit Student Details' : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditMode ? `Updating Student #${editingStudent.id || editingStudent.id1}` : 'Spring Boot Student API Form'}
            </p>
          </div>
        </div>

        {isEditMode && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center space-x-1 text-xs font-medium text-amber-700 bg-amber-100/80 hover:bg-amber-200 px-2.5 py-1 rounded-md transition-colors"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancel Edit</span>
          </button>
        )}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* First Name & Last Name (2 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="e.g. John"
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                  errors.firstName ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.firstName && <p className="mt-1 text-xs text-red-500 font-medium">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="e.g. Doe"
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                  errors.lastName ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.lastName && <p className="mt-1 text-xs text-red-500 font-medium">{errors.lastName}</p>}
          </div>
        </div>

        {/* Course */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Course <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. BSIT / Computer Science"
              className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                errors.course ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.course && <p className="mt-1 text-xs text-red-500 font-medium">{errors.course}</p>}
        </div>

        {/* Section */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Section <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Layers className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="e.g. 3-A / CS-101"
              className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-slate-50/50 focus:bg-white focus:outline-none transition-colors ${
                errors.section ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.section && <p className="mt-1 text-xs text-red-500 font-medium">{errors.section}</p>}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isEditMode
                ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
            } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEditMode ? 'Update Student' : 'Save Student'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="py-2.5 px-3.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            {isEditMode ? 'Cancel' : 'Clear'}
          </button>
        </div>
      </form>
    </div>
  );
}
