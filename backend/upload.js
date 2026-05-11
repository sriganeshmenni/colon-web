const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const Grid = require('gridfs-stream');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const uri = process.env.MONGO_URI;
const conn = mongoose.createConnection(uri);

let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log("MongoDB connection open and GridFS is ready for upload.");
    uploadFile();
});

const uploadFile = () => {
    const filePath = process.argv[2];
    const platform = process.argv[3];

    if (!filePath || !platform) {
        console.error('Please provide a file path and a platform (windows, mac, or linux).');
        console.error('Usage: node upload.js <path/to/file> <platform>');
        conn.close();
        return;
    }

    const fileName = path.basename(filePath);
    const writestream = gfs.createWriteStream({
        filename: fileName,
        metadata: { platform: platform }
    });

    fs.createReadStream(filePath)
        .pipe(writestream)
        .on('close', (file) => {
            console.log(`File '${fileName}' for platform '${platform}' uploaded successfully.`);
            conn.close();
        })
        .on('error', (err) => {
            console.error('Error uploading file:', err);
            conn.close();
        });
};
