import React, { useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [encodedData, setEncodedData] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file before uploading.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/api/files/compress', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to upload file.");
            }

            const data = await response.json();
            setEncodedData(data);
        } catch (error) {
            console.error("Error uploading file:", error.message);
            alert(error.message);
        }
    };

    return (
        <div className="p-4">
            <input type="file" onChange={handleFileChange} />
            <button
                onClick={handleUpload}
                disabled={!file}
                className={`px-4 py-2 mt-2 ${file ? 'bg-blue-500 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
            >
                Compress
            </button>
            
            {encodedData && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Encoded Data:</h3>
                    <textarea
                        readOnly
                        value={encodedData.encoded}
                        className="w-full p-2 border rounded-md"
                        style={{ height: `${Math.min(encodedData.encoded.length / 5, 500)}px` }} // Dynamic height
                    />
                
                </div>
            )}
        </div>
    );
};

export default FileUpload;
