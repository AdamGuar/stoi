interface Encryption {
    encrypt(text: string, secret: string): string;
    decrypt(text: string, secret: string): string;
}

export { Encryption }