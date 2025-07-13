// client/src/components/admin/dashboard/AdminDashboardSection.jsx

import React, { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer
} from "recharts";
import {
  ArrowUp, ArrowDown, DollarSign, ShoppingCart,
  Users, Activity, TrendingUp
} from "react-feather";

const COLORS = [
  "#00754A", "#00C49F", "#FFBB28", "#FF8042",
  "#4E79A7", "#F44336", "#E91E63", "#B39DDB",
  "#8BC34A", "#4CAF50"
];

export default function AdminDashboardSection() {
  // --- Fake data (now with 10+ points!) ---
  const [selectedMonth, setSelectedMonth] = useState("July 2025");

  const dataByMonth = {
    "May 2025": {
      sales: Array.from({length: 10}, (_, i) => ({
        name: `W${i+1}`, sales: Math.floor(4000 + Math.random() * 5000)
      })),
      revenue: Array.from({length: 10}, (_, i) => ({
        name: `W${i+1}`, revenue: Math.floor(9000 + Math.random() * 8000)
      }))
    },
    "June 2025": {
      sales: Array.from({length: 10}, (_, i) => ({
        name: `W${i+1}`, sales: Math.floor(4200 + Math.random() * 5400)
      })),
      revenue: Array.from({length: 10}, (_, i) => ({
        name: `W${i+1}`, revenue: Math.floor(9500 + Math.random() * 9000)
      }))
    },
    "July 2025": {
      sales: Array.from({length: 10}, (_, i) => ({
        name: `W${i+1}`, sales: Math.floor(4400 + Math.random() * 5600)
      })),
      revenue: Array.from({length: 10}, (_, i) => ({
        name: `W${i+1}`, revenue: Math.floor(10500 + Math.random() * 10000)
      }))
    }
  };

  // Customer Activity: 12 weeks for more data
  const customerActivityData = Array.from({length: 12}, (_, i) => ({
    name: `W${i+1}`, activity: Math.floor(100 + Math.random() * 200)
  }));

  // 10+ categories
  const categories = [
    { name: "Boots", value: 12 },
    { name: "Jerseys", value: 15 },
    { name: "Gloves", value: 8 },
    { name: "Socks", value: 10 },
    { name: "Shin Guards", value: 7 },
    { name: "Bags", value: 6 },
    { name: "Balls", value: 13 },
    { name: "Caps", value: 8 },
    { name: "Scarves", value: 4 },
    { name: "Training", value: 9 },
    { name: "Gadgets", value: 11 }
  ];

  // Stat Cards Data (you can also randomize if you want!)
  const stats = [
    {
      label: "Total Revenue",
      value: "$54,890",
      icon: <DollarSign size={32} className="text-[#00754A]" />,
      change: "+8.5%",
      changeColor: "green",
      up: true
    },
    {
      label: "Total Orders",
      value: "1,290",
      icon: <ShoppingCart size={32} className="text-[#00754A]" />,
      change: "-2.3%",
      changeColor: "red",
      up: false
    },
    {
      label: "Total Customers",
      value: "3,456",
      icon: <Users size={32} className="text-[#00754A]" />,
      change: "+12.5%",
      changeColor: "green",
      up: true
    },
    {
      label: "Conversion Rate",
      value: "2.4%",
      icon: <Activity size={32} className="text-[#00754A]" />,
      change: "+4.7%",
      changeColor: "green",
      up: true
    }
  ];

  // Fake recent activity
  const recent = Array.from({length: 10}, (_, i) => ({
    id: Math.floor(Math.random() * 1000),
    price: (300 + Math.random() * 800).toFixed(2),
    ago: `${2 + i} min ago`
  }));

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-xl p-7 flex flex-col gap-2 border border-[#e3f5ed] hover:scale-[1.035] hover:shadow-2xl transition"
          >
            <span className={`text-lg font-bold ${s.changeColor === "green" ? "text-[#16e087]" : "text-[#fa3636]"}`}>
              {s.label}
            </span>
            <span className="text-2xl font-extrabold flex items-center gap-2">{s.icon} {s.value}</span>
            <span className={`font-bold flex items-center gap-1 text-xs mt-1 ${s.changeColor === "green" ? "text-green-600" : "text-red-500"}`}>
              {s.up ? <ArrowUp size={16} /> : <ArrowDown size={16} />} {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* Line & Pie Chart row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart: Customer Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#e3f5ed]">
          <h3 className="font-bold text-[#00754A] text-lg mb-3">Customer Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={customerActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="activity"
                stroke="#431c5d"
                strokeWidth={2.7}
                dot={{ r: 5, fill: "#00754A" }}
                activeDot={{ r: 8, fill: "#00754A" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Pie Chart: Categories */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#e3f5ed]">
          <h3 className="font-bold text-[#00754A] text-lg mb-3">Product Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name }) => name}
                outerRadius={100}
                dataKey="value"
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales & Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Overview: AreaChart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#e3f5ed]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[#00754A] text-lg">Sales Overview</h3>
            <select
              className="border border-[#00754A] rounded-lg px-3 py-1 text-sm font-semibold text-[#00754A] outline-none focus:ring-2"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
            >
              {Object.keys(dataByMonth).map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={dataByMonth[selectedMonth].sales}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00754A" stopOpacity={0.45}/>
                  <stop offset="95%" stopColor="#e4f9ef" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#00754A"
                fill="url(#salesGradient)"
                fillOpacity={1}
                strokeWidth={3}
                dot={{ r: 3, fill: "#00754A" }}
                activeDot={{ r: 7, fill: "#00754A" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Revenue Overview: BarChart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#e3f5ed]">
          <h3 className="font-bold text-[#00754A] text-lg mb-3">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataByMonth[selectedMonth].revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="revenue"
                fill="#16e087"
                barSize={26}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity (at least 10!) */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#e3f5ed]">
        <div className="font-bold text-[#00754A] mb-4 text-lg">Recent Activity</div>
        <ul className="divide-y divide-[#e3f5ed]">
          {recent.map((r, i) => (
            <li key={i} className="flex items-center py-2.5 px-2">
              <span className="text-[#00754A] font-bold mr-3">•</span>
              <span className="font-semibold text-[#26323c] mr-3">New order #ORD-{r.id}</span>
              <span className="text-gray-400 text-sm mr-3">{r.ago}</span>
              <span className="ml-auto text-[#1e7e5c] font-bold text-lg">${r.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
