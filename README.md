# Audio Mood Analysis API

A Next.js API for analyzing audio files and extracting mood-related features. This API accepts MP3 and other audio file uploads and returns mood analysis results.

## 🚀 Features

- **File Upload**: Accepts MP3, WAV, M4A, AAC, OGG, and FLAC files
- **Formidable Integration**: Robust file parsing with automatic cleanup
- **Temporary File Handling**: Secure file processing with automatic cleanup
- **Comprehensive Error Handling**: Detailed error messages for debugging
- **Ready for Production**: Configured for Vercel deployment

## 📋 API Endpoints

### POST `/api/analyze`

Upload an audio file for mood analysis.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with key `audio` containing the audio file

**Response:**
```json
{
  "success": true,
  "message": "Audio analysis completed successfully",
  "data": {
    "mood_happy": 0.75,
    "mood_sad": 0.25,
    "mood_relaxed": 0.60,
    "mood_aggressive": 0.30,
    "danceability": 0.80,
    "bpm": 120,
    "key": "C",
    "scale": "major"
  },
  "fileInfo": {
    "originalName": "song.mp3",
    "size": 2048576,
    "mimetype": "audio/mpeg"
  }
}
```

## 🛠️ Local Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Theubaa/Music-detailer.git
   cd Music-detailer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to see the test interface.

## 🌐 Testing the API

### Using the Web Interface
1. Go to `http://localhost:3000`
2. Select an audio file
3. Click "Analyze Audio"
4. View the results

### Using Postman
1. **Method:** `POST`
2. **URL:** `http://localhost:3000/api/analyze`
3. **Body:** `form-data`
4. **Key:** `audio` (Type: File)
5. **Value:** Select your audio file

### Using curl
```bash
curl -X POST \
  -F "audio=@your-audio-file.mp3" \
  http://localhost:3000/api/analyze
```

### Using JavaScript
```javascript
const formData = new FormData();
formData.append('audio', audioFile);

const response = await fetch('/api/analyze', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
console.log(result);
```

## 🚀 Deployment on Vercel

### Automatic Deployment
1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

2. **Your API will be available at:**
   ```
   https://your-app-name.vercel.app/api/analyze
   ```

### Manual Deployment
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

## 📁 Project Structure

```
├── pages/
│   ├── api/
│   │   └── analyze.js          # API endpoint
│   └── index.js                # Test interface
├── package.json                # Dependencies
├── vercel.json                 # Vercel configuration
└── README.md                   # This file
```

## 🔧 Configuration

### File Upload Limits
- **Maximum file size:** 50MB
- **Supported formats:** MP3, WAV, M4A, AAC, OGG, FLAC
- **Key name:** Must be exactly `audio`

### Error Codes
- **400**: Invalid request (no file, wrong file type)
- **405**: Method not allowed (only POST supported)
- **413**: File too large (max 50MB)
- **500**: Internal server error

## 🔮 Next Steps

### For Production Use
1. **Implement real audio analysis:** Replace the mock `extractFeaturesFromFile` function
2. **Add authentication:** Implement API keys or user authentication
3. **Add rate limiting:** Consider adding rate limiting for production
4. **Add caching:** Implement caching for repeated analysis requests
5. **Add validation:** Add more sophisticated file validation

### Audio Analysis Integration
The `extractFeaturesFromFile(filepath)` function in `/pages/api/analyze.js` is where you'll implement your actual audio analysis logic. Currently, it returns mock data.

## 🛡️ Security Features

- **File type validation:** Only accepts audio files
- **File size limits:** Prevents large file uploads
- **Temporary file cleanup:** Automatic cleanup after processing
- **Error handling:** Comprehensive error handling and logging

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues:
1. Check the console logs for detailed error messages
2. Verify your file format and size
3. Ensure you're using the correct API endpoint
4. Check the network tab for request/response details

---

**Ready for deployment!** 🚀

Your API is now live and ready to accept audio file uploads for mood analysis.
