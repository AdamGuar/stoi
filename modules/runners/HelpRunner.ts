import { ApplicationRunner } from "./ApplicationRunner";
import { InputParameters } from "./models/InputParameters";
import { RunDetails, Status } from "./models/RunDetails";

const HELP_MESSAGE = `You started STOI - Secured Text Over Images

This tool allows to encode and hide string within pixel RGB values in images.

There are 3 modes of this program:

1. Mode keygen - generates public key used to encrypt and decrypt text from images using provided secret:
How to run it:

stoi --mode keygen --secret YOUR_SECRET_HERE --boundary WIDTH_OF_KEYxHEIGHT_OF_KEY --publicKeyOut PATH_WHERE_TO_SAVE_A_KEY

    --secret - secret string to that will be used to encrypt the public key
    --boundary - NUMBERxNUMBER string indicating boundaryies where encrypted string will be hidden (Must be smaller than image that will be used to hide text resolution)
    --publicKeyOut - path where to save publicKeyOut

2. Mode hide - hides text within provided image using public key and secret 
How to run it:

stoi --mode hide --text YOUR_TEXT_TO_ECRYPT --imagePath PATH_TO_IMAGE_THAT_WILL_BE_USED_TO_ENCRYPTION --imageOutPath OUT_PUT_IMAGE_PATH --keyPath YOUR_PUBLIC_KEY_PATH --secret SECRET_THAT_WAS_USED_TO_CREATE_KEY

    --text - text to encrypt in image
    --imagePath - path to image that you want to use encrypt text in
    --imageOutPath - output image path, if not provided by default it will be './encrypted.png'
    --secret - secret string to that was used to encrypt the public key
    --keyPath - path of public key

3. Mode find - finds text within provided image using public key and secret 
How to run it:

stoi ---mode find --imagePath ENCRYPTED_IMAGE_PATH --keyPath YOUR_PUBLIC_KEY_PATH --secret SECRET_THAT_WAS_USED_TO_CREATE_KEY --textOut PATH_FOR_SAVING_ENCRYPTED_TEXT

    --imagePath - path to encrypted image
    --secret - secret string to that was used to encrypt the public key
    --keyPath - path of public key
    --textOut - output path where encrypted text will be sent. If not set program will just print text in console.`

class HelpRunner implements ApplicationRunner {

    async run(inputParameters: InputParameters): Promise<RunDetails> {
        return new RunDetails(Status.Ok, HELP_MESSAGE);
    }
}

export { HelpRunner }