import { AlertTriangle, CheckCircle } from 'lucide-react';

const stations = [
  { id: 'ST-01', name: 'Component Assembly', cycleTime: 42, utilization: 85, status: 'normal' },
  { id: 'ST-02', name: 'Welding', cycleTime: 58, utilization: 92, status: 'warning' },
  { id: 'ST-03', name: 'Quality Check', cycleTime: 28, utilization: 78, status: 'normal' },
  { id: 'ST-04', name: 'Sub-Assembly', cycleTime: 65, utilization: 105, status: 'bottleneck' },
  { id: 'ST-05', name: 'Packaging', cycleTime: 35, utilization: 88, status: 'normal' },
  { id: 'ST-06', name: 'Final Inspection', cycleTime: 25, utilization: 72, status: 'normal' },
];

export default function BottleneckDetectorPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'bottleneck': return 'bg-red-100 border-red-500 text-red-700';
      case 'warning': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      default: return 'bg-green-100 border-green-500 text-green-700';
    }
  };

  const getStatusBadge = (status: string, utilization: number) => {
    if (utilization > 100) {
      return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">BOTTLENECK</span>;
    }
    if (utilization > 90) {
      return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">AT RISK</span>;
    }
    return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">NORMAL</span>;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Bottleneck Detector</h2>

      {/* Process Flow Diagram */}
      <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Production Flow</h3>
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4">
          {stations.map((station, index) => (
            <div key={station.id} className="flex items-center gap-4">
              <div className={`
                relative p-6 rounded-lg border-2 min-w-[180px] transition-all
                ${getStatusColor(station.status)}
                ${station.status === 'bottleneck' ? 'shadow-lg scale-105' : ''}
              `}>
                <div className="text-center">
                  <div className="font-semibold text-sm mb-2">{station.id}</div>
                  <div className="text-xs mb-3">{station.name}</div>
                  <div className="text-2xl font-bold mb-1">{station.cycleTime}s</div>
                  <div className="text-xs mb-2">Cycle Time</div>
                  <div className={`text-xl font-semibold ${
                    station.utilization > 100 ? 'text-red-600' : 
                    station.utilization > 90 ? 'text-yellow-600' : 
                    'text-green-600'
                  }`}>
                    {station.utilization}%
                  </div>
                  {station.status === 'bottleneck' && (
                    <div className="mt-2">
                      <AlertTriangle className="w-5 h-5 mx-auto text-red-600" />
                    </div>
                  )}
                </div>
              </div>
              {index < stations.length - 1 && (
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                  <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Station Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Station ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Cycle Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Utilization Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stations.map((station) => (
                <tr 
                  key={station.id} 
                  className={`
                    ${station.utilization > 100 ? 'bg-red-50' : 'hover:bg-gray-50'}
                    transition-colors
                  `}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{station.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{station.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{station.cycleTime}s</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 max-w-[150px]">
                        <div
                          className={`h-2.5 rounded-full ${
                            station.utilization > 100 ? 'bg-red-500' :
                            station.utilization > 90 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(station.utilization, 100)}%` }}
                        />
                      </div>
                      <span className={`text-sm font-semibold ${
                        station.utilization > 100 ? 'text-red-600' :
                        station.utilization > 90 ? 'text-yellow-600' :
                        'text-gray-900'
                      }`}>
                        {station.utilization}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(station.status, station.utilization)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {station.utilization > 100 && 'Add parallel station or redistribute tasks'}
                    {station.utilization > 90 && station.utilization <= 100 && 'Monitor closely, prepare contingency'}
                    {station.utilization <= 90 && 'Operating normally'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900 mb-2">Critical Bottleneck Detected</h4>
              <p className="text-sm text-red-700">
                Station ST-04 (Sub-Assembly) is operating at 105% utilization. 
                This is causing delays in the production line. Immediate action required.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Optimization Opportunity</h4>
              <p className="text-sm text-green-700">
                Station ST-06 has 28% spare capacity. Consider shifting tasks from 
                bottleneck stations to improve overall throughput.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
