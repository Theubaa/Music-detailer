import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes('audio')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid audio file (MP3, WAV, etc.)');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an audio file');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('audio', file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to analyze audio file');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Audio Mood Analysis API</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="audio-file">Select Audio File:</label>
          <br />
          <input
            type="file"
            id="audio-file"
            accept="audio/*"
            onChange={handleFileChange}
            style={{ marginTop: '5px' }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={!file || loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Analyzing...' : 'Analyze Audio'}
        </button>
      </form>

      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          Error: {error}
        </div>
      )}

      {result && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '5px' 
        }}>
          <h3>Analysis Results:</h3>
          <pre style={{ 
            backgroundColor: 'white', 
            padding: '10px', 
            borderRadius: '3px',
            overflow: 'auto'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <h3>API Usage:</h3>
        <p>Send a POST request to <code>/api/analyze</code> with an audio file in form-data under the key "audio".</p>
        <p>Example with curl:</p>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '3px',
          overflow: 'auto'
        }}>
{`curl -X POST \\
  -F "audio=@your-audio-file.mp3" \\
  http://localhost:3000/api/analyze`}
        </pre>
      </div>
    </div>
  );
}
