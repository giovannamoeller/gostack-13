import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvider from "../models/IStorageProvider";

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadFolder, file)
        ) // altera o caminho que o arquivo está indo
        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadFolder, file);

        try {
            await fs.promises.stat(filePath); // encontrou o arquivo
        } catch(err) {
            return;
        }
        await fs.promises.unlink(filePath);
    }
}

export default DiskStorageProvider;