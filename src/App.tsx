import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tv, Upload, BarChart2, Folder } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ChannelMonitor from './components/ChannelMonitor';
import AdManager from './components/AdManager';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [channels, setChannels] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchChannels();
    fetchAds();
  }, []);

  const fetchChannels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_channels');
      setChannels(response.data.map(channel => ({ name: channel })));
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const fetchAds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_ads');
      setAds(response.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const addChannel = async (channelData) => {
    try {
      await axios.post('http://localhost:5000/add_channel', channelData);
      fetchChannels();
    } catch (error) {
      console.error('Error adding channel:', error);
    }
  };

  const uploadAd = async (adData) => {
    try {
      const formData = new FormData();
      formData.append('file', adData.file);
      await axios.post('http://localhost:5000/upload_ad', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchAds();
    } catch (error) {
      console.error('Error uploading ad:', error);
    }
  };

  const toggleAd = async (adName) => {
    try {
      await axios.post('http://localhost:5000/toggle_ad', { ad_name: adName });
      fetchAds();
    } catch (error) {
      console.error('Error toggling ad:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard channels={channels} ads={ads} />;
      case 'channels':
        return <ChannelMonitor channels={channels} addChannel={addChannel} />;
      case 'ads':
        return <AdManager ads={ads} uploadAd={uploadAd} toggleAd={toggleAd} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard channels={channels} ads={ads} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">AdDetect Pro</h1>
        </div>
        <nav className="mt-6">
          <button
            className={`w-full flex items-center p-4 ${
              activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart2 className="mr-3" />
            Dashboard
          </button>
          <button
            className={`w-full flex items-center p-4 ${
              activeTab === 'channels' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('channels')}
          >
            <Tv className="mr-3" />
            Channel Monitor
          </button>
          <button
            className={`w-full flex items-center p-4 ${
              activeTab === 'ads' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('ads')}
          >
            <Upload className="mr-3" />
            Ad Manager
          </button>
          <button
            className={`w-full flex items-center p-4 ${
              activeTab === 'settings' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <Folder className="mr-3" />
            Settings
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;