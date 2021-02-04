import { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../weather-load-context';
import WeatherViewItem from '../weather-view-item';
import { Jumbotron, Button } from 'react-bootstrap';
import './style.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
 

const responsive = {
    superLargeDesktop: {
        breakpoint: {
            max: 4000,
            min: 3000
        },
        items: 5
    },
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 3
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 2
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1
    }
};

export default function WeatherView()
{
    const { weather, city } = useContext(WeatherContext);
    const [arr, setarr] = useState([]);

    useEffect(() => {
        if (weather.length > 1) {
            
            let localArr = [];
            for (let i = 0; i < weather.length; i += 5) {
                localArr.push(
                            weather.slice(i, i + 5).map(w =>
                                <WeatherViewItem key={w.id} weather={w}/>))
            }
            setarr(localArr);
        }
    }, [weather])
    
    


    return (
        <>   <Jumbotron>
                <h1> { city } </h1>

                <Carousel responsive={responsive}>
                   {
                       arr ? arr : ''
                   }
                </Carousel>               
            </Jumbotron>
        </> 
    );
}