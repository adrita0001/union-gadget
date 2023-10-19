import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const Banner = () => {
    return (
        <div>
             <Carousel>
                <div>
                    <img className='rounded-md' src="https://i.ibb.co/sKt4zk7/Grey-3-D-Online-Store-Facebook-Cover.png" />
                   
                </div>
                <div>
                    <img className='rounded-md' src="https://i.ibb.co/WDJXpSF/Grey-3-D-Online-Store-Facebook-Cover-1.png" />
                   
                </div>
                <div>
                    <img className='rounded-md' src="https://i.ibb.co/23jjZk2/Grey-3-D-Online-Store-Facebook-Cover-2.png" />
                 
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;