import { Clock, Users, AlertTriangle, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const kpiData = [
  { label: 'Takt Time', value: '45s', change: -5, status: 'good', icon: Clock },
  { label: 'Workforce Utilization', value: '87%', change: 3, status: 'good', icon: Users },
  { label: 'Bottleneck Stations', value: '3', change: -1, status: 'warning', icon: AlertTriangle },
  { label: 'Line Efficiency', value: '92%', change: 2, status: 'good', icon: TrendingUp },
];

const workloadData = [
  { station: 'ST-01', workload: 85, capacity: 100 },
  { station: 'ST-02', workload: 92, capacity: 100 },
  { station: 'ST-03', workload: 78, capacity: 100 },
  { station: 'ST-04', workload: 105, capacity: 100 },
  { station: 'ST-05', workload: 88, capacity: 100 },
  { station: 'ST-06', workload: 95, capacity: 100 },
];

const utilizationData = [
  { name: 'Maria Santos', station: 'ST-01', utilization: 85, idle: 15 },
  { name: 'Juan Dela Cruz', station: 'ST-02', utilization: 92, idle: 8 },
  { name: 'Ana Reyes', station: 'ST-03', utilization: 78, idle: 22 },
  { name: 'Pedro Garcia', station: 'ST-04', utilization: 88, idle: 12 },
];

const alerts = [
  { type: 'critical', message: 'Station ST-04 operating at 105% capacity - immediate rebalancing required' },
  { type: 'warning', message: 'Worker Ana Reyes showing 22% idle time - consider task redistribution' },
  { type: 'info', message: 'Takt time improved by 5 seconds - current optimization effective' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                {kpi.change !== 0 && (
                  <div className={`flex items-center gap-1 text-sm ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    <span>{Math.abs(kpi.change)}%</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600 mb-1">{kpi.label}</div>
              <div className="text-3xl font-semibold text-gray-900">{kpi.value}</div>
            </div>
          );
        })}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workload Visualization */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Station Workload Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workloadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" key="grid-workload" />
              <XAxis dataKey="station" tick={{ fill: '#6B7280', fontSize: 12 }} key="xaxis-workload" />
              <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} key="yaxis-workload" />
              <Tooltip key="tooltip-workload" />
              <Bar dataKey="workload" fill="#3B82F6" radius={[4, 4, 0, 0]} key="bar-workload" />
              <Bar dataKey="capacity" fill="#E5E7EB" radius={[4, 4, 0, 0]} key="bar-capacity" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Workforce Utilization Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workforce Utilization</h3>
          <div className="space-y-4">
            {utilizationData.map((worker, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium text-gray-900">{worker.name}</div>
                    <div className="text-gray-500">{worker.station}</div>
                  </div>
                  <div className="font-semibold text-gray-900">{worker.utilization}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      worker.utilization >= 90 ? 'bg-green-500' :
                      worker.utilization >= 75 ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${worker.utilization}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Panel */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Recommendations</h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                alert.type === 'critical' ? 'bg-red-50 border-red-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                  alert.type === 'critical' ? 'text-red-600' :
                  alert.type === 'warning' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
                <p className="text-sm text-gray-700">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}