const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const methodOverride = require('method-override');
const Grid = require('gridfs-stream');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

const uri = process.env.MONGO_URI;
const conn = mongoose.createConnection(uri);

let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log("MongoDB connection open and GridFS is ready.");
});

const storage = new GridFsStorage({
    db: conn,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileInfo = {
                filename: file.originalname,
                bucketName: 'uploads',
                metadata: {
                    platform: req.body.platform
                }
            };
            resolve(fileInfo);
        });
    }
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

app.get('/download/:platform', (req, res) => {
    gfs.files.findOne({ 'metadata.platform': req.params.platform }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


