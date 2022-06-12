/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Canvas, createCanvas, loadImage } from 'canvas';
import { zip } from 'rxjs';
import { IMovie } from './poster.model';

@Controller('poster')
export class PosterController {

    constructor(

    ){}

    @Get()
    testPoster() {
        return this.getPoster({
            posterUrl: "https://image.posterlounge.at/images/m/1913709.jpg",
            name: "wwwwwwwwwwwwwwwwwwwwwwww",
            availableAt: ["netflix", "prime"]
        })
    }

    @Post()
    getPoster(@Body() movie: IMovie): any {

        const posterUrl = movie.posterUrl; // "https://image.posterlounge.at/images/m/1913709.jpg";
        let title = movie.name.slice(0, 18); //"Testitle for movie"

        if(movie.name.length > 10) {
            title += "..."
        }

        const canvas = createCanvas(430, 670)
        
        const ctx = canvas.getContext('2d')
        
        // Background
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        return zip(
            loadImage(posterUrl),
            loadImage("https://marginleft.at/fh/disney-plus_logo.png"),
            loadImage("https://marginleft.at/fh/netflix_logo.png"),
            loadImage("https://marginleft.at/fh/prime_logo.png")
        ).toPromise().then( ([image, disney, netflix, prime] ) => {

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0.0)');
            gradient.addColorStop(1, 'black');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);


            ctx.font = "37px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(title, 20, canvas.height - canvas.height / 7.5)

            ctx.font = "24px Arial";
            ctx.fillText("Available at", 20, canvas.height - canvas.height / 15.5)

            ctx.font = "12px Arial";

            console.log(movie)


            if(movie.availableAt.includes("disney")) {
                ctx.globalAlpha = 1
                ctx.drawImage(disney, 160, 595, 50, 50)
            } else {
                ctx.globalAlpha = 0.3
                ctx.drawImage(disney, 160, 595, 50, 50)
            }

            if(movie.availableAt.includes("netflix")) {
                ctx.globalAlpha = 1
                ctx.drawImage(netflix, 220, 595, 50, 50)
            } else {
                ctx.globalAlpha = 0.3
                ctx.drawImage(netflix, 220, 595, 50, 50)
            }


            if(movie.availableAt.includes( "prime")) {
                ctx.globalAlpha = 1
                ctx.drawImage(prime, 280, 595, 50, 50)
            } else {
                ctx.globalAlpha = 0.3
                ctx.drawImage(prime, 280, 595, 50, 50)
            }

            //return canvas.toDataURL();
            return '<img src="' + canvas.toDataURL() + '" />'; 
        })


    }

}
