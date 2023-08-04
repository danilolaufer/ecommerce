// const multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "public"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// export const uploader = multer({ storage });

// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
const { fileURLToPath } = require('url');
const { dirname } = require('path');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

module.exports = {
  __dirname
};
