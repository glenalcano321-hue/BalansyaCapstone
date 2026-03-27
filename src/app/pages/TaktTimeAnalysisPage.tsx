import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function TaktTimeAnalysisPage() {
  const [workingTime, setWorkingTime] = useState(28800); // 8 hours in seconds
  const [demand, setDemand] = useState(640);
  const [productionHours, setProductionHours] = useState(8);
  
  const taktTime = workingTime / demand;

  const chartData = [
    { name: 'Demand', value: demand, max: 1000 },
    { name: 'Capacity', value: Math.floor(workingTime / 45), max: 1000 },
  ];

  useEffect(() => {
    setWorkingTime(productionHours * 3600);
  }, [productionHours]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Takt Time Analysis</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Input Parameters</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Production Hours per Day
              </label>
              <input
                type="number"
                value={productionHours}
                onChange={(e) => setProductionHours(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">{workingTime.toLocaleString()} seconds available</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Demand (units/day)
              </label>
              <input
                type="number"
                value={demand}
                onChange={(e) => setDemand(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Calculated Takt Time</div>
                <div className="text-4xl font-bold text-blue-600">{taktTime.toFixed(1)}s</div>
                <div className="text-sm text-gray-600 mt-2">per unit</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Max Capacity</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {Math.floor(workingTime / 45)}
                </div>
                <div className="text-xs text-gray-500">units/day @ 45s/unit</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Utilization</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {((demand / Math.floor(workingTime / 45)) * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-gray-500">of capacity</div>
              </div>
            </div>
          </div>
        </div>

        {/* Demand vs Capacity Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Demand vs Capacity</h3>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Units" />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Required Production Rate</span>
              <span className="text-sm font-semibold text-gray-900">
                {(demand / productionHours).toFixed(1)} units/hour
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Maximum Production Rate</span>
              <span className="text-sm font-semibold text-gray-900">
                {((workingTime / 45) / productionHours).toFixed(1)} units/hour
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600">Surplus Capacity</span>
              <span className="text-sm font-semibold text-green-600">
                {Math.floor(workingTime / 45) - demand} units/day
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
