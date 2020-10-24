import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import uploadConfig from '@config/upload';
import IStorageProvider from "../models/IStorageProvider";

class S3StorageProvider implements IStorageProvider {
    private client: S3;
    constructor() {
        this.client = new aws.S3({
            region: 'us-east-1',
        });
    }
    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.tmpFolder, file); // Preciso pegar o arquivo dentro de tpm para subir p/ AWS
        const ContentType = mime.getType(originalPath);

        if(!ContentType) throw new Error('File not found');

        const fileContent = fs.promises.readFile(originalPath);

        await this.client.putObject({
            Bucket: uploadConfig.config.aws.bucket,
            Key: file, // nome do arquivo
            ACL: 'public-read', // quais as permissões para o arquivo (abertura seja pública)
            Body: fileContent,
            ContentType,
            ContentDisposition: `inline; filename=${file}` // conteúdo do arquivo
        }).promise(); // conseguimos aguardar com o await

        await fs.promises.unlink(originalPath); // remove localhost logo depois que sobe pro servidor

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: uploadConfig.config.aws.bucket,
            Key: file
        }).promise();
    }
}

export default S3StorageProvider;