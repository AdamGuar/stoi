const { createCanvas, loadImage } = require('canvas')
const fs = require('fs');

import { PixelPosition } from '../../runners';

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
        toPut.forEach((element, index)=> {
            const pixel = this.ctx.getImageData(element.x, element.y, 1, 1);
            this.ctx.fillStyle = this.getRgbForPosition(element.value, element.rgbIndex, pixel);
            this.ctx.fillRect(element.x, element.y, 1, 1);
        });
    }

    private getRgbForPosition(value: number, position: number, currentPixel: any): string {
        const rgb = currentPixel.data;
        if(position===0) return `rgb(${value},${rgb[1]},${rgb[2]})`;
        if(position===1) return `rgb(${rgb[0]},${value},${rgb[2]})`;
        if(position===2) return `rgb(${rgb[0]},${rgb[1]},${value})`;
    }

    readByteArrayFromCanvas(positions: PixelPosition[]): number[] {
        const result: number[] = [];
        for(let i=0; i < positions.length ; i++) {
            const position = positions[i];
            const pixel = this.ctx.getImageData(position.x, position.y, 1, 1);
            const rgb = pixel.data;
            result.push(rgb[position.rgbIndex]);
        }
        return result;
    }

    saveImage(path: string) {
        const buffer = this.canvas.toBuffer(this.getBufferTypeFromPath(path));
        fs.writeFileSync(path, buffer);
    }

    getImg() {
        return this.image;
    }

    private getBufferTypeFromPath(path: string): string{
        /*
        if(path.toLowerCase().indexOf('jpeg') !== -1 || path.toLowerCase().indexOf('jpg') !== -1) return 'image/png';
        if(path.toLowerCase().indexOf('svg') !== -1) return 'image/svg';
        if(path.toLowerCase().indexOf('png') !== -1) return 'image/png';
        */
        return 'image/png';
    }
}

export { ImgProcessor }