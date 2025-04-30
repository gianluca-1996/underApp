import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

import "./style.css";

const NuevoPost = ({addPost}) => {
  const [postContent, setPostContent] = useState('');

  const handleChange = (e) => { setPostContent(e.target.value) };

  const handleAddPost = async () => { 
    setPostContent('');
    await addPost(postContent);
  };

  return (
    <div className="new-post-container">
      
      <TextField
        variant="filled"
        placeholder="Expresate con la comunidad..."
        value={postContent}
        onChange={handleChange}
        multiline
        rows={2}
        fullWidth
        InputProps={{
            style: {
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
            },
          }}
        className="new-post-input"
      />

      <Button
        variant="contained"
        onClick={handleAddPost}
        fullWidth
        className="new-post-button"
      >
        PUBLICAR
      </Button>
    </div>
  );
};

export default NuevoPost;