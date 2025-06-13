const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

const port = process.env.PORT || 3001;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const empId =  req.body.employeeId;
    
    const empDir = path.join(__dirname, '..', 'uploads', empId);

    fs.mkdir(empDir, {recursive: true}, (err) => {
      if(err) return cb(err);
      cb(null, empDir);
    })
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + ext);
  }
})

const upload = multer({ storage: storage })

app.post('/api/upload/', upload.single('adhaar'), (req, res) => {
  res.json({
    path: req.file.path
  });
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
