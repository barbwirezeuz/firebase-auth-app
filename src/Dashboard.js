import React, { useState, useEffect } from "react";
import p1 from "./images/p1.jpg";
import p2 from "./images/p2.jpg";
import p3 from "./images/p3.jpg";
import p4 from "./images/p4.jpg";
import p5 from "./images/p5.jpg";
import p6 from "./images/p6.jpg";
import p7 from "./images/p7.jpg";
import p8 from "./images/p8.jpg";
import "./dashboard.css";

const imageList = [
  { id: "p1", src: p1, tags: ["Tiger"] },
  { id: "p2", src: p2, tags: ["Lion"] },
  { id: "p3", src: p3, tags: ["Baby Leopard"] },
  { id: "p4", src: p4, tags: ["Elephant"] },
  { id: "p5", src: p5, tags: ["Leopard"] },
  { id: "p6", src: p6, tags: ["Giraffe"] },
  { id: "p7", src: p7, tags: ["Wolf"] },
  { id: "p8", src: p8, tags: ["Zebra"] },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState(imageList);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const filteredImages = images.filter((image) =>
    image.tags.some((tag) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("imageId", id);
  };

  const handleDrop = (e, targetId) => {
    const sourceId = e.dataTransfer.getData("imageId");
    const newImages = [...images];
    const sourceIndex = newImages.findIndex((img) => img.id === sourceId);
    const targetIndex = newImages.findIndex((img) => img.id === targetId);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const [movedImage] = newImages.splice(sourceIndex, 1);
      newImages.splice(targetIndex, 0, movedImage);
      setImages(newImages);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search Animal Names"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="image-grid">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="image-container"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, image.id)}
              onDragOver={(e) => allowDrop(e)}
              onDrop={(e) => handleDrop(e, image.id)}
            >
              <img
                src={image.src}
                alt={`Image ${index + 1}`}
                className="image"
              />
              <div className="tags">
                {image.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="footer">
        <h1>Created by ENIN using React</h1>
      </footer>
    </div>
  );
};

export default Dashboard;
