import { Body, Controller, Get, Post } from '@nestjs/common';
import { Canvas, createCanvas, loadImage } from 'canvas';
import { IMovie } from './poster.model';

@Controller('poster')
export class PosterController {

    constructor(

    ){}

    @Post()
    getPoster(@Body() movie): any {


       // const movie: IMovie = null;; 

       // console.log(data)

        const posterUrl = movie.posterUrl; // "https://image.posterlounge.at/images/m/1913709.jpg";
        const title = movie?.name; //"Testitle for movie"
        const canvas = createCanvas(430, 670)
        
        const ctx = canvas.getContext('2d')
        
        // Background
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        // Poster background
        return loadImage(posterUrl).then((image) => {
            
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0.0)');
            gradient.addColorStop(1, 'black');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);


            ctx.font = "37px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("This is the movie name", 20, canvas.height - canvas.height / 7.5)

            ctx.font = "24px Arial";
            ctx.fillText("Available at", 20, canvas.height - canvas.height / 15.5)

            ctx.font = "12px Arial";

            if(movie?.availableAt?.disney) {
                ctx.fillText("Disney", 180, canvas.height - canvas.height / 15.5)
            }

            if(movie?.availableAt?.netflix) {
                ctx.fillText("Neflix", 260, canvas.height - canvas.height / 15.5)
            }

            if(movie?.availableAt?.prime) {
                ctx.fillText("Prime", 320, canvas.height - canvas.height / 15.5)
            }


            return canvas.toDataURL();
        
            return '<img src="' + canvas.toDataURL() + '" />'; 
            
        });


        

        // Write "Awesome!"
        ctx.font = '30px Impact'
        ctx.rotate(0.1)
        ctx.fillText('Awesome!', 50, 100);

        // Draw line under text
        var text = ctx.measureText('Awesome!')
        ctx.strokeStyle = 'rgba(0,0,0,0.5)'
        ctx.beginPath()
        ctx.lineTo(50, 102)
        ctx.lineTo(50 + text.width, 102)
        ctx.stroke()

        

    }

}
