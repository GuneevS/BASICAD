import React, { useState } from 'react'
import { Save } from 'lucide-react'

const Settings = () => {
  const [settings, setSettings] = useState({
    detectionInterval: '5',
    qualityThreshold: '0.7',
    fingerprintAlgorithm: 'perceptual_hash',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSettings({ ...settings, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the settings to your backend or local storage
    console.log('Settings saved:', settings)
    alert('Settings saved successfully!')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="detectionInterval" className="block text-sm font-medium text-gray-700">Detection Interval (seconds)</label>
            <input
              type="number"
              id="detectionInterval"
              name="detectionInterval"
              value={settings.detectionInterval}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="qualityThreshold" className="block text-sm font-medium text-gray-700">Quality Threshold (0-1)</label>
            <input
              type="number"
              id="qualityThreshold"
              name="qualityThreshold"
              min="0"
              max="1"
              step="0.1"
              value={settings.qualityThreshold}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="fingerprintAlgorithm" className="block text-sm font-medium text-gray-700">Fingerprint Algorithm</label>
            <select
              id="fingerprintAlgorithm"
              name="fingerprintAlgorithm"
              value={settings.fingerprintAlgorithm}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="perceptual_hash">Perceptual Hash</option>
              <option value="wavelet_transform">Wavelet Transform</option>
              <option value="feature_extraction">Feature Extraction</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </button>
        </form>
      </div>
    </div>
  )
}

export default Settings