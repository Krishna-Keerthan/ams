"use client"
import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Download, Calendar, Filter, Edit2, Eye } from 'lucide-react';

const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [blockFilter, setBlockFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data for demonstration
  const mockAttendanceData = [
    {
      id: '1',
      regNo: 'CS2021001',
      name: 'Aarav Sharma',
      dept: 'Computer Science',
      year: '3rd Year',
      checkIn: '2025-01-15T09:00:00Z',
      checkOut: '2025-01-15T18:30:00Z',
      status: 'PRESENT',
      date: '2025-01-15',
      hostelBlock: 'B1',
      roomNumber: '101'
    },
    {
      id: '2',
      regNo: 'EC2021045',
      name: 'Priya Patel',
      dept: 'Electronics',
      year: '2nd Year',
      checkIn: '2025-01-15T09:15:00Z',
      checkOut: '2025-01-15T16:45:00Z',
      status: 'HALF_PRESENT',
      date: '2025-01-15',
      hostelBlock: 'B2',
      roomNumber: '205'
    },
    {
      id: '3',
      regNo: 'ME2021089',
      name: 'Rahul Kumar',
      dept: 'Mechanical',
      year: '4th Year',
      checkIn: null,
      checkOut: null,
      status: 'ABSENT',
      date: '2025-01-15',
      hostelBlock: 'B1',
      roomNumber: '156'
    },
    {
      id: '4',
      regNo: 'CS2021023',
      name: 'Anita Singh',
      dept: 'Computer Science',
      year: '3rd Year',
      checkIn: '2025-01-15T08:45:00Z',
      checkOut: '2025-01-15T19:15:00Z',
      status: 'PRESENT',
      date: '2025-01-15',
      hostelBlock: 'B3',
      roomNumber: '301'
    },
    {
      id: '5',
      regNo: 'EE2021067',
      name: 'Vikram Reddy',
      dept: 'Electrical',
      year: '2nd Year',
      checkIn: '2025-01-15T10:30:00Z',
      checkOut: '2025-01-15T17:00:00Z',
      status: 'PRESENT',
      date: '2025-01-15',
      hostelBlock: 'B2',
      roomNumber: '278'
    },
    {
      id: '6',
      regNo: 'IT2021012',
      name: 'Sneha Gupta',
      dept: 'Information Technology',
      year: '1st Year',
      checkIn: '2025-01-15T09:30:00Z',
      checkOut: '2025-01-15T18:00:00Z',
      status: 'PRESENT',
      date: '2025-01-15',
      hostelBlock: 'B1',
      roomNumber: '134'
    },
    {
      id: '7',
      regNo: 'CE2021078',
      name: 'Arjun Nair',
      dept: 'Civil Engineering',
      year: '2nd Year',
      checkIn: '2025-01-15T11:00:00Z',
      checkOut: null,
      status: 'HALF_PRESENT',
      date: '2025-01-15',
      hostelBlock: 'B3',
      roomNumber: '389'
    },
    {
      id: '8',
      regNo: 'AI2021003',
      name: 'Riya Sharma',
      dept: 'Artificial Intelligence',
      year: '4th Year',
      checkIn: null,
      checkOut: null,
      status: 'ABSENT',
      date: '2025-01-15',
      hostelBlock: 'B2',
      roomNumber: '245'
    }
  ];

  // Fetch attendance data from API
  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      // Uncomment for real API
      /*
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        status: statusFilter,
        date: selectedDate,
        ...(blockFilter !== 'ALL' && { block: blockFilter })
      });

      const response = await fetch(`/api/attendance?${params}`);
      if (!response.ok) throw new Error('Failed to fetch attendance data');
      
      const result = await response.json();
      setAttendanceData(result.data);
      setTotalPages(result.pagination.totalPages);
      setTotalRecords(result.pagination.totalCount);
      */

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter mock data
      let filtered = mockAttendanceData.filter(record => {
        const matchesSearch = 
          record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.dept.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || record.status === statusFilter;
        const matchesBlock = blockFilter === 'ALL' || record.hostelBlock === blockFilter;
        return matchesSearch && matchesStatus && matchesBlock;
      });

      // Paginate
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);
      
      setAttendanceData(paginatedData);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setTotalRecords(filtered.length);

    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const formatDateTime = (dateTime) => {
    if (!dateTime) return '-';
    return new Date(dateTime).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const exportToCSV = () => {
    const csvContent = [
      ['S.No', 'Reg No', 'Name', 'Department', 'Year', 'Block', 'Room', 'Check In', 'Check Out', 'Status'],
      ...attendanceData.map((record, index) => [
        (currentPage - 1) * itemsPerPage + index + 1,
        record.regNo,
        record.name,
        record.dept,
        record.year,
        record.hostelBlock,
        record.roomNumber,
        formatDateTime(record.checkIn),
        formatDateTime(record.checkOut),
        record.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${selectedDate}.csv`;
    a.click();
  };

  const viewRecordDetails = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  // Effects
  useEffect(() => {
    fetchAttendanceData();
  }, [currentPage, statusFilter, blockFilter, selectedDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchAttendanceData();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Attendance Records
              </h1>
              <p className="text-gray-600">
                Detailed attendance tracking for {selectedDate}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchAttendanceData}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                disabled={attendanceData.length === 0}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, registration number, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex gap-3">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
              >
                <option value="ALL">All Status</option>
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
                <option value="HALF_PRESENT">Half Present</option>
              </select>
              <select
                value={blockFilter}
                onChange={(e) => setBlockFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]"
              >
                <option value="ALL">All Blocks</option>
                <option value="B1">Block B1</option>
                <option value="B2">Block B2</option>
                <option value="B3">Block B3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalRecords}</p>
              <p className="text-sm text-gray-500">Total Records</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {attendanceData.filter(r => r.status === 'PRESENT').length}
              </p>
              <p className="text-sm text-gray-500">Present Today</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {attendanceData.filter(r => r.status === 'HALF_PRESENT').length}
              </p>
              <p className="text-sm text-gray-500">Half Present</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {attendanceData.filter(r => r.status === 'ABSENT').length}
              </p>
              <p className="text-sm text-gray-500">Absent Today</p>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reg No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Block/Room
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  // Loading skeleton
                  Array.from({ length: itemsPerPage }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      {Array.from({ length: 10 }).map((_, cellIndex) => (
                        <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-gray-200 rounded"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : attendanceData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-1">No attendance records found</p>
                        <p className="text-sm">Try adjusting your search criteria or date selection</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  attendanceData.map((record, index) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono font-medium text-gray-900">
                          {record.regNo}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-indigo-600">
                                {record.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{record.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.dept}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                            {record.hostelBlock}/{record.roomNumber}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-gray-900">
                          {formatDateTime(record.checkIn)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-gray-900">
                          {formatDateTime(record.checkOut)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          record.status === 'PRESENT' 
                            ? 'bg-green-100 text-green-800' 
                            : record.status === 'ABSENT'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => viewRecordDetails(record)}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900 transition-colors"
                            title="Edit Record"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
                    {' '}to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, totalRecords)}
                    </span>
                    {' '}of{' '}
                    <span className="font-medium">{totalRecords}</span>
                    {' '}results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNum
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Summary Footer */}
          <div className="bg-gray-50 px-6 py-3 text-sm text-gray-600 text-center border-t">
            {loading ? (
              <div className="animate-pulse">Loading attendance records...</div>
            ) : (
              `Displaying ${attendanceData.length} records out of ${totalRecords} total records for ${selectedDate}`
            )}
          </div>
        </div>

        {/* Record Details Modal */}
        {showModal && selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Student Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-lg font-medium text-indigo-600">
                      {selectedRecord.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{selectedRecord.name}</h4>
                    <p className="text-sm text-gray-500">{selectedRecord.regNo}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department</label>
                    <p className="text-sm text-gray-900">{selectedRecord.dept}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Year</label>
                    <p className="text-sm text-gray-900">{selectedRecord.year}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Block</label>
                    <p className="text-sm text-gray-900">{selectedRecord.hostelBlock}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Room</label>
                    <p className="text-sm text-gray-900">{selectedRecord.roomNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Check In</label>
                    <p className="text-sm text-gray-900">{formatDateTime(selectedRecord.checkIn)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Check Out</label>
                    <p className="text-sm text-gray-900">{formatDateTime(selectedRecord.checkOut)}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      selectedRecord.status === 'PRESENT' 
                        ? 'bg-green-100 text-green-800' 
                        : selectedRecord.status === 'ABSENT'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedRecord.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceTable;