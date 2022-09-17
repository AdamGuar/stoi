class PublicKey { 
    public pixelPostions: PixelPosition[]
    public encryptionKey: string

    constructor(pixelPositions: PixelPosition[], encryptionKey: string) {
        this.pixelPostions = pixelPositions;
        this.encryptionKey = encryptionKey;
    }

}

class PixelPosition {
    public x;
    public y;
    public value;
}

export { PublicKey, PixelPosition }