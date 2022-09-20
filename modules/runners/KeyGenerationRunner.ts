import { RunDetails, Status } from './models/RunDetails'
import { InputParameters, Mode } from './models/InputParameters'
import randomstring from 'randomstring'
import { PixelPosition, PublicKey } from './models/PublicKey';
import { writeFileSync } from 'fs';
import { Encryption } from '../services/encryption';
import { ApplicationRunner } from './ApplicationRunner'

const MAX_LENGTH = 280;
const REQUIRED_PARAMETERS = {
    boundary: (param) => {
        const result = new Array<number>(2);
        try {
            const splited = param.split('x');
            result[0] = parseInt(splited[0]);
            result[1] = parseInt(splited[1]);
            return true;
        } catch (error) {
            return false
        }
    },
    publicKeyOut: (param) => {
        return param;
    },
    secret: (param) => {
        return param;
    }
}

class KeyGeneratorRunner implements ApplicationRunner {
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
            const boundary = this.getBoundary(inputParameters.boundary);
            const maxLength = this.getMaxLengthForEncrypted(inputParameters.secret);

            const positions = new Map();

            while (positions.size < maxLength) {
                const pixelPosition: PixelPosition = {
                    x: this.getRandomInt(boundary[0]),
                    y: this.getRandomInt(boundary[1]),
                    value: 0,
                    rgbIndex: this.getRandomInt(2)
                }
                positions.set(`${pixelPosition.x}x${pixelPosition.y}`, pixelPosition);
            }

            const result = Array.from(positions).map(el => {
                const parsed: PixelPosition = el[1];
                return parsed;
            });

            const publicKey = new PublicKey(result, randomstring.generate());
            const publicKeyString = this.encryption.encrypt(JSON.stringify(publicKey), inputParameters.secret);
            writeFileSync(inputParameters.publicKeyOut, publicKeyString);

            return new RunDetails(Status.Ok, `Key generated, saved to location ${inputParameters.publicKeyOut}`);

        } catch (error) {
            return new RunDetails(Status.Fail, error);
        }


    };

    private getBoundary(boundaryParam: string): number[] {
        const result = new Array<number>(2);
        try {
            const splited = boundaryParam.split('x');
            result[0] = parseInt(splited[0]);
            result[1] = parseInt(splited[1]);
        } catch (error) {
            throw 'Unable to parse boundary parameter, please check boundary parameter'
        }
        return result;
    }

    private getRandomInt(max): number {
        return Math.floor(Math.random() * max);
    }

    private getMaxLengthForEncrypted(secret): number {
        const randomWihtLength = randomstring.generate({
            length: MAX_LENGTH
          });
        const encryptedRandom = this.encryption.encrypt(randomWihtLength, secret);
        return encryptedRandom.length;
    }
}

export { KeyGeneratorRunner }