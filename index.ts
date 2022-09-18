#!/usr/bin/env node

import { FindRunner, HideRunner, InputParameters, InputParametersOptionsBuilder, KeyGeneratorRunner, ApplicationRunner, HelpRunner } from './modules/runners'
import commandLineArgs from 'command-line-args'

import { CryptrEncryption } from './modules/encryption';
import { RunDetails } from './modules/runners/models/RunDetails';
const cryptrEncryption = new CryptrEncryption();

const runnersModeMap = {
    keygen: new KeyGeneratorRunner(cryptrEncryption),
    hide: new HideRunner(cryptrEncryption),
    find: new FindRunner(cryptrEncryption)
}

function getRunnerForMode(mode) {
    const runner = runnersModeMap[mode] || new HelpRunner();
    return runner;
}

async function main() {
    const optionDefinitions = InputParametersOptionsBuilder.buildOptions();
    const options: InputParameters = commandLineArgs(optionDefinitions);

    const runner: ApplicationRunner = getRunnerForMode(options.mode);
    const runStatus: RunDetails = await runner.run(options);

    console.log('Program execution completed');
    console.log(`Status: ${runStatus.status}`);
    console.log(`Details: ${runStatus.detalis}`);

}

main();