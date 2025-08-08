# 🎵 Music Detailer - Audio Mood Analysis

A complete Next.js application that combines a beautiful frontend interface with a powerful backend API for audio mood analysis and music feature extraction.

## ✨ Features

### 🎨 **Beautiful Frontend**
- **Modern UI Design** - Stunning gradient backgrounds and glass-morphism effects
- **Audio Preview** - Listen to uploaded files before analysis
- **Real-time Results** - Beautiful progress bars and animated results
- **Responsive Design** - Works perfectly on desktop and mobile
- **Interactive Elements** - Hover effects and smooth transitions

### 🔧 **Powerful Backend API**
- **File Upload** - Accepts MP3, WAV, M4A, AAC, OGG, FLAC files
- **Formidable Integration** - Robust file parsing with automatic cleanup
- **Temporary File Handling** - Secure file processing
- **Comprehensive Error Handling** - Detailed error messages
- **Processing Time Tracking** - Performance monitoring

### 📊 **Analysis Results**
- **Mood Classification** - Happy, Sad, Relaxed, Aggressive
- **Music Features** - Danceability, BPM, Key detection
- **Visual Charts** - Progress bars and percentage displays
- **File Information** - Size, type, and processing details

## 🚀 Quick Start

### 1. **Clone the Repository**
```bash
git clone https://github.com/Theubaa/Music-detailer.git
cd Music-detailer
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Run Development Server**
```bash
npm run dev
```

### 4. **Open Your Browser**
Navigate to `http://localhost:3000`

## 🎯 How to Use

### **Frontend Interface**
1. **Upload Audio** - Click the upload area or drag & drop an audio file
2. **Preview Audio** - Listen to your file before analysis
3. **Analyze** - Click "Analyze Audio" to process your file
4. **View Results** - See detailed mood analysis and music features

### **API Usage**
Send a POST request to `/api/analyze` with form-data:

```bash
curl -X POST \
  -F "audio=@your-audio-file.mp3" \
  http://localhost:3000/api/analyze
```

**Response:**
```json
{
  "success": true,
  "message": "Audio analysis completed successfully",
  "mood_happy": 0.75,
  "mood_sad": 0.12,
  "mood_relaxed": 0.45,
  "mood_aggressive": 0.23,
  "danceability": 0.68,
  "bpm": 128,
  "key": "C",
  "scale": "major",
  "processingTime": 1250,
  "fileInfo": {
    "originalName": "song.mp3",
    "size": 2048576,
    "mimetype": "audio/mpeg"
  }
}
```

## 🛠️ Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes, Formidable
- **Styling**: Tailwind CSS with custom gradients
- **File Processing**: Node.js file system operations
- **Deployment**: Vercel-ready configuration

## 📁 Project Structure

```
Music-detailer/
├── pages/
│   ├── index.js          # Beautiful frontend interface
│   ├── _app.js           # App wrapper with global styles
│   └── api/
│       └── analyze.js    # Backend API endpoint
├── styles/
│   └── globals.css       # Tailwind CSS imports
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── vercel.json          # Vercel deployment config
└── README.md            # This file
```

## 🚀 Deployment

### **Vercel Deployment**
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with zero configuration

### **Environment Variables**
No environment variables required - the application works out of the box!

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### **Customization**
- **Styling**: Modify `tailwind.config.js` for theme changes
- **API Logic**: Update `pages/api/analyze.js` for custom analysis
- **Frontend**: Edit `pages/index.js` for UI changes

## 📊 API Endpoints

### `POST /api/analyze`
**Purpose**: Analyze uploaded audio files for mood and music features

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with key `audio` containing the audio file

**Response:**
- Success: `200 OK` with analysis results
- Error: `400/500` with error message

**File Limits:**
- Maximum size: 50MB
- Supported formats: MP3, WAV, M4A, AAC, OGG, FLAC

## 🎨 UI Features

- **Gradient Backgrounds** - Purple to blue gradients
- **Glass Morphism** - Translucent cards with backdrop blur
- **Progress Bars** - Animated mood and feature indicators
- **Responsive Grid** - Adapts to different screen sizes
- **Loading States** - Spinner animations during processing
- **Error Handling** - Beautiful error messages
- **Audio Preview** - Built-in audio player

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own applications!

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure your audio file is supported
3. Verify the file size is under 50MB
4. Check the network tab for API errors

---

**🎵 Music Detailer** - Where beautiful design meets powerful audio analysis!
