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
            availableAt: ["netflix"]
        })
    }

    @Post()
    getPoster(@Body() movie): any {

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
            //loadImage("./disney-plus_logo.png")
        ).toPromise().then( ([image] ) => {

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

            if(movie.availableAt == "disney") {
                ctx.fillText("Disney", 180, canvas.height - canvas.height / 15.5)
            }

            if(movie.availableAt == "netflix") {
                ctx.fillText("Neflix", 260, canvas.height - canvas.height / 15.5)
            }

            if(movie.availableAt == "prime") {
                ctx.fillText("Prime", 320, canvas.height - canvas.height / 15.5)
            }


            //return canvas.toDataURL();
        
            return '<img src="' + canvas.toDataURL() + '" />'; 
        })


        return; 
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
            ctx.fillText(title, 20, canvas.height - canvas.height / 7.5)

            ctx.font = "24px Arial";
            ctx.fillText("Available at", 20, canvas.height - canvas.height / 15.5)

            ctx.font = "12px Arial";

            console.log(movie)

            if(movie.availableAt == "disney") {
                ctx.fillText("Disney", 180, canvas.height - canvas.height / 15.5)
            }

            if(movie.availableAt == "netflix") {
                ctx.fillText("Neflix", 260, canvas.height - canvas.height / 15.5)
            }

            if(movie.availableAt == "prime") {
                ctx.fillText("Prime", 320, canvas.height - canvas.height / 15.5)
            }


            //return canvas.toDataURL();
        
            return '<img src="' + canvas.toDataURL() + '" />'; 
            
        });        

    }

}
