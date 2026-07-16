
import React, { useMemo, useState } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
    PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

// --- Mock Data with Demographics ---
const MOCK_USERS = [
    { id: 'u1', name: 'Batoul', age: 23, gender: 'Female', country: 'Germany', level: 'C1', accuracy: 85, avgTime: 12, status: 'Active' },
    { id: 'u2', name: 'John Doe', age: 28, gender: 'Male', country: 'USA', level: 'A1', accuracy: 60, avgTime: 25, status: 'At Risk' },
    { id: 'u3', name: 'Maria S.', age: 19, gender: 'Female', country: 'Spain', level: 'A2', accuracy: 92, avgTime: 8, status: 'Active' },
    { id: 'u4', name: 'Ahmed K.', age: 34, gender: 'Male', country: 'Egypt', level: 'B1', accuracy: 78, avgTime: 15, status: 'Inactive' },
    { id: 'u5', name: 'Li Wei', age: 22, gender: 'Other', country: 'China', level: 'B2', accuracy: 88, avgTime: 10, status: 'Active' },
    { id: 'u6', name: 'Sarah J.', age: 45, gender: 'Female', country: 'UK', level: 'B1', accuracy: 95, avgTime: 6, status: 'Active' },
];

// Your Custom Colors
const COLORS = {
    lightViolet: '#7B6ADA',   
    darkViolet: '#311C5D',   
    lightYellow: '#FFEF5F',   
    darkYellow: '#D4E85A',   
    lightBlue: '#5F99AE',    
    darkBlue: '#336D82',    
    lightRed: '#F8615A',     
    darkRed: '#CF0000',   
    lightGreen: "#B4FE98",
    darkGreen: "#5D8233"
};

const CHART_COLORS = [COLORS.lightViolet, COLORS.lightBlue, COLORS.lightYellow, COLORS.lightRed, COLORS.lightGreen];

export default function AdminDashboard() {
    const [users] = useState(MOCK_USERS);
    const [selectedLevel, setSelectedLevel] = useState('All');

    // --- Analytics Calculations ---
    const stats = useMemo(() => {
        const filtered = selectedLevel === 'All' ? users : users.filter(u => u.level === selectedLevel);
        
        // Gender Distribution
        const genderCount = filtered.reduce((acc, curr) => {
            acc[curr.gender] = (acc[curr.gender] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        const genderData = Object.keys(genderCount).map(key => ({
            name: key, value: genderCount[key]
        }));

        // Age Groups
        const ageGroups = { '18-25': 0, '26-35': 0, '36+': 0 };
        filtered.forEach(u => {
            if (u.age <= 25) ageGroups['18-25']++;
            else if (u.age <= 35) ageGroups['26-35']++;
            else ageGroups['36+']++;
        });
        const ageData = Object.keys(ageGroups).map(key => ({
            name: key, users: ageGroups[key]
        }));

        // Performance Trend (Mocked by Level)
        const performanceData = [
            { name: 'A1', accuracy: 75, time: 15 },
            { name: 'A2', accuracy: 82, time: 12 },
            { name: 'B1', accuracy: 88, time: 10 },
            { name: 'B2', accuracy: 91, time: 8 },
            { name: 'C1', accuracy: 98, time: 5 },
        ];

        return { genderData, ageData, performanceData, total: filtered.length };
    }, [users, selectedLevel]);

    return (
        <div className="min-h-screen bg-gray-900 p-4 sm:p-8 text-white">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-light-yellow">
                            Admin Analytics Hub
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Real-time insights into learner demographics and performance.
                        </p>
                    </div>
                    
                    <select 
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-light-yellow focus:outline-none focus:ring-2 focus:ring-light-violet"
                    >
                        <option value="All">All Levels</option>
                        <option value="A1">A1 Beginner</option>
                        <option value="A2">A2 Elementary</option>
                        <option value="B1">B1 Intermediate</option>
                        <option value="B2">B2 Upper Intermediate</option>
                        <option value="C1">C1 Fluent</option>
                    </select>
                </div>

                {/* Top Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Learners" value={stats.total} icon="👥" bgColor={COLORS.darkBlue} />
                    <StatCard title="Avg. Accuracy" value="82%" icon="🎯" bgColor={COLORS.darkGreen} />
                    <StatCard title="Avg. Session" value="14m" icon="⏱️" bgColor={COLORS.darkViolet} />
                    <StatCard title="Active Now" value="12" icon="🟢" bgColor={COLORS.darkRed} />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Demographics: Age */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
                        <h3 className="text-xl font-bold text-light-yellow mb-6">Age Distribution</h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.ageData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        cursor={{fill: '#374151', opacity: 0.4}}
                                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                                    />
                                    <Bar dataKey="users" fill={COLORS.lightViolet} radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Demographics: Gender */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
                        <h3 className="text-xl font-bold text-light-yellow mb-6">Gender Split</h3>
                        <div className="h-64 w-full flex justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.genderData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {stats.genderData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#fff' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Performance Trend */}
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 lg:col-span-2">
                        <h3 className="text-xl font-bold text-light-yellow mb-6">Proficiency vs. Speed</h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats.performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                    <XAxis dataKey="name" stroke="#9CA3AF" />
                                    <YAxis yAxisId="left" stroke="#9CA3AF" label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" label={{ value: 'Time (min)', angle: 90, position: 'insideRight', fill: '#9CA3AF' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }} />
                                    <Legend wrapperStyle={{ color: '#fff' }} />
                                    <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke={COLORS.lightGreen} strokeWidth={3} activeDot={{ r: 8 }} />
                                    <Line yAxisId="right" type="monotone" dataKey="time" stroke={COLORS.lightRed} strokeWidth={3} strokeDasharray="5 5" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Detailed User Table */}
                <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
                    <h3 className="text-xl font-bold text-light-yellow mb-6">Learner Directory</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-700 text-gray-300 uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 rounded-tl-lg">User</th>
                                    <th className="p-4">Demographics</th>
                                    <th className="p-4">Level</th>
                                    <th className="p-4">Performance</th>
                                    <th className="p-4 rounded-tr-lg">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700 text-gray-300">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-700/50 transition">
                                        <td className="p-4 font-medium text-white">{user.name}</td>
                                        <td className="p-4">
                                            <div className="flex flex-col text-xs">
                                                <span>{user.age} yrs • {user.gender}</span>
                                                <span className="text-gray-500">{user.country}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 rounded-md bg-gray-700 text-light-yellow font-bold text-xs border border-gray-600">
                                                {user.level}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-gray-600 rounded-full h-1.5">
                                                    <div className="bg-light-green h-1.5 rounded-full" style={{ width: `${user.accuracy}%` }}></div>
                                                </div>
                                                <span className="text-xs text-white">{user.accuracy}%</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                user.status === 'Active' ? 'bg-dark-green/20 text-light-green border border-dark-green' :
                                                user.status === 'At Risk' ? 'bg-dark-red/20 text-light-red border border-dark-red' :
                                                'bg-gray-700 text-gray-400 border border-gray-600'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Sub-components ---

function StatCard({ title, value, icon, bgColor }: any) {
    return (
        <div 
            className="p-6 rounded-2xl shadow-md flex items-center justify-between transform hover:scale-105 transition duration-300 border border-gray-700"
            style={{ backgroundColor: bgColor }}
        >
            <div>
                <p className="text-sm font-medium uppercase tracking-wide text-white/80">{title}</p>
                <p className="text-3xl font-bold mt-1 text-white">{value}</p>
            </div>
            <div className="text-4xl opacity-80 grayscale brightness-200">{icon}</div>
        </div>
    );
}