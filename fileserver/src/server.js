require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const empId = req.body.employeeId || req.query.employeeId;

    if (!empId) {
      return cb(new Error('Missing employeeId in form data'));
    }

    const safeId = empId.toString().replace(/[^a-zA-Z0-9_-]/g, '_');
    const dir = path.join(__dirname, '..', 'uploads', safeId);

    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) return cb(err);
      cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}${ext}`);
  }
});

const upload = multer({ storage });

// Route: File Upload
app.post(
  '/api/upload',
  upload.fields([
    { name: 'aadhaar', maxCount: 1 },
    { name: 'pan', maxCount: 1 }
  ]),
  (req, res) => {
    const aadhaar = req.files?.['aadhaar']?.[0];
    const pan = req.files?.['pan']?.[0];
    const empId = req.body.employeeId || req.query.employeeId;

    // Validation
    if (!empId) {
      return res.status(400).json({
        success: false,
        message: 'Missing employeeId in form data or query',
      });
    }

    if (!aadhaar || !pan) {
      return res.status(400).json({
        success: false,
        message: 'Both Aadhaar and PAN files are required',
      });
    }

    return res.json({
      success: true,
      message: 'Files uploaded successfully',
      files: {
        aadhaar: aadhaar.path,
        pan: pan.path
      }
    });
  }
);

//Route: File Download
app.get('/file/:id/:type', verifyToken, (req, res) => {
  const { id, type } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', id, `${type}.pdf`);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'File not found' });
    }
  });
});


// Start server
app.listen(port, () => {
  console.log(`📂 File upload server running at http://localhost:${port}`);
});
