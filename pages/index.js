import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes('audio')) {
      setFile(selectedFile);
      setError(null);
      // Create URL for audio preview
      const url = URL.createObjectURL(selectedFile);
      setAudioUrl(url);
    } else {
      setError('Please select a valid audio file (MP3, WAV, etc.)');
      setFile(null);
      setAudioUrl(null);
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
    setIsAnalyzing(true);

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
        setError(data.error || 'Failed to analyze audio');
      }
    } catch (error) {
      setError('Network error: ' + error.message);
    } finally {
      setLoading(false);
      setIsAnalyzing(false);
    }
  };

  // Cleanup audio URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Head>
        <title>Audio Mood Analysis - Music Detailer</title>
        <meta name="description" content="Analyze audio files for mood classification and music features" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🎵 Music Detailer
          </h1>
          <p className="text-xl text-gray-300">
            Advanced Audio Mood Analysis & Music Feature Extraction
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* File Upload Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Upload Audio File
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="audio-file"
                />
                <label
                  htmlFor="audio-file"
                  className="cursor-pointer block"
                >
                  <div className="text-6xl mb-4">🎵</div>
                  <p className="text-white text-lg mb-2">
                    Click to select an audio file
                  </p>
                  <p className="text-gray-400 text-sm">
                    Supports MP3, WAV, M4A, AAC, OGG, FLAC
                  </p>
                </label>
              </div>

              {file && (
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-300">
                    <strong>Selected:</strong> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              )}

              {audioUrl && (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-300 mb-2">Audio Preview:</p>
                  <audio controls className="w-full">
                    <source src={audioUrl} type={file?.type} />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              <button
                type="submit"
                disabled={!file || loading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  !file || loading
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-105'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Analyzing Audio...
                  </div>
                ) : (
                  'Analyze Audio'
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-300">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {result && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Analysis Results
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mood Analysis */}
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Mood Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Happy</span>
                      <span className="text-green-400 font-semibold">
                        {(result.mood_happy * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${result.mood_happy * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-300">Sad</span>
                      <span className="text-blue-400 font-semibold">
                        {(result.mood_sad * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${result.mood_sad * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-300">Relaxed</span>
                      <span className="text-yellow-400 font-semibold">
                        {(result.mood_relaxed * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${result.mood_relaxed * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-300">Aggressive</span>
                      <span className="text-red-400 font-semibold">
                        {(result.mood_aggressive * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${result.mood_aggressive * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Music Features */}
                <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg p-6 border border-blue-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Music Features</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Danceability</span>
                        <span className="text-cyan-400 font-semibold">
                          {(result.danceability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${result.danceability * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">BPM</span>
                        <span className="text-orange-400 font-semibold">
                          {result.bpm || 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Key</span>
                        <span className="text-purple-400 font-semibold">
                          {result.key || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-lg p-6 border border-green-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Analysis Summary</h3>
                  <div className="space-y-3 text-sm">
                    <p className="text-gray-300">
                      <strong>File:</strong> {file?.name}
                    </p>
                    <p className="text-gray-300">
                      <strong>Size:</strong> {(file?.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="text-gray-300">
                      <strong>Type:</strong> {file?.type}
                    </p>
                    <p className="text-gray-300">
                      <strong>Analysis Time:</strong> {result.processingTime || 'N/A'}ms
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Information */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mt-8 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              API Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Endpoint</h3>
                <code className="bg-gray-800 text-green-400 px-3 py-2 rounded-lg text-sm">
                  POST /api/analyze
                </code>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Content-Type</h3>
                <code className="bg-gray-800 text-blue-400 px-3 py-2 rounded-lg text-sm">
                  multipart/form-data
                </code>
              </div>
            </div>
            <p className="text-gray-400 mt-4">
              This application combines a beautiful frontend interface with a powerful backend API for audio analysis.
              Upload your audio files and get detailed mood analysis results instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
