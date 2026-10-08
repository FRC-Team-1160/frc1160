'use client';

import { useState, useRef } from 'react';
const mime = require('mime-types');

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function UploadS3({ maxSize = 5*1024*1024, allowedTypes = ['image/jpeg', 'image/png'], onSubmit, path="/", s3key  }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  let allowedTypesString = ""
  for (const allowedType of allowedTypes) {
      let type = mime.extension(allowedType).toUpperCase();
      allowedTypesString += type + " ";
  }
    
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setError('');

    if (!selectedFile) return;

    // Client-side validation
    if (!allowedTypes.includes(selectedFile.type)) {
      setError(`Only ${allowedTypesString}files are allowed.`);
      return;
    }
    if (selectedFile.size > maxSize) {
      setError(`File is too large (max ${formatBytes(maxSize)}).`);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      // Call API to get signed URL
      const response = await fetch('/api/data/public/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          key: s3key
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error generating URL.');
      }

      // Upload file to S3
      await fetch(data.url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
        
      setUploadedUrl(file.name); // File URL
      if (fileInputRef.current) {
          fileInputRef.current.value = "";
          setFile(null);
      }
      setUploading(false);
        setTimeout(() => setUploadedUrl(null), 5000);
      await onSubmit(path);
    } catch (error) {
        setError((error).message || 'Error during upload.');
        setTimeout(() => setError(null), 5000);
        setUploading(false);
    }
  };

  return (
    <div className="p-4 py-10 w-full flex flex-col space-y-5 justify-center items-center bg-white">
        <div className="flex flex-row flex-wrap justify-center gap-5">
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="border-2 border-gray-200 bg-white p-2 rounded-lg"
            accept="image/jpeg,image/png,application/pdf"
          />
          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {uploadedUrl && (
        <div className="mt-4 flex flex-row space-x-3">
          <p>File uploaded successfully:</p>
          <span>
            {uploadedUrl}
          </span>
        </div>
      )}
    </div>
  );
}