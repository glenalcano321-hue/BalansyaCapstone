import { useState } from 'react';
import { Save, X, TrendingUp, Clock, Award, BookOpen, UserCheck, BarChart3, Utensils, Coffee, Zap } from 'lucide-react';
// Added Tooltip to the imports below
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface SkillData {
  workerId: string;
  workerName: string;
  stationId: string;
  stationName: string;
  skillLevel: number; 
  observedTime: number; 
  standardTime: number; 
  efficiency: number; 
  trainingHours: number;
  supervisorEval: number; 
}

interface Worker {
  id: string;
  name: string;
  position: string;
}

interface Station {
  id: string;
  name: string;
}

const workers: Worker[] = [
  { id: 'W001', name: 'Worker 1', position: 'Head Cook' },
  { id: 'W002', name: 'Worker 2', position: 'Line Cook' },
  { id: 'W003', name: 'Worker 3', position: 'Prep Assistant' },
  { id: 'W004', name: 'Worker 4', position: 'Cashier/Server' },
  { id: 'W005', name: 'Worker 5', position: 'Service Crew' },
  { id: 'W006', name: 'Worker 6', position: 'Kitchen Helper' },
];

const stations: Station[] = [
  { id: 'ST-01', name: 'Mise en Place/Prep' },
  { id: 'ST-02', name: 'Main Cooking/Stove' },
  { id: 'ST-03', name: 'Plating & Garnish' },
  { id: 'ST-04', name: 'POS/Cashiering' },
  { id: 'ST-05', name: 'Customer Service' },
];

const initialSkillData: SkillData[] = [
  { workerId: 'W001', workerName: 'Maria Santos', stationId: 'ST-01', stationName: 'Mise en Place/Prep', skillLevel: 5, observedTime: 110, standardTime: 120, efficiency: 109, trainingHours: 150, supervisorEval: 4.9 },
  { workerId: 'W001', workerName: 'Maria Santos', stationId: 'ST-02', stationName: 'Main Cooking/Stove', skillLevel: 5, observedTime: 280, standardTime: 300, efficiency: 107, trainingHours: 300, supervisorEval: 5.0 },
  { workerId: 'W001', workerName: 'Maria Santos', stationId: 'ST-03', stationName: 'Plating & Garnish', skillLevel: 4, observedTime: 42, standardTime: 40, efficiency: 95, trainingHours: 80, supervisorEval: 4.5 },
  { workerId: 'W001', workerName: 'Maria Santos', stationId: 'ST-04', stationName: 'POS/Cashiering', skillLevel: 3, observedTime: 75, standardTime: 60, efficiency: 80, trainingHours: 20, supervisorEval: 3.2 },
  { workerId: 'W001', workerName: 'Maria Santos', stationId: 'ST-05', stationName: 'Customer Service', skillLevel: 3, observedTime: 95, standardTime: 90, efficiency: 94, trainingHours: 30, supervisorEval: 3.8 },
  
  { workerId: 'W004', workerName: 'Pedro Garcia', stationId: 'ST-01', stationName: 'Mise en Place/Prep', skillLevel: 3, observedTime: 140, standardTime: 120, efficiency: 85, trainingHours: 40, supervisorEval: 3.5 },
  { workerId: 'W004', workerName: 'Pedro Garcia', stationId: 'ST-02', stationName: 'Main Cooking/Stove', skillLevel: 2, observedTime: 400, standardTime: 300, efficiency: 75, trainingHours: 25, supervisorEval: 2.8 },
  { workerId: 'W004', workerName: 'Pedro Garcia', stationId: 'ST-03', stationName: 'Plating & Garnish', skillLevel: 4, observedTime: 38, standardTime: 40, efficiency: 105, trainingHours: 50, supervisorEval: 4.1 },
  { workerId: 'W004', workerName: 'Pedro Garcia', stationId: 'ST-04', stationName: 'POS/Cashiering', skillLevel: 5, observedTime: 45, standardTime: 60, efficiency: 133, trainingHours: 120, supervisorEval: 4.9 },
  { workerId: 'W004', workerName: 'Pedro Garcia', stationId: 'ST-05', stationName: 'Customer Service', skillLevel: 5, observedTime: 65, standardTime: 90, efficiency: 138, trainingHours: 110, supervisorEval: 4.8 },

  { workerId: 'W002', workerName: 'Juan Dela Cruz', stationId: 'ST-01', stationName: 'Mise en Place/Prep', skillLevel: 4, observedTime: 125, standardTime: 120, efficiency: 96, trainingHours: 90, supervisorEval: 4.2 },
  { workerId: 'W002', workerName: 'Juan Dela Cruz', stationId: 'ST-02', stationName: 'Main Cooking/Stove', skillLevel: 4, observedTime: 310, standardTime: 300, efficiency: 97, trainingHours: 120, supervisorEval: 4.3 },
  { workerId: 'W002', workerName: 'Juan Dela Cruz', stationId: 'ST-03', stationName: 'Plating & Garnish', skillLevel: 5, observedTime: 35, standardTime: 40, efficiency: 114, trainingHours: 100, supervisorEval: 4.8 },
  { workerId: 'W002', workerName: 'Juan Dela Cruz', stationId: 'ST-04', stationName: 'POS/Cashiering', skillLevel: 2, observedTime: 90, standardTime: 60, efficiency: 67, trainingHours: 15, supervisorEval: 3.0 },
  { workerId: 'W002', workerName: 'Juan Dela Cruz', stationId: 'ST-05', stationName: 'Customer Service', skillLevel: 3, observedTime: 100, standardTime: 90, efficiency: 90, trainingHours: 40, supervisorEval: 3.4 },

  ...workers.filter(w => !['W001', 'W002', 'W004'].includes(w.id)).flatMap(w => 
    stations.map(s => ({
      workerId: w.id,
      workerName: w.name,
      stationId: s.id,
      stationName: s.name,
      skillLevel: Math.floor(Math.random() * 4) + 1,
      observedTime: 100,
      standardTime: 100,
      efficiency: 100,
      trainingHours: 50,
      supervisorEval: 4.0
    }))
  )
];

export default function SkillMatrixPage() {
  const [skillData, setSkillData] = useState<SkillData[]>(initialSkillData);
  const [selectedCell, setSelectedCell] = useState<SkillData | null>(null);

  const getSkillLevel = (workerId: string, stationId: string): number => {
    return skillData.find(d => d.workerId === workerId && d.stationId === stationId)?.skillLevel || 0;
  };

  const handleCellClick = (workerId: string, stationId: string) => {
    const data = skillData.find(d => d.workerId === workerId && d.stationId === stationId);
    if (data) setSelectedCell(data);
  };

  const getCellColor = (level: number): string => {
    if (level === 5) return 'bg-emerald-600';
    if (level === 4) return 'bg-sky-600';
    if (level === 3) return 'bg-amber-500';
    if (level === 2) return 'bg-orange-500';
    if (level === 1) return 'bg-rose-500';
    return 'bg-slate-200';
  };

  const getWorkerAverage = (workerId: string) => {
    const filtered = skillData.filter(d => d.workerId === workerId);
    return (filtered.reduce((sum, d) => sum + d.skillLevel, 0) / filtered.length).toFixed(1);
  };

  const getStationAverage = (stationId: string) => {
    const filtered = skillData.filter(d => d.stationId === stationId);
    return (filtered.reduce((sum, d) => sum + d.skillLevel, 0) / filtered.length).toFixed(1);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Utensils className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Eatery Staff Skill Matrix</h2>
            <p className="text-sm text-slate-500">Track kitchen competency and service efficiency</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 shadow-md transition-all">
          <Save className="w-4 h-4" /> Save Snapshot
        </button>
      </div>

      <div className={`grid gap-6 ${selectedCell ? 'grid-cols-4' : 'grid-cols-1'}`}>
        <div className={selectedCell ? 'col-span-3' : 'col-span-1'}>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-xs font-bold text-slate-600 uppercase">Staff Member</th>
                  {stations.map(s => (
                    <th key={s.id} className="p-4 text-center text-xs font-bold text-slate-600 uppercase">{s.name}</th>
                  ))}
                  <th className="p-4 text-center text-xs font-bold text-slate-600 uppercase">Avg. Skill</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {workers.map(worker => (
                  <tr key={worker.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{worker.name}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">{worker.position}</div>
                    </td>
                    {stations.map(station => {
                      const level = getSkillLevel(worker.id, station.id);
                      const isSelected = selectedCell?.workerId === worker.id && selectedCell?.stationId === station.id;
                      return (
                        <td key={`${worker.id}-${station.id}`} className="p-4 text-center">
                          <button
                            onClick={() => handleCellClick(worker.id, station.id)}
                            className={`w-10 h-10 rounded-xl ${getCellColor(level)} text-white font-bold text-sm shadow-sm hover:scale-105 transition-transform flex items-center justify-center mx-auto ${isSelected ? 'ring-4 ring-orange-200' : ''}`}
                          >
                            {level}
                          </button>
                        </td>
                      );
                    })}
                    <td className="p-4 text-center font-bold text-slate-700 bg-slate-50/30">{getWorkerAverage(worker.id)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedCell && (
          <div className="col-span-1 animate-in slide-in-from-right duration-300">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 space-y-6 sticky top-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{selectedCell.workerName}</h3>
                  <p className="text-sm text-orange-600 font-medium">{selectedCell.stationName}</p>
                </div>
                <button onClick={() => setSelectedCell(null)} className="p-1.5 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Observed</div>
                  <div className="text-xl font-bold text-slate-900">{selectedCell.observedTime}s</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Efficiency</div>
                  <div className="text-xl font-bold text-emerald-600">{selectedCell.efficiency}%</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">Supervisor Eval</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400" style={{ width: `${(selectedCell.supervisorEval / 5) * 100}%` }} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{selectedCell.supervisorEval}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-600">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-medium">{selectedCell.trainingHours} Total Training Hours</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INTERACTIVE RADAR CHART SECTION */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-slate-900">Worker Competency Profile</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart 
              data={skillData
                .filter(d => d.workerId === (selectedCell?.workerId || 'W001'))
                .map(d => ({ 
                  station: d.stationName, 
                  skill: d.skillLevel 
                }))
              }
            >
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis 
                dataKey="station" 
                tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} 
              />
              <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 10 }} />
              
              {/* Tooltip added for interactivity */}
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  fontSize: '12px' 
                }}
                formatter={(value: number) => [`Level ${value}`, 'Skill']}
              />
              
              <Radar 
                name="Skill Level" 
                dataKey="skill" 
                stroke="#ea580c" 
                fill="#f97316" 
                fillOpacity={0.5} 
                dot={{ r: 4, fill: '#ea580c' }} // Dots added to trigger hover easily
                activeDot={{ r: 6 }} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-sky-500" />
            <h3 className="font-bold text-slate-900">Station Coverage Averages</h3>
          </div>
          <div className="space-y-4">
            {stations.map(s => {
              const avg = parseFloat(getStationAverage(s.id));
              return (
                <div key={s.id} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-700">{s.name}</span>
                    <span className="font-bold text-slate-900">{avg} / 5.0</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-500 ${avg > 4 ? 'bg-emerald-500' : avg > 2.5 ? 'bg-sky-500' : 'bg-rose-500'}`} style={{ width: `${(avg / 5) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}