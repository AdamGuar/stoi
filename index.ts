import { ImgProcessor } from './modules/img/ImgProcessor';
import { TextProcessing } from './modules/text/TextProcessing';
import { KeyGeneratorRunner } from './runners/KeyGenerationRunner';
import { InputParameters } from './runners/models/InputParameters';

async function main() {
    const imgProcessor = new ImgProcessor();
    try {
        await imgProcessor.loadImage('./resources/cat.jpg');
        const cat = imgProcessor.getImg();
        const bytesFromText = TextProcessing.toByteArray('to jest kot');
        imgProcessor.addArrayToCanvas(bytesFromText);
        imgProcessor.saveCanvas();
    } catch (error) {
        console.log(error);
    }

    const imgProcessorReader = new ImgProcessor();
    try {
        await imgProcessorReader.loadImage('./imagesOutput/test.png');
        const buffer = Buffer.from(imgProcessorReader.readByteArrayFromCanvas());
        console.log(buffer.toString());
    } catch (error) {
        console.log(error);
    }

    let inputParameters = new InputParameters();
    inputParameters.boundary = '250x250';
    inputParameters.publicKeyOut = './out/p_key.json';

    const keyGeneratorRunner = new KeyGeneratorRunner();
    keyGeneratorRunner.run(inputParameters);
   
}

main();