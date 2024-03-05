// // // backend fileupload implement
// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const app = express();
// app.use(cors());

// var upload = multer({ dest: "../../public/uploads/" });

// app.post("/upload", upload.single("file"), async (req, res) => {
//   console.log("Here is server...");
//   try {
//     if (req.file) {
//       // console.log("\nServer has received the file...");
//       res.send({
//         status: true,
//         message: "File Uploaded!",
//       });
//     } else {
//       res.status(400).send({
//         status: false,
//         data: "File Not Found :(",
//       });
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.listen(5000, () => console.log("Server Running..."));
