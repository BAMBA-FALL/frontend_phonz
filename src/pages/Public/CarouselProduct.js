/***CAROUSEL FROM SCRATCH TOUT EST FAIT AVEC DU CODE JAVASCRIPT PUR****/


// import React, { useEffect, useState } from 'react';
// import { carouselService } from '../../_services/carousel.service';
// import './carousel.css'; 

// const CarouselProduct = () => {
//     const [carousels, setCarousels] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         const fetchCarousels = async () => {
//             try {
//                 const response  = await carouselService.getCarousel();
//                 console.log(response.carousels)
//                 setCarousels(response.carousels);
//             } catch (error) {
//                 console.error('Erreur lors de la récupération des carousels :', error);
//             }
//         };

//         fetchCarousels();
//     }, []);

//     const nextSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === carousels.length - 1 ? 0 : prevIndex + 1));
//     };

//     const prevSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === 0 ? carousels.length - 1 : prevIndex - 1));
//     };

//     return (
//         <div className='carousel'>
//             {carousels.map((carousel, index) => (
//                 <div key={carousel._id} className={index === currentIndex ? 'visible' : ''}>
//                     {carousel.images.map(image => (
//                         <img key={image} src={`http://localhost:4000/uploads/${image}`} alt={carousel.title} />
//                     ))}
//                 </div>
//             ))}
//             <button className="prev" onClick={prevSlide}>Prev</button>
//             <button className="next" onClick={nextSlide}>Next</button>
//         </div>
//     );
// };

// export default CarouselProduct;
/*** FIN DU CAROUSEL FROM SCRATCH TOUT EST FAIT AVEC DU CODE JAVASCRIPT PUR****/



import React, { useEffect, useState } from "react";
import { carouselService } from '../../_services/carousel.service';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carousel.css'; 
const CarouselProduct = () => {
    const [carousels, setCarousels] = useState([]);

    useEffect(() => {
        const fetchCarousels = async () => {
            try {
                const data = await carouselService.getCarousel();
                console.log(data.carousels)
                setCarousels(data.carousels);
            } catch (error) {
                console.error('Erreur lors de la récupération des carousels :', error);
            }
        };

        fetchCarousels();
    }, []);

    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ ...style, display: "flex", background: "grey", justifyContent:"center", alignItems:"center" }} onClick={onClick} />
        );
    }

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ ...style, display: "flex", background: "grey", justifyContent:"center", alignItems:"center" }} onClick={onClick} />
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div >
            {carousels.map(carousel => (
                <div key={carousel._id}>
                    <Slider {...settings}>
                        {carousel.images.map(image => (
                            <div key={image}>
                                <img src={`http://localhost:4000/uploads/${image}`} alt={carousel.title} style={{width:"100%", height:"100%"}} />
                            </div>
                        ))}
                    </Slider>
                </div>
            ))}
        </div>
    );
};

export default CarouselProduct;
