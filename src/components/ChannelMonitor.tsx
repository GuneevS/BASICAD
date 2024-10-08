import React, { useState } from 'react';
import { Plus, Folder } from 'lucide-react';

interface Channel {
  id: number;
  name: string;
  folder: string;
  status: 'Active' | 'Inactive';
  lastDetection: string;
}

interface ChannelMonitorProps {
  channels: Channel[];
  addChannel: (channelData: { name: string; path: string }) => void;
}

const ChannelMonitor: React.FC<ChannelMonitorProps> = ({ channels, addChannel }) => {
  const [newChannel, setNewChannel] = useState({ name: '', folder: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewChannel({ ...newChannel, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChannel.name && newChannel.folder) {
      addChannel({ name: newChannel.name, path: newChannel.folder });
      setNewChannel({ name: '', folder: '' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Channel Monitor</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Channel</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Channel Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newChannel.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="folder" className="block text-sm font-medium text-gray-700">Monitoring Folder</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="folder"
                name="folder"
                value={newChannel.folder}
                onChange={handleInputChange}
                className="flex-1 block w-full rounded-none rounded-l-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <button
                type="button"
                className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                onClick={() => {/* Implement folder selection dialog */}}
              >
                <Folder className="h-5 w-5" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Channel
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Folder</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Detection</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {channels.map((channel) => (
              <tr key={channel.id}>
                <td className="px-6 py-4 whitespace-nowrap">{channel.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{channel.folder}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    channel.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {channel.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{channel.lastDetection}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChannelMonitor;