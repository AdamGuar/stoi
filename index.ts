import { FindRunner, HideRunner, InputParameters, InputParametersOptionsBuilder, KeyGeneratorRunner, ApplicationRunner } from './modules/runners'
import commandLineArgs from 'command-line-args'

import { CryptrEncryption } from './modules/encryption';
import { RunDetails } from './modules/runners/models/RunDetails';
const cryptrEncryption = new CryptrEncryption();

const runnersModeMap = {
    keygen: new KeyGeneratorRunner(cryptrEncryption),
    hide: new HideRunner(cryptrEncryption),
    find: new FindRunner(cryptrEncryption)
}

async function main() {
    const optionDefinitions = InputParametersOptionsBuilder.buildOptions();
    const options: InputParameters = commandLineArgs(optionDefinitions);
    console.log(options);

    const runner: ApplicationRunner = runnersModeMap[options.mode];
    const details: RunDetails = await runner.run(options);

    console.log(JSON.stringify(details));
}

main();