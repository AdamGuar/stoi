const { createCanvas, loadImage } = require('canvas')
const fs = require('fs');

import { PixelPosition } from '../runners';

class ImgProcessor {
    private image: any;
    private canvas: any;
    private ctx: any;

    private width: number;
    private height: number;

    async loadImage(imagePath: string) {
        try {
            this.image = await loadImage(imagePath);
            this.width = this.image.naturalWidth;
            this.height = this.image.naturalHeight
            this.canvas = createCanvas(this.width, this.height);
            this.ctx = this.canvas.getContext('2d');
            this.ctx.drawImage(this.image,0,0);
        } catch (error) {
            throw {
                message: 'Unable to load image',
                reason: error,
            }
        }
    }

    addArrayToCanvas(input: number[], positions: PixelPosition[]) {
        const toPut = input.map((numberToPut, index) => {
            const data = positions[index];
            data.value = numberToPut;
            return data;
        });
        toPut.forEach(element=> {
            this.ctx.fillStyle = `rgb(${element.value},0,0)`;
            this.ctx.fillRect(element.x, element.y, 1, 1);
        });
    }

    readByteArrayFromCanvas(positions: PixelPosition[]): number[] {
        const result: number[] = [];
        for(let i=0; i < positions.length ; i++) {
            const position = positions[i];
            const pixel = this.ctx.getImageData(position.x, position.y, 1, 1);
            const rgb = pixel.data;
            if(rgb[0]==42) break;
            result.push(rgb[0]);
        }
        return result;
    }

    async addTextToImmage(text: string) {
        this.ctx.fillStyle = '#fff'
        this.ctx.font = '11pt'
        this.ctx.fillText(text,this.width / 2 , this.height / 2);
    }

    saveCanvas() {
        const buffer = this.canvas.toBuffer('image/png')
        fs.writeFileSync('./imagesOutput/test.png', buffer);
    }

    saveImage(path: string) {
        const buffer = this.canvas.toBuffer(this.getBufferTypeFromPath(path));
        fs.writeFileSync(path, buffer);
    }

    getImg() {
        return this.image;
    }

    private getBufferTypeFromPath(path: string): string{
        if(path.toLowerCase().indexOf('jpeg') !== -1 || path.toLowerCase().indexOf('jpg') !== -1) return 'image/jpeg';
        if(path.toLowerCase().indexOf('svg') !== -1) return 'image/svg';
        if(path.toLowerCase().indexOf('png') !== -1) return 'image/png';
        return 'image/jpg';
    }
}

export { ImgProcessor }