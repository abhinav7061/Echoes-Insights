const fs = require('fs');

exports.renameFileUploadedByMulter = async (originalname, path) => {
    try {
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const pathSplit = path.split('/');
        const fileName = `${pathSplit[pathSplit.length - 1]}.${ext}`
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        return fileName;
    } catch (error) {
        throw new Error(error);
    }
}