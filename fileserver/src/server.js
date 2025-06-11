const express = require('express');
const app = express();

const port = process.env.PORT || 3001;

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage })

app.post('/api/upload/', upload.single('file'), (req, res) => {
  res.send('bich');
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})
