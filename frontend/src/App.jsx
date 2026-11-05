import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import AlertBanner from './components/AlertBanner';
import studentApi from './api/studentApi';

// Initial sample fallback data matching the Spring Boot entity schema
const SAMPLE_STUDENTS = [
  { id: 1, firstName: 'Juan', lastName: 'Dela Cruz', course: 'BSIT', section: '3-A' },
  { id: 2, firstName: 'Maria', lastName: 'Santos', course: 'BSCS', section: '2-B' },
  { id: 3, firstName: 'John', lastName: 'Smith', course: 'BSIS', section: '4-A' },
  { id: 4, firstName: 'Anna', lastName: 'Reyes', course: 'BSIT', section: '1-C' },
];

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const apiUrl = studentApi.getBaseUrl();

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  // Fetch all students from Spring Boot API
  const fetchStudents = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    try {
      const data = await studentApi.getAll();
      const list = Array.isArray(data) ? data : (data?.data || []);
      setStudents(list);
      setIsUsingFallback(false);
    } catch (err) {
      console.warn('API fetch failed, using fallback data:', err);
      setStudents((prev) => (prev.length > 0 ? prev : SAMPLE_STUDENTS));
      setIsUsingFallback(true);
      if (!isSilent) {
        showNotification(
          'info',
          `Could not connect to Spring Boot API at ${apiUrl}. Loaded demo data. Start your Spring Boot backend and click refresh anytime.`
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Handle Save (Create or Update)
  const handleSaveStudent = async (formData) => {
    setIsSubmitting(true);
    const displayName = `${formData.firstName} ${formData.lastName}`.trim();
    try {
      if (editingStudent) {
        const id = editingStudent.id ?? editingStudent.id1;
        try {
          const updated = await studentApi.update(id, formData);
          setStudents((prev) =>
            prev.map((s) => ((s.id ?? s.id1) === id ? { ...s, ...formData, ...updated } : s))
          );
        } catch (apiErr) {
          if (isUsingFallback) {
            setStudents((prev) =>
              prev.map((s) => ((s.id ?? s.id1) === id ? { ...s, ...formData } : s))
            );
          } else {
            throw apiErr;
          }
        }
        showNotification('success', `Student "${displayName}" was updated successfully!`);
        setEditingStudent(null);
      } else {
        // Create new student
        try {
          const created = await studentApi.create(formData);
          const newStudent = created && (created.id || created.id1)
            ? created
            : { ...formData, id: Date.now() };
          setStudents((prev) => [newStudent, ...prev]);
        } catch (apiErr) {
          if (isUsingFallback) {
            const mockNew = { ...formData, id: Date.now() };
            setStudents((prev) => [mockNew, ...prev]);
          } else {
            throw apiErr;
          }
        }
        showNotification('success', `Student "${displayName}" was added successfully!`);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data || error.message || 'Operation failed';
      showNotification('error', `Failed to save student: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete
  const handleDeleteStudent = async (id) => {
    try {
      try {
        await studentApi.delete(id);
      } catch (apiErr) {
        if (!isUsingFallback) throw apiErr;
      }
      setStudents((prev) => prev.filter((s) => (s.id ?? s.id1) !== id));
      showNotification('success', `Student #${id} has been deleted.`);
      if (editingStudent && (editingStudent.id ?? editingStudent.id1) === id) {
        setEditingStudent(null);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data || error.message || 'Deletion failed';
      showNotification('error', `Failed to delete student: ${errorMsg}`);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        totalStudents={students.length}
        activeStudents={students.length}
        apiUrl={apiUrl}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Fallback Banner Notice if Spring Boot API not reached */}
        {isUsingFallback && (
          <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl px-4 py-3 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm">
            <div className="flex items-center space-x-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>
                <strong>Spring Boot Backend Offline:</strong> Running with interactive sample records. Target endpoint is <code>{apiUrl}</code>.
              </span>
            </div>
            <button
              onClick={() => fetchStudents(false)}
              className="self-start sm:self-auto bg-amber-200/80 hover:bg-amber-300 text-amber-900 font-semibold px-2.5 py-1 rounded-lg text-xs transition-colors"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Inline Alerts & Notifications */}
        <AlertBanner
          notification={notification}
          onDismiss={dismissNotification}
        />

        {/* 2-Column Responsive Layout (No Modals) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inline Student Form */}
          <div className="lg:col-span-4 sticky top-24">
            <StudentForm
              editingStudent={editingStudent}
              onSave={handleSaveStudent}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Right Column: Student Table */}
          <div className="lg:col-span-8">
            <StudentTable
              students={students}
              isLoading={isLoading}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              onRefresh={() => fetchStudents(false)}
              activeEditingId={editingStudent ? editingStudent.id ?? editingStudent.id1 : null}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-12 text-center text-xs text-slate-400">
        Student CRUD System • Vite, React & Tailwind CSS • Spring Boot API
      </footer>
    </div>
  );
}
