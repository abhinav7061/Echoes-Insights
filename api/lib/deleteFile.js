const fs = require('fs');

exports.deleteFile = async (path, fileName) => {
    try {
        // Delete each matching file
        fs.unlinkSync(`${path}/${fileName}`);
    } catch (error) {
        console.log({ 'Error while deleting file': error });
        throw new Error(error);
    }
}