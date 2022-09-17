class TextProcessing {
    static toByteArray(text: string): number[] {
        text = text + '*';
        const resultArray: number[] = [];
        Buffer.from(text, 'utf-8').forEach(element=> {
            resultArray.push(element);
        });
        return resultArray;
    }
    static getStringFromByteArray(byteArray: number[]): string {
        const buffer = Buffer.from(byteArray);
        return buffer.toString();
    }
}

export { TextProcessing }