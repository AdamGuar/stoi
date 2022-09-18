class InputParameters {
    public mode: Mode;
    public text: string;
    public textOut: string;
    public imagePath: string;
    public imageOutPath: string;
    public keyPath: string;
    public secret: string;
    public boundary: string;
    public publicKeyOut: string;
}

enum Mode {
    hide,
    find,
    keygen
}

class InputParametersOptionsBuilder {
    public static buildOptions(){
        return [
            { name: 'mode', type: String},
            { name: 'text', type: String},
            { name: 'textOut', type: String},
            { name: 'imagePath', type: String},
            { name: 'imageOutPath', type: String},
            { name: 'keyPath', type: String},
            { name: 'secret', type: String},
            { name: 'boundary', type: String},
            { name: 'publicKeyOut', type: String}
          ]
    }
}

export { InputParameters, Mode, InputParametersOptionsBuilder }