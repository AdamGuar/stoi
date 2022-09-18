import { RunDetails } from './models/RunDetails'
import { InputParameters } from './models/InputParameters' 

interface ApplicationRunner {
    run(inputParameters: InputParameters): Promise<RunDetails>
}

export  { ApplicationRunner };