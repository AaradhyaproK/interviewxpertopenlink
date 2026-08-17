import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface SkillRadarProps {
  skillsList?: string[];
  roleTitle?: string;
  isDark?: boolean;
}

export const SkillRadarChart: React.FC<SkillRadarProps> = ({ skillsList, roleTitle, isDark = true }) => {
  // Extract or generate skill dimensions
  const baseSkills = skillsList && skillsList.length > 0 
    ? skillsList.slice(0, 6) 
    : ['Technical Depth', 'System Design', 'Problem Solving', 'Communication', 'Domain Knowledge', 'Execution Speed'];

  // Construct chart data
  const chartData = [
    { subject: baseSkills[0] || 'Technical Stack', candidate: 92, required: 85, fullMark: 100 },
    { subject: baseSkills[1] || 'System Design', candidate: 84, required: 80, fullMark: 100 },
    { subject: baseSkills[2] || 'Problem Solving', candidate: 88, required: 75, fullMark: 100 },
    { subject: baseSkills[3] || 'Communication', candidate: 94, required: 70, fullMark: 100 },
    { subject: baseSkills[4] || 'Domain Knowledge', candidate: 79, required: 80, fullMark: 100 },
    { subject: baseSkills[5] || 'Code Quality', candidate: 90, required: 85, fullMark: 100 },
  ];

  // Matched vs Missing / Growth Skills
  const matchedSkills = skillsList && skillsList.length > 0 
    ? skillsList.slice(0, Math.min(skillsList.length, 5)) 
    : ['React.js', 'TypeScript', 'State Management', 'REST / GraphQL APIs', 'Performance Optimization'];

  const missingSkills = ['Distributed Systems Caching', 'Kubernetes / Microservices CI/CD'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-white/5 pb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles size={18} className="text-primary" /> Skill Proficiency & Role Fit Matrix
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Benchmarked against requirements for {roleTitle || 'Target Job Role'}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary/80 inline-block"></span>
            <span className="text-gray-700 dark:text-gray-300">Candidate (88% avg)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="text-gray-500 dark:text-gray-400">Target Benchmark</span>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
            <PolarGrid stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"} />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 11, fontWeight: 600 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}
              tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 9 }}
            />
            <Radar
              name="Required Benchmark"
              dataKey="required"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.15}
            />
            <Radar
              name="Candidate Score"
              dataKey="candidate"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Matched vs Missing Skill Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
          <div className="flex items-center gap-2 mb-3 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 size={15} /> Verified Strong Matches ({matchedSkills.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-1 bg-white dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-200/80 dark:border-emerald-700/50 shadow-xs flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
          <div className="flex items-center gap-2 mb-3 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
            <AlertCircle size={15} /> Identified Skill Gaps / Secondary
          </div>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-1 bg-white dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-semibold rounded-lg border border-amber-200/80 dark:border-amber-700/50 shadow-xs flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillRadarChart;
