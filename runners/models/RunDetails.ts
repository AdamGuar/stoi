class RunDetails {
    public status: Status
    public detais: string

    constructor(status: Status, details: string) {
        this.status = status;
        this.detais = details;
    }
}

enum Status {
    Ok,
    Fail
}

export {RunDetails, Status}