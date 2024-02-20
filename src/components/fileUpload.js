//E:\projects\my nhms branch\file-upload

import React, { useState, useEffect } from 'react';
import axios from "axios";

function FileUpload({identifier}){
	//image selection, preview, and automatic submission
	const [file, setFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);

	const handleFileChange = (e) => {
	e.preventDefault(); 
	const newFile = e.target.files[0];
	setFile(newFile);
	setPreviewUrl(URL.createObjectURL(newFile));
	};

	useEffect(() => {
	if (file) {
		const formData = new FormData();
		formData.append('file', file);
		// Post formData to the server
		axios({
			method: "POST",
			url: "http://localhost:5000/upload",
			data: formData,
		 }).then((res) => {       
			  alert(res.data.message);
		 });
		 console.log("\nThe file uploading works...");
	}
	}, [file]);

	return (
		<form>
			<input id={`fileInput ${identifier}`} accept=".jpg, .png, .gif, .jpeg" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
			<label htmlFor={`fileInput ${identifier}`}>
				<img src="path_to_your_clickable_image.jpg" alt="Clickable" />
			</label>
			{previewUrl && <img src={previewUrl} alt="Preview" />}
		</form>
	);
}

export default FileUpload;