import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Disable default body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to extract features from audio file (placeholder - you'll implement this)
async function extractFeaturesFromFile(filepath) {
  // TODO: Implement your audio analysis logic here
  // This is where you'll integrate with your audio processing libraries
  // For now, returning a mock response
  return {
    mood_happy: Math.random(),
    mood_sad: Math.random(),
    mood_relaxed: Math.random(),
    mood_aggressive: Math.random(),
    danceability: Math.random(),
    bpm: Math.floor(Math.random() * 180) + 60,
    key: 'C',
    scale: 'major'
  };
}

// Helper function to clean up temporary files
function cleanupTempFile(filepath) {
  try {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  } catch (error) {
    console.error('Error cleaning up temp file:', error);
  }
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed. Only POST requests are supported.' 
    });
  }

  try {
    // Parse the incoming form data
    const form = formidable({
      maxFileSize: 50 * 1024 * 1024, // 50MB limit
      allowEmptyFiles: false,
      // Remove the filter to accept all files for now
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Formidable parsing error:', err);
          reject(err);
        } else {
          console.log('Parsed files:', files);
          console.log('Parsed fields:', fields);
          resolve([fields, files]);
        }
      });
    });

    // Check if audio file was uploaded
    if (!files.audio || !files.audio[0]) {
      return res.status(400).json({ 
        error: 'No audio file provided. Please upload an MP3 file under the key "audio".' 
      });
    }

    const audioFile = files.audio[0];
    
    // Validate file type - be more lenient
    console.log('Audio file details:', {
      mimetype: audioFile.mimetype,
      originalName: audioFile.originalFilename,
      size: audioFile.size
    });
    
    // Check if it's an audio file by extension or mimetype
    const isAudioFile = audioFile.mimetype && audioFile.mimetype.includes('audio') ||
                       audioFile.originalFilename && /\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(audioFile.originalFilename);
    
    if (!isAudioFile) {
      return res.status(400).json({ 
        error: 'Invalid file type. Please upload an audio file (MP3, WAV, etc.).' 
      });
    }

    // Create temporary file path
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `audio_${Date.now()}_${audioFile.originalFilename}`);

    try {
      // Copy the uploaded file to a temporary location
      fs.copyFileSync(audioFile.filepath, tempFilePath);

      // Extract features from the audio file
      const analysisResult = await extractFeaturesFromFile(tempFilePath);

      // Return the analysis results
      return res.status(200).json({
        success: true,
        message: 'Audio analysis completed successfully',
        data: analysisResult,
        fileInfo: {
          originalName: audioFile.originalFilename,
          size: audioFile.size,
          mimetype: audioFile.mimetype
        }
      });

    } catch (analysisError) {
      console.error('Error during audio analysis:', analysisError);
      return res.status(500).json({ 
        error: 'Failed to analyze audio file. Please try again.' 
      });
    } finally {
      // Clean up temporary files
      cleanupTempFile(tempFilePath);
      cleanupTempFile(audioFile.filepath);
    }

  } catch (error) {
    console.error('Error processing request:', error);
    
    if (error.message.includes('maxFileSize')) {
      return res.status(413).json({ 
        error: 'File too large. Maximum file size is 50MB.' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error. Please try again.' 
    });
  }
}
