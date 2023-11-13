import React, { useState } from 'react';

const ImageUpload = (props) => { 
  const [file, setFile] = useState(null);
  const [maxSize, setMaxSize] = useState(100000)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (props.maxSize) setMaxSize(props.maxSize);
    
    if (!selectedFile) {
        props.onUpload(selectedFile);
        setFile(selectedFile);
    }
    else {
        if (selectedFile.size <= maxSize) {
            props.onUpload(selectedFile);
            setFile(selectedFile);
        } else {
            alert(`File size exceeds the maximum allowed size of ${maxSize} bytes.`);
        }
    }
  }

  return (
    <input type="file" files={[file]} className={props.className} id={props.id} onChange={(event) => handleFileChange(event)} />
  );

};

export default ImageUpload;