import { RunDetails } from './models/RunDetails'
import { InputParameters } from './models/InputParameters' 

interface ApplicationMode {
    shouldRun(inputParameters: InputParameters): boolean
    run(inputParameters: InputParameters): RunDetails
}

export  { ApplicationMode };