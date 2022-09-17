class RunDetails {
    public status: Status
    public detalis: string

    constructor(status: Status, details: string) {
        this.status = status;
        this.detalis = details;
    }
}

enum Status {
    Ok,
    Fail
}

export {RunDetails, Status}