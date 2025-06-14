const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const multerMiddleware = (name) => upload.single(name);

module.exports = multerMiddleware;