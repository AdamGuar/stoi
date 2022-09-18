import Cryptr from 'cryptr';
import { Encryption } from '../Encryption'

class CryptrEncryption implements Encryption {
    private cryptr;

    encrypt(text: string, secret: string): string {
        this.cryptr = new Cryptr(secret);

        return this.cryptr.encrypt(text);
    }

    decrypt(text: string, secret: string): string {
        this.cryptr = new Cryptr(secret);

        return this.cryptr.decrypt(text);
    }
    
}

export { CryptrEncryption }