'use client'
import React, { useState, useEffect } from 'react';
import { Users, Clock, TrendingUp, Calendar, BarChart3, PieChart, RefreshCw } from 'lucide-react';

const AttendanceDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    present: 0,
    absent: 0,
    halfPresent: 0,
    attendanceRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBlock, setSelectedBlock] = useState('ALL');
  const [weeklyData, setWeeklyData] = useState([]);

  // Mock weekly data for analytics
  const mockWeeklyData = [
    { day: 'Mon', present: 85, absent: 15, halfPresent: 8 },
    { day: 'Tue', present: 92, absent: 8, halfPresent: 5 },
    { day: 'Wed', present: 88, absent: 12, halfPresent: 7 },
    { day: 'Thu', present: 95, absent: 5, halfPresent: 3 },
    { day: 'Fri', present: 78, absent: 22, halfPresent: 12 },
    { day: 'Sat', present: 65, absent: 35, halfPresent: 18 },
    { day: 'Sun', present: 72, absent: 28, halfPresent: 15 }
  ];

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      // Uncomment for real API
      /*
      const params = new URLSearchParams({
        date: selectedDate,
        ...(selectedBlock !== 'ALL' && { block: selectedBlock })
      });

      const response = await fetch(`/api/attendance/stats?${params}`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      
      const result = await response.json();
      setStats(result.data);
      */

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockStats = {
        totalStudents: 120,
        present: 95,
        absent: 15,
        halfPresent: 10,
        attendanceRate: 79.2
      };
      
      setStats(mockStats);
      setWeeklyData(mockWeeklyData);

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate attendance rate
  const calculateAttendanceRate = (stats) => {
    if (stats.totalStudents === 0) return 0;
    return ((stats.present + (stats.halfPresent * 0.5)) / stats.totalStudents * 100).toFixed(1);
  };

  // Get block-wise statistics
  const getBlockStats = () => {
    return [
      { block: 'B1', total: 40, present: 32, absent: 5, halfPresent: 3, rate: 86.3 },
      { block: 'B2', total: 45, present: 38, absent: 4, halfPresent: 3, rate: 88.9 },
      { block: 'B3', total: 35, present: 25, absent: 6, halfPresent: 4, rate: 77.1 }
    ];
  };

  useEffect(() => {
    fetchDashboardStats();
  }, [selectedDate, selectedBlock]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Attendance Dashboard
              </h1>
              <p className="text-gray-600">
                Real-time attendance analytics and insights for {selectedDate}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ALL">All Blocks</option>
                <option value="B1">Block B1</option>
                <option value="B2">Block B2</option>
                <option value="B3">Block B3</option>
              </select>
              <button
                onClick={fetchDashboardStats}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Main Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Students */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Students</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                )}
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                {selectedBlock === 'ALL' ? 'All Blocks' : selectedBlock}
              </div>
            </div>
          </div>

          {/* Present */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Present</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <p className="text-3xl font-bold text-green-600">{stats.present}</p>
                )}
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <span className="font-medium">
                  {loading ? '...' : `${((stats.present / stats.totalStudents) * 100).toFixed(1)}%`}
                </span>
                <span className="ml-1">of total</span>
              </div>
            </div>
          </div>

          {/* Half Present */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Half Present</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <p className="text-3xl font-bold text-yellow-600">{stats.halfPresent}</p>
                )}
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-yellow-600">
                <span className="font-medium">
                  {loading ? '...' : `${((stats.halfPresent / stats.totalStudents) * 100).toFixed(1)}%`}
                </span>
                <span className="ml-1">of total</span>
              </div>
            </div>
          </div>

          {/* Absent */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Absent</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
                )}
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <Calendar className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-red-600">
                <span className="font-medium">
                  {loading ? '...' : `${((stats.absent / stats.totalStudents) * 100).toFixed(1)}%`}
                </span>
                <span className="ml-1">of total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Rate Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Overall Attendance Rate</h3>
              <p className="text-gray-600">Combined attendance percentage</p>
            </div>
            <div className="p-3 rounded-full bg-indigo-100">
              <BarChart3 className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Attendance Rate</span>
                <span className="text-sm font-bold text-indigo-600">
                  {calculateAttendanceRate(stats)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-1000" 
                  style={{ width: `${calculateAttendanceRate(stats)}%` }}
                ></div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-green-600">{stats.present}</p>
                  <p className="text-xs text-gray-500">Present</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-yellow-600">{stats.halfPresent}</p>
                  <p className="text-xs text-gray-500">Half Present</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-red-600">{stats.absent}</p>
                  <p className="text-xs text-gray-500">Absent</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Weekly Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Weekly Attendance Trends</h3>
              <p className="text-gray-600">Last 7 days attendance overview</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <PieChart className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="text-center">
                  <p className="text-sm font-medium text-gray-700 mb-2">{day.day}</p>
                  <div className="space-y-1">
                    <div className="bg-green-100 rounded px-2 py-1">
                      <p className="text-xs font-bold text-green-600">{day.present}</p>
                      <p className="text-xs text-green-500">Present</p>
                    </div>
                    <div className="bg-yellow-100 rounded px-2 py-1">
                      <p className="text-xs font-bold text-yellow-600">{day.halfPresent}</p>
                      <p className="text-xs text-yellow-500">Half</p>
                    </div>
                    <div className="bg-red-100 rounded px-2 py-1">
                      <p className="text-xs font-bold text-red-600">{day.absent}</p>
                      <p className="text-xs text-red-500">Absent</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Block-wise Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Block-wise Statistics</h3>
              <p className="text-gray-600">Attendance breakdown by hostel blocks</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getBlockStats().map((block, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900">{block.block}</h4>
                  <span className={`text-sm font-bold px-2 py-1 rounded ${
                    block.rate >= 85 ? 'bg-green-100 text-green-600' :
                    block.rate >= 75 ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {block.rate}%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Students:</span>
                    <span className="font-medium">{block.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Present:</span>
                    <span className="font-medium text-green-600">{block.present}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-600">Half Present:</span>
                    <span className="font-medium text-yellow-600">{block.halfPresent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Absent:</span>
                    <span className="font-medium text-red-600">{block.absent}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        block.rate >= 85 ? 'bg-green-500' :
                        block.rate >= 75 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${block.rate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;