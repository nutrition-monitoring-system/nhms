//E:\projects\my nhms branch\file-upload

import React, { useState, useEffect } from 'react';
import axios from "axios";

function FileUpload(){
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
		console.log(file);
	if (file) {
		const formData = new FormData();
		formData.append('file', file);
		// Post formData to the server
		axios({
			method: "POST",
			url: "http://localhost:3000/fileUpload",
			data: formData,
		 }).then((res) => {       
			  alert(res.data.message);
		 });
	}
	}, [file]);

	return (
		<form>
		<input id="fileInput" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
		<label htmlFor="fileInput">
			<img src="path_to_your_clickable_image.jpg" alt="Clickable" />
		</label>
		{previewUrl && <img src={previewUrl} alt="Preview" />}
		</form>
	 );
}

export default FileUpload;