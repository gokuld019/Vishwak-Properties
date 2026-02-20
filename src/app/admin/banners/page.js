'use client';
import { useState, useEffect } from 'react';
import { Upload, Image, X, AlertCircle, CheckCircle } from 'lucide-react';

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [files, setFiles] = useState([null, null, null]);
  const [previews, setPreviews] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/banners');
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      console.error('Error fetching banners:', err);
    }
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPreviews = [...previews];
      newPreviews[index] = reader.result;
      setPreviews(newPreviews);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles[index] = null;
    setFiles(newFiles);

    const newPreviews = [...previews];
    newPreviews[index] = null;
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    const selectedFiles = files.filter(f => f !== null);
    
    if (selectedFiles.length !== 3) {
      setMessage({ type: 'error', text: 'Please select exactly 3 banner images' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      files.forEach(file => {
        if (file) formData.append('banners', file);
      });

      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:5000/api/banners/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
        body: formData
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage({ type: 'success', text: '3 Banners uploaded successfully!' });
      setFiles([null, null, null]);
      setPreviews([null, null, null]);
      fetchBanners();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Banners Management</h1>
        <p className="text-gray-500 mt-1">Upload exactly 3 homepage banner images</p>
      </div>

      {message.text && (
        <div className={`rounded-lg p-4 flex items-start ${
          message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          )}
          <p className={`text-sm ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
            {message.text}
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New Banners</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[0, 1, 2].map((index) => (
            <div key={index} className="relative">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e)}
                  className="hidden"
                  id={`file-${index}`}
                />
                <label htmlFor={`file-${index}`} className="cursor-pointer block">
                  {previews[index] ? (
                    <div className="relative">
                      <img 
                        src={previews[index]} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        onClick={(e) => { e.preventDefault(); removeFile(index); }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Banner {index + 1}</p>
                      <p className="text-xs text-gray-400 mt-1">Click to upload</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleUpload}
          disabled={loading || files.filter(f => f).length !== 3}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Uploading...' : 'Upload All 3 Banners'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Banners</h2>
        {banners.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Image className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No banners uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {banners.map((banner, index) => (
              <div key={banner.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={`http://localhost:5000/${banner.image}`}
                  alt={banner.title || `Banner ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 bg-gray-50">
                  <p className="text-sm font-medium text-gray-700">
                    {banner.title || `Banner ${index + 1}`}
                  </p>
                  {banner.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">{banner.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}