import { RunDetails } from './models/RunDetails'
import { InputParameters } from './models/InputParameters' 

interface ApplicationRunner {
    shouldRun(inputParameters: InputParameters): boolean
    run(inputParameters: InputParameters): Promise<RunDetails>
}

export  { ApplicationRunner };