"use client";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-300 mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-300 mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-blue-600">5</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-300 mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">7</p>
        </div>
      </div>
    </div>
  );
}
