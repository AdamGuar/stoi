class InputParameters {
    public mode: Mode;
    public text: string;
    public imagePath: string;
    public keyPath: string;
    public secret: string;
    public boundary: string;
    public publicKeyOut: string;
}

enum Mode {
    encrypt,
    decrypt,
    keygen
}

export { InputParameters, Mode }