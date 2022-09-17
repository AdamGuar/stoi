class RunDetails {
    public status: Status
    public detalis: string

    constructor(status: Status, details: string) {
        this.status = status;
        this.detalis = details;
    }
}

enum Status {
    Ok = "OK",
    Fail = "FAIL"
}

export {RunDetails, Status}