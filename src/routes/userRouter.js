const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'profileImage') {
      cb(null, 'uploads/profiles');
    } else if (file.fieldname === 'productImage') {
      cb(null, 'uploads/products');
    } else {
      cb(null, 'uploads/documents');
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });



const userSchema = new mongoose.Schema({
  // Otros campos existentes
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: Date,
});

const User = mongoose.model('User', userSchema);

userRouter.put('/premium/:uid', (req, res) => {
  const user = []
  const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];

  const documentsUploaded = user.documents.map((doc) => doc.name);
  const documentsMissing = requiredDocuments.filter((doc) => !documentsUploaded.includes(doc));

  if (documentsMissing.length > 0) {
    return res.status(400).json({ error: 'El usuario no ha terminado de cargar su documentación.' });
  }

  user.isPremium = true;
  user.last_connection = new Date();
});

userRouter.post('/:uid/documents', upload.single('document'), (req, res) => {
  
});
