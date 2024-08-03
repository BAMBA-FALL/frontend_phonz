import Axios from "./caller.service";

const getCarousel = async()=>{

    try {

        const response = await Axios.get('/api/carousels')
        console.log('Response carousel', response.data)
        return response.data;
    } catch (error) {
        
    }
}



export const carouselService =  {
     getCarousel,

}