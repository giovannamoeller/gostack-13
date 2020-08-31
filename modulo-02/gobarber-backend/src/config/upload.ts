import multer from 'multer';
import path from 'path';
import crypto from 'crypto'; // gerar hashs

export default {
    storage: multer.diskStorage({ // disk da máquina
        destination: path.resolve(__dirname, '..', '..', 'tmp'),
        filename(req, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex'); // gera 10bytes de texto aleatório 
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};