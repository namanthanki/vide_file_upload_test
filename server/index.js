const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

app.post(
    "/upload",
    upload.fields([
        { name: "images" },
        { name: "videos" },
    ]),
    (req, res) => {
        console.log(req.files);
        res.send("Files uploaded successfully");
    }
);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
