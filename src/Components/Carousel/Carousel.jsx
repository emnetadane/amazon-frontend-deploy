import React from 'react'
import {Carousel} from 'react-responsive-carousel' 
import {img} from './data'
import classes from '../../assets/Carousel.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
function CarouselEffect () {
    return (
        <div>
            <Carousel 
            autoPlay={true}
            infiniteLoop={true}
            showIndicators={false}
            showThumbs={false}>
                {
                    img.map((imageItemLink, index)=> {
                        return <img key={index}src={imageItemLink} alt={`carousel-img-${index}`}/>;
                        
                    })
                }

            </Carousel>
            <div className={classes.hero_img}></div>

        </div>
    )
}

export default CarouselEffect 