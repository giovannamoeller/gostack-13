import multer from 'multer';
import path from 'path';
import crypto from 'crypto'; // gerar hashs

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    tmpFolder: tmpFolder,
    uploadFolder: path.resolve(tmpFolder, 'uploads'),

    storage: multer.diskStorage({ // disk da máquina
        destination: tmpFolder,
        filename(req, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex'); // gera 10bytes de texto aleatório 
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};