import { RunDetails, Status } from './models/RunDetails'
import { InputParameters, Mode } from './models/InputParameters'
import { readFileSync } from 'fs';
import { Encryption } from '../encryption';
import { ApplicationRunner } from './ApplicationRunner';
import { TextProcessing } from '../text/TextProcessing';
import { ImgProcessor } from '../img/ImgProcessor';
import { PublicKey } from './models/PublicKey';

import { writeFileSync } from 'fs';


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
    }
}

class FindRunner implements ApplicationRunner {
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
            const imgProcessor = new ImgProcessor();

            await imgProcessor.loadImage(inputParameters.imagePath);
            
            const bytesFromImg = imgProcessor.readByteArrayFromCanvas(decryptedKey.pixelPostions);
            const encryptedText = TextProcessing.getStringFromByteArray(bytesFromImg);

            const decryptedText = this.encryption.decrypt(encryptedText, decryptedKey.encryptionKey);

            if(inputParameters.textOut) {
                writeFileSync(inputParameters.textOut, decryptedText);
            }

            return new RunDetails(Status.Ok, `Text decrypted from image: ${decryptedText}`);

        } catch (error) {
            return new RunDetails(Status.Fail, error);
        }


    };
}

export { FindRunner }