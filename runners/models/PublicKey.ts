class PublicKey { 
    public pixelPostions: PixelPostion[]
    public encryptionKey: string

    constructor(pixelPositions: PixelPostion[], encryptionKey: string) {
        this.pixelPostions = pixelPositions;
        this.encryptionKey = encryptionKey;
    }

}

class PixelPostion {
    public x;
    public y;
    public value;
}

export { PublicKey, PixelPostion }