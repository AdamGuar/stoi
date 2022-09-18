import { ApplicationRunner } from "./ApplicationRunner";
import { InputParameters } from "./models/InputParameters";
import { RunDetails, Status } from "./models/RunDetails";
import { readFileSync, readdirSync } from 'fs';

const HELP_MESSAGE_PATH = './utils/helpmessage.txt'

class HelpRunner implements ApplicationRunner {

    async run(inputParameters: InputParameters): Promise<RunDetails> {
        const helpMessage = readFileSync(HELP_MESSAGE_PATH).toString();
        return new RunDetails(Status.Ok, helpMessage);
    }
}

export { HelpRunner }