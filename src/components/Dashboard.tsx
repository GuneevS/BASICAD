import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Dashboard = ({ channels, ads }) => {
  // This is a placeholder for actual detection data
  const data = channels.map(channel => ({
    name: channel.name,
    detections: Math.floor(Math.random() * 100)
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Ad Detections by Channel</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="detections" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Active Ads</h3>
        <ul className="list-disc pl-5">
          {ads.filter(ad => ad.active).map(ad => (
            <li key={ad.name}>{ad.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard