import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./util/firebase";
import ImageUpload from "./image";
import { useNavigate } from "react-router-dom";
import "./description.css";

function Desc(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate(); 

  const handleImageChange = (img) => setImage(img);

  const handlePost = async () => {
    if (!title || !description) {
      alert("Title and description are required!");
      return;
    }

    try {
      await addDoc(collection(db, "questions"), {
        title,
        description,
        tags,
        image,
        date: new Date().toISOString(),
      });

      alert("Question posted successfully!");

     
      setTitle("");
      setDescription("");
      setTags("");
      setImage(null);

     
      navigate("/post");
    } catch (err) {
      console.error("Error posting question:", err);
      alert("Failed to post question!");
    }
  };

  return (
    <div className="post-section">
      <div className="description-container">

        <div className="column">
          <p>Title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter question title"
          />
        </div>

        <div className="row">
          <p>Image</p>
          <ImageUpload onImageChange={handleImageChange} />
        </div>

        <div className="column">
          <p>Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter question description"
          ></textarea>
        </div>

        <div className="column">
          <p>Tags</p>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags"
          />
        </div>

        <button onClick={handlePost}>Post</button>
      </div>
    </div>
  );
}

export default Desc;
