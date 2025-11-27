'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function Messages() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">mail</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">No messages yet.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
