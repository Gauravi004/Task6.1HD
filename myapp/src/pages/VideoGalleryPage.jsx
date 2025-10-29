import VideoGallery from "../VideoGallery";
import "./VideoGalleryPage.css";

export default function VideoGalleryPage() {
  return (
    <div className="feature-wrapper">
      <h1 className="feature-title">🎬 Tutorial Video Gallery</h1>
      <p className="feature-subtitle">Upload and explore tutorial videos seamlessly.</p>
      <VideoGallery />
    </div>
  );
}
