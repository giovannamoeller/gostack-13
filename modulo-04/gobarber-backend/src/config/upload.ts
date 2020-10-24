import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto'; // gerar hashs

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
    driver: 's3' | 'disk';
    multer: {
        storage: StorageEngine;
    }
    config: {
        disk: {},
        aws: {
            bucket: string;
        },
    },
    uploadFolder: string;
    tmpFolder: string;
}

export default {
    driver: process.env.STORAGE_DRIVER,

    tmpFolder: tmpFolder,
    uploadFolder: path.resolve(tmpFolder, 'uploads'),

    multer: {
        storage: multer.diskStorage({ // disk da máquina
            destination: tmpFolder,
            filename(req, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex'); // gera 10bytes de texto aleatório 
                const fileName = `${fileHash}-${file.originalname}`;
    
                return callback(null, fileName);
            },
        }),
    },
    config: {
        disk: {},
        aws: {
            bucket: 'nome-bucket'
        },
    }

} as IUploadConfig;