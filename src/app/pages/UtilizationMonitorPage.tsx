import { useState } from 'react';
import { Users, Clock, Activity } from 'lucide-react';

const workersData = [
  { id: 1, name: 'Maria Santos', station: 'ST-01', utilization: 85, workTime: 408, idleTime: 72, tasks: 12 },
  { id: 2, name: 'Juan Dela Cruz', station: 'ST-02', utilization: 92, workTime: 442, idleTime: 38, tasks: 14 },
  { id: 3, name: 'Ana Reyes', station: 'ST-03', utilization: 78, workTime: 374, idleTime: 106, tasks: 10 },
  { id: 4, name: 'Pedro Garcia', station: 'ST-04', utilization: 88, workTime: 422, idleTime: 58, tasks: 13 },
  { id: 5, name: 'Lisa Tan', station: 'ST-05', utilization: 95, workTime: 456, idleTime: 24, tasks: 15 },
  { id: 6, name: 'Carlos Wong', station: 'ST-06', utilization: 82, workTime: 394, idleTime: 86, tasks: 11 },
];

export default function UtilizationMonitorPage() {
  const [hoveredWorker, setHoveredWorker] = useState<number | null>(null);

  const avgUtilization = workersData.reduce((acc, w) => acc + w.utilization, 0) / workersData.length;
  const totalIdleTime = workersData.reduce((acc, w) => acc + w.idleTime, 0);

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'bg-green-500';
    if (utilization >= 75) return 'bg-blue-500';
    if (utilization >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Utilization Monitor</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Average Utilization</div>
              <div className="text-3xl font-semibold text-gray-900">{avgUtilization.toFixed(1)}%</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Idle Time</div>
              <div className="text-3xl font-semibold text-gray-900">{totalIdleTime}m</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Active Workers</div>
              <div className="text-3xl font-semibold text-gray-900">{workersData.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Worker Utilization Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Worker Utilization Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Worker</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Station</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Work Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Idle Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Tasks Completed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {workersData.map((worker) => (
                <tr
                  key={worker.id}
                  onMouseEnter={() => setHoveredWorker(worker.id)}
                  onMouseLeave={() => setHoveredWorker(null)}
                  className={`transition-colors ${
                    hoveredWorker === worker.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{worker.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{worker.station}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2.5 max-w-[200px]">
                          <div
                            className={`h-2.5 rounded-full ${getUtilizationColor(worker.utilization)} transition-all duration-300`}
                            style={{ width: `${worker.utilization}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 w-12">{worker.utilization}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{worker.workTime} min</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${worker.idleTime > 60 ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                      {worker.idleTime} min
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{worker.tasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Utilization Distribution */}
      {hoveredWorker && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Detailed Breakdown: {workersData.find(w => w.id === hoveredWorker)?.name}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Productive Time</div>
              <div className="text-2xl font-semibold text-green-600">
                {workersData.find(w => w.id === hoveredWorker)?.workTime} min
              </div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Idle Time</div>
              <div className="text-2xl font-semibold text-red-600">
                {workersData.find(w => w.id === hoveredWorker)?.idleTime} min
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
