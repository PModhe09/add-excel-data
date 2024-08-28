const express = require('express');
const { uploadCandidates } = require('../controllers/uploadSheet');
const multer = require('multer');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), uploadCandidates);

module.exports = router;