import { RunDetails, Status } from './models/RunDetails'
import { InputParameters } from './models/InputParameters'
import { readFileSync } from 'fs';
import { Encryption } from '../services/encryption';
import { ApplicationRunner } from './ApplicationRunner';
import { TextProcessing } from '../services/text/TextProcessing';
import { ImgProcessor } from '../services/img/ImgProcessor';
import { PublicKey } from './models/PublicKey';


const REQUIRED_PARAMETERS = {
    keyPath: (param) => {
        try {
            readFileSync(param).toString();
            return true;
        } catch (error) {
            return false
        }
    },
    imagePath: (param) => {
        try {
            readFileSync(param).toString();
            return true;
        } catch (error) {
            return false
        }
    },
    secret: (param) => {
        return param;
    },
    text: (param) => {
        return param && param.length <= 280;
    }
}

class HideRunner implements ApplicationRunner {
    private encryption: Encryption;

    constructor(encryption: Encryption) {
        this.encryption = encryption;
    }

    private validateParams(inputParameters: InputParameters): string[] {
        const invalidParams = [];
        Object.keys(REQUIRED_PARAMETERS).forEach(element => {
            const param = inputParameters[element];
            const isValid = REQUIRED_PARAMETERS[element](param);
            if(!isValid) {
                invalidParams.push(element);
            }
        });
        return invalidParams;
    }

    async run(inputParameters: InputParameters): Promise<RunDetails> {

        const invalidParams = this.validateParams(inputParameters);

        if(invalidParams.length > 0) {
            return new RunDetails(Status.Fail, `Some of parameters for current mode are either missing on ivalid, please verify following parameters: [${invalidParams.join(';')}]`);
        }

        try {
            const keyString = readFileSync(inputParameters.keyPath).toString();
            const decryptedKey: PublicKey = JSON.parse(this.encryption.decrypt(keyString, inputParameters.secret));
            const stringToHide = this.encryption.encrypt(inputParameters.text, decryptedKey.encryptionKey);

            const byteArrayToHide = TextProcessing.toByteArray(stringToHide);
            const imgProcessor = new ImgProcessor();

            await imgProcessor.loadImage(inputParameters.imagePath);
            imgProcessor.addArrayToCanvas(byteArrayToHide, decryptedKey.pixelPostions);

            const encryptedImagePath = inputParameters.imageOutPath || './encrypted.png'
            const encryptedImagePathPng = this.sanitizePathToPng(encryptedImagePath);

            await imgProcessor.saveImage(encryptedImagePathPng);
            return new RunDetails(Status.Ok, `Text encrypted and save to ${encryptedImagePathPng}`);

        } catch (error) {
            return new RunDetails(Status.Fail, error);
        }
    };

    private sanitizePathToPng(path: string): string {
        const splitted = path.split(".");
        splitted[splitted.length - 1] = "png";

        return splitted.join(".");
    }
}

export { HideRunner }