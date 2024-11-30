import express from 'express';
import multer from 'multer';
import { huffmanEncode, huffmanDecode } from '../controller/huffman.js';

const router = express.Router();

// Use memory storage for multer to keep file in memory and access buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to validate file type
const validateFileType = (req, res, next) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    // Check if the file is a text file based on mime type
    if (!file.mimetype.startsWith('text/')) {
        return res.status(400).json({ error: 'Only text files are allowed.' });
    }
    next();
};

// Route to handle compression
router.post('/compress', upload.single('file'), validateFileType, (req, res) => {
    try {
        // Access the file buffer
        const text = req.file.buffer.toString('utf-8');
        const { encoded, codeMap, tree } = huffmanEncode(text);
        res.json({ encoded, codeMap, tree });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error during file processing.' });
    }
});

// Route to handle decompression
router.post('/decompress', (req, res) => {
    const { encoded, tree } = req.body;
    try {
        const decoded = huffmanDecode(encoded, tree);
        res.json({ decoded });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error during decompression.' });
    }
});

export default router;
