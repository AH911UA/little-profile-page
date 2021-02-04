import React, {
    useState,
    useEffect,
    useContext
} from 'react';

import WeatherContextProvider from '../weather/weather-load-context';
import WeatherView from '../weather/weather-view';

export default function News(props)
{ 
    return (
        <WeatherContextProvider>
            <h1> News </h1>
            <WeatherView/>

        </WeatherContextProvider>
    )
}