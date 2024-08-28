import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle successful response
      console.log('File uploaded successfully!');
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Add Candidates to Database</h2>
          <div className="items-center">
            <div>
              <p className="text-gray-500">Upload a .xlsx or .xls file here</p>
            </div>
            {/* File upload section */}
            <div className="flex justify-center">
              {selectedFile && !uploadSuccess ? (
                <div>
                  Selected file: {selectedFile.name}
                  <button onClick={handleUpload} className="ml-4 p-2 bg-blue-500 text-white rounded">Upload</button>
                </div>
              ) : (
                <div>
                  <input type="file" onChange={handleFileChange} className="border rounded p-2" />
                </div>
              )}
            </div>
          </div>
          {uploadSuccess && (
            <div className="text-center mt-4">
              <p className="text-green-500 font-medium">File Succesfully Uploaded. Your records will be processed shortly.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
