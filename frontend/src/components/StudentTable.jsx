import React, { useState } from 'react';
import { Search, Edit2, Trash2, AlertTriangle, Check, X, RefreshCw, BookOpen, Layers } from 'lucide-react';

export default function StudentTable({
  students,
  isLoading,
  onEdit,
  onDelete,
  onRefresh,
  activeEditingId,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Extract unique courses for filter dropdown
  const uniqueCourses = Array.from(
    new Set(students.map((s) => s.course).filter(Boolean))
  );

  // Filter students based on search term & course
  const filteredStudents = students.filter((student) => {
    const firstName = (student.firstName || '').toLowerCase();
    const lastName = (student.lastName || '').toLowerCase();
    const fullName = `${firstName} ${lastName}`.trim();
    const course = (student.course || '').toLowerCase();
    const section = (student.section || '').toLowerCase();
    const id = String(student.id || student.id1 || '');

    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      course.includes(searchTerm.toLowerCase()) ||
      section.includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm);

    const matchesCourse =
      courseFilter === 'All' ||
      (student.course || '').toLowerCase() === courseFilter.toLowerCase();

    return matchesSearch && matchesCourse;
  });

  const getInitials = (firstName, lastName) => {
    const f = (firstName || '').trim()[0] || '';
    const l = (lastName || '').trim()[0] || '';
    return (f + l).toUpperCase() || 'ST';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, course, section, or ID..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Course Filter & Refresh */}
        <div className="flex items-center space-x-2.5">
          {uniqueCourses.length > 0 && (
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="All">All Courses</option>
              {uniqueCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={onRefresh}
            title="Refresh student list"
            disabled={isLoading}
            className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl border border-slate-200 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Alert Banner (Inline - No modal) */}
      {deleteConfirmId && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3 flex items-center justify-between text-xs sm:text-sm text-red-800 transition-all">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>
              Are you sure you want to delete student <strong>#{deleteConfirmId}</strong>? This cannot be undone.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onDelete(deleteConfirmId);
                setDeleteConfirmId(null);
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1 rounded-lg text-xs transition-colors shadow-sm"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="bg-white hover:bg-slate-100 text-slate-700 font-medium px-3 py-1 rounded-lg text-xs border border-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-6">ID</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Section</th>
              <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {isLoading && students.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs font-medium">Fetching students from Spring Boot API...</span>
                  </div>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <p className="font-semibold text-slate-600">No students found</p>
                    <p className="text-xs text-slate-400">
                      {searchTerm || courseFilter !== 'All'
                        ? 'Try adjusting your search query or filter.'
                        : 'Use the form on the left to add your first student.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const id = student.id ?? student.id1;
                const isEditing = activeEditingId === id;
                const isPendingDelete = deleteConfirmId === id;
                const fullName = `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'Unnamed';

                return (
                  <tr
                    key={id || Math.random()}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isEditing ? 'bg-amber-50/50' : isPendingDelete ? 'bg-red-50/30' : ''
                    }`}
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        #{id}
                      </span>
                    </td>

                    {/* Student Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                          {getInitials(student.firstName, student.lastName)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 flex items-center space-x-1.5">
                            <span>{fullName}</span>
                            {isEditing && (
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded">
                                Editing
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400">
                            {student.firstName} (First) • {student.lastName} (Last)
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-3.5 px-4 text-slate-800">
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{student.course || '—'}</span>
                      </span>
                    </td>

                    {/* Section */}
                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-100 text-xs font-medium text-slate-700">
                        <Layers className="w-3 h-3 text-slate-400" />
                        <span>{student.section || '—'}</span>
                      </span>
                    </td>

                    {/* Actions (Inline - No modal) */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      {isPendingDelete ? (
                        <div className="inline-flex items-center space-x-1">
                          <button
                            onClick={() => {
                              onDelete(id);
                              setDeleteConfirmId(null);
                            }}
                            title="Confirm Delete"
                            className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            title="Cancel Delete"
                            className="p-1.5 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center space-x-1.5">
                          <button
                            onClick={() => onEdit(student)}
                            title="Edit student"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(id)}
                            title="Delete student"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Summary */}
      <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
        <span>Showing {filteredStudents.length} of {students.length} students</span>
        {filteredStudents.length !== students.length && (
          <button
            onClick={() => {
              setSearchTerm('');
              setCourseFilter('All');
            }}
            className="text-indigo-600 hover:underline font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
