import { RunDetails, Status } from './models/RunDetails'
import { InputParameters, Mode } from './models/InputParameters'
import randomstring from 'randomstring'
import { PixelPostion, PublicKey } from './models/PublicKey';
import { writeFileSync } from 'fs';

const MAX_LENGTH = 280;

class KeyGeneratorRunner implements KeyGeneratorRunner {
    shouldRun(inputParameters: InputParameters): boolean {
        return inputParameters.mode == Mode.keygen
    };
    run(inputParameters: InputParameters): RunDetails {

        try {
            const boundary = this.getBoundary(inputParameters.boundary);
            const maxLength = MAX_LENGTH;

            const positions = new Set<string>();

            while (positions.size < maxLength) {
                const pixelPosition = {
                    x: this.getRandomInt(boundary[0]),
                    y: this.getRandomInt(boundary[1]),
                    value: 0
                }
                positions.add(JSON.stringify(pixelPosition));
            }

            const result = Array.from(positions).map(el => {
                const parsed: PixelPostion = JSON.parse(el);
                return parsed;
            });

            const publicKey = new PublicKey(result, randomstring.generate());
            writeFileSync(inputParameters.publicKeyOut, JSON.stringify(publicKey));

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

    getRandomInt(max): number {
        return Math.floor(Math.random() * max);
    }
}

export { KeyGeneratorRunner }