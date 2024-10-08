import React, { useState } from 'react';
import { Upload, ToggleLeft, ToggleRight } from 'lucide-react';

interface Ad {
  id: number;
  name: string;
  brand: string;
  duration: string;
  active: boolean;
}

interface AdManagerProps {
  ads: Ad[];
  uploadAd: (adData: { file: File; name: string; brand: string; duration: string }) => void;
  toggleAd: (adName: string) => void;
}

const AdManager: React.FC<AdManagerProps> = ({ ads, uploadAd, toggleAd }) => {
  const [newAd, setNewAd] = useState({ name: '', brand: '', duration: '', file: null as File | null });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files) {
      setNewAd({ ...newAd, [name]: files[0] });
    } else {
      setNewAd({ ...newAd, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAd.name && newAd.brand && newAd.duration && newAd.file) {
      uploadAd(newAd as { file: File; name: string; brand: string; duration: string });
      setNewAd({ name: '', brand: '', duration: '', file: null });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ad Manager</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Upload New Ad</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Ad Video File</label>
            <input
              type="file"
              id="file"
              name="file"
              accept="video/*"
              onChange={handleInputChange}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ad Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newAd.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={newAd.brand}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={newAd.duration}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Ad
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map((ad) => (
              <tr key={ad.id}>
                <td className="px-6 py-4 whitespace-nowrap">{ad.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ad.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ad.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleAd(ad.name)}
                    className={`inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-full ${
                      ad.active
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {ad.active ? <ToggleRight className="mr-1 h-4 w-4" /> : <ToggleLeft className="mr-1 h-4 w-4" />}
                    {ad.active ? 'Active' : 'Inactive'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdManager;