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

app.use(cors());
app.use(express.json());

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

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

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter 
});

app.post(
  '/api/upload',
  (req, res, next) => {
    upload.fields([
      { name: 'aadhaar', maxCount: 1 },
      { name: 'pan', maxCount: 1 }
    ])(req, res, function (err) {
      if (err instanceof multer.MulterError || err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  (req, res) => {
    const aadhaar = req.files?.['aadhaar']?.[0];
    const pan = req.files?.['pan']?.[0];
    const empId = req.body.employeeId || req.query.employeeId;

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

app.get('/file/:id/:type', verifyToken, (req, res) => {
  const { id, type } = req.params;
  const dirPath = path.join(__dirname, '..', 'uploads', id);

  fs.readdir(dirPath, (err, files) => {
    if (err) return res.status(404).json({ error: 'Directory not found' });

    const matchingFile = files.find(file => file.startsWith(type + '.'));
    if (!matchingFile) return res.status(404).json({ error: 'File not found' });

    const filePath = path.join(dirPath, matchingFile);
    res.sendFile(filePath);
  });
});

app.listen(port, () => {
  console.log(`📂 File upload server running at http://localhost:${port}`);
});
