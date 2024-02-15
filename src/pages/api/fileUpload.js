import multer from "multer";

const upload = multer({dest:"../../public/uploads/"});

export default async function handler(req, res) { 
	try{
		upload.single("file");
		console.log(req.file);
		if(req.file){
			res.send({
				status:true,
				message:"File Uploaded!",
			});
		}else{
			res.status(400).send({
				status:false,
				data:"File Not Found:(",
			});
		}
	}catch(err){
		res.status(500).send(err);
	}

}