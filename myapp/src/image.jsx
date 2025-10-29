import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./util/firebase";
import "./Image.css";

function ImageUpload({ onImageChange }) {
  const [fileName, setFileName] = useState("");
  const [imageBlob, setImageBlob] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBlob(reader.result);
      if (onImageChange) onImageChange(reader.result); // send Base64 to parent
    };
    reader.readAsDataURL(file);
  };

  // Upload file separately
  const handleUpload = async () => {
    if (!imageBlob) {
      alert("Please select a file first!");
      return;
    }

    try {
      const imagesRef = collection(db, "images"); // separate 'images' collection
      await addDoc(imagesRef, {
        image: imageBlob,       // store Base64
        date: new Date().toISOString()
      });

      alert("Image uploaded successfully!");
      setFileName("");
      setImageBlob(null);
      if (onImageChange) onImageChange(null); // reset parent
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image!");
    }
  };

  return (
    <div className="image-upload-container">
      <input
        type="file"
        style={{ display: "none" }}
        id="hiddenFileInput"
        onChange={handleFileChange}
      />
      <input type="text" value={fileName} readOnly placeholder="No file chosen" />
      <button onClick={() => document.getElementById("hiddenFileInput").click()}>
        Browse
      </button>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUpload;
