# Audio Mood Analysis API

A Next.js API route for analyzing audio files and extracting mood-related features.

## Features

- Accepts MP3 and other audio file uploads via form-data
- Uses formidable for robust file parsing
- Temporary file handling with automatic cleanup
- Comprehensive error handling
- Ready for integration with audio analysis libraries

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000` to see the test interface.

## API Usage

### Endpoint
`POST /api/analyze`

### Request Format
Send a POST request with form-data containing an audio file under the key `audio`.

### Example with curl
```bash
curl -X POST \
  -F "audio=@your-audio-file.mp3" \
  http://localhost:3000/api/analyze
```

### Example with JavaScript
```javascript
const formData = new FormData();
formData.append('audio', audioFile);

const response = await fetch('/api/analyze', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
```

### Response Format

**Success (200):**
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

**Error (400/405/413/500):**
```json
{
  "error": "Error message describing the issue"
}
```

## Error Codes

- **400**: Invalid request (no file, wrong file type)
- **405**: Method not allowed (only POST supported)
- **413**: File too large (max 50MB)
- **500**: Internal server error

## Implementation Notes

### File Processing
- Files are temporarily saved to the system's temp directory
- Automatic cleanup ensures no disk space leaks
- Supports various audio formats (MP3, WAV, etc.)

### Security
- File size limit: 50MB
- File type validation for audio files only
- Temporary file cleanup on completion or error

### Customization
The `extractFeaturesFromFile(filepath)` function in `/pages/api/analyze.js` is where you'll implement your actual audio analysis logic. Currently, it returns mock data.

## Deployment on Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and deploy
   - Your API will be available at `https://your-app.vercel.app/api/analyze`

## File Structure

```
├── pages/
│   ├── api/
│   │   └── analyze.js          # API route
│   └── index.js                # Test interface
├── package.json                # Dependencies
└── README.md                   # This file
```

## Next Steps

1. **Implement audio analysis:** Replace the mock `extractFeaturesFromFile` function with your actual audio processing logic
2. **Add authentication:** Implement API keys or user authentication if needed
3. **Add rate limiting:** Consider adding rate limiting for production use
4. **Add caching:** Implement caching for repeated analysis requests
5. **Add validation:** Add more sophisticated file validation if needed

## Dependencies

- **Next.js**: React framework for API routes
- **formidable**: File upload parsing
- **fs**: File system operations
- **path**: Path utilities
- **os**: Operating system utilities
