import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./util/firebase";

function ImageList() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesCol = collection(db, "images"); 
                const snapshot = await getDocs(imagesCol);
                const imageList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setImages(imageList);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div>
            <h2>Uploaded Images</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {images.map((img) => (
                    <div key={img.id} style={{ border: "1px solid #ccc", padding: "5px" }}>
                        <img
                            src={img.image}  
                            alt="Uploaded"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                        <p>{new Date(img.date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageList;
