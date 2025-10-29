import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './util/firebase';
import './VideoGallery.css';

export default function VideoGallery() {
  const [file, setFile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'videos'));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setVideos(data);
    });
    return () => unsub();
  }, []);

  async function handleUpload() {
    if (!file) return alert('Please select a video file first.');

    const cloudName = 'deddsnvxw';
    const uploadPreset = 'devdeakin';

    if (!cloudName || !uploadPreset) {
      alert('⚠️ Cloudinary not configured. Please set REACT_APP_CLOUDINARY_CLOUD_NAME and REACT_APP_CLOUDINARY_UPLOAD_PRESET in your .env file.');
      return;
    }

    try {
      setUploading(true);

      const form = new FormData();
      form.append('file', file);
      form.append('upload_preset', uploadPreset);

      console.log('Uploading to Cloudinary...');
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
        method: 'POST',
        body: form,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Cloudinary upload failed: ${errText}`);
      }

      const data = await res.json();
      console.log('✅ Upload successful:', data);

      await addDoc(collection(db, 'videos'), {
        url: data.secure_url,
        views: 0,
        rating: 0,
        createdAt: new Date(),
      });

      setFile(null);
      alert('✅ Video uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      alert('❌ Upload failed. Check console for details.');
    } finally {
      setUploading(false);
    }
  }

  async function incrementView(id, current) {
    try {
      const docRef = doc(db, 'videos', id);
      await updateDoc(docRef, { views: current + 1 });
    } catch (err) {
      console.error('Error updating views:', err);
    }
  }

  return (
    <div className="videogallery-container">
      <div className="videogallery-upload">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="videogallery-btn"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </div>

      <div className="videogallery-list">
        <h4>Uploaded Videos</h4>
        {videos.length === 0 && <p>No videos uploaded yet.</p>}
        {videos.map((v) => (
          <div key={v.id} className="videogallery-item">
            <video
              width={320}
              controls
              src={v.url}
              onPlay={() => incrementView(v.id, v.views || 0)}
            />
            <div className="videogallery-info">
              Views: {v.views || 0} • Rating: {v.rating || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
