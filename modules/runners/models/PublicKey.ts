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
    public value = 0;
    public rgbIndex = 0;
}

export { PublicKey, PixelPosition }