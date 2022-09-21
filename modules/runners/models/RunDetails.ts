class RunDetails {
    public status: Status
    public detalis: string
    public text: string

    constructor(status: Status, details: string, text: string = null) {
        this.status = status;
        this.detalis = details;
        this.text = text;
    }s
}

enum Status {
    Ok = "OK",
    Fail = "FAIL"
}

export {RunDetails, Status}