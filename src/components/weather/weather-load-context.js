import React, {
    useState,
    useEffect,
    useContext
} from 'react';

/*

api.openweathermap.org/data/2.5/weather?q=dnipro&appid=af85d5a6da6fb432e2f408d463191f23     // погода по городу
`api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=af85d5a6da6fb432e2f408d463191f23`
api.openweathermap.org/data/2.5/weather?lat=48&lon=34&appid=af85d5a6da6fb432e2f408d463191f23                 //
*/

function getCoord() {
    
    return new Promise((req, res) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                return req({
                    latitude: Math.floor(position.coords.latitude),
                    longitude: Math.floor(position.coords.longitude)
                })
                // setweatherByCoord(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=af85d5a6da6fb432e2f408d463191f23`)
            }
        )
    })
}

// function weatherOnTwoWeek({ latitude, longitude }) {
//     if (latitude === 0) return;

//     const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&mode=json&appid=af85d5a6da6fb432e2f408d463191f23 `;
//     return fetch(url)
//         .then(response => response.json());
// }

function weatherOnTwoWeek({ latitude, longitude }) {
    if (latitude === 0) return;
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&mode=json&appid=af85d5a6da6fb432e2f408d463191f23`;
    // const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&mode=json&appid=af85d5a6da6fb432e2f408d463191f23 `;
    return fetch(url)
        .then(response => response.json());
}

 
export const WeatherContext = React.createContext(null);

 
let forecast = {
    id: -1, 
    description: 'wait',
    temp: 'wait',
    temp_min: 'wait',
    temp_max: 'wait',
    humidity: 'wait',
    name: 'wait',
    ico: '#',
    date: new Date().getHours()
}


export default function WeatherContextProvider({ children }) {
    
    const [weather, setweather] = useState([forecast]);
    const [city, setcity] = useState('city')
    const [position, setposition] = useState({
                                                latitude: 0,
                                                longitude: 0
                                            });


    useEffect(() => {
        getCoord().then(c => {
            setposition(c);
        });
    }, [])

    useEffect(() => {

            if (position.latitude)
                weatherOnTwoWeek(position).then(w => {
                    
                    setcity(w['city']['name']);
                    console.log(w);
                    let _date = '';
                    const arr = w['list'].map(el => {

                        _date = new Date(el['dt_txt']);
                        return ({
                            humidity: el['main']['humidity'],
                            temp: el['main']['temp'],
                            temp_max: el['main']['temp_max'],
                            temp_min: el['main']['temp_min'],
                            ico: `http://openweathermap.org/img/w/${el['weather'][0]['icon']}.png`,
                            description: el['weather'][0]['description'],
                            date: `${_date.getHours()}:00`
                            // date: new Date(w['list'][0]['dt_txt'])
                        })
                    })

                    // const obj = {
                    //     humidity: w['list'][0]['main']['humidity'],
                    //     temp: w['list'][0]['main']['temp'],
                    //     temp_max: w['list'][0]['main']['temp_max'],
                    //     temp_min: w['list'][0]['main']['temp_min'],
                    //     ico: `http://openweathermap.org/img/w/${w['list'][0]['weather'][0]['icon']}.png`,
                    //     description: w['list'][0]['weather'][0]['description']
                    // }

                    // console.log(arr);
                    setweather(arr);
                    // const obj = {
                    //     id: w['weather'][0]['id'],
                    //     description: w['weather'][0]['description'],
                    //     temp: w['main']['temp'],
                    //     temp_min: w['main']['temp_min'],
                    //     temp_max: w['main']['temp_max'],
                    //     humidity: w['main']['humidity'],
                    //     name: w['name'],
                    //     ico: `http://openweathermap.org/img/w/${w['weather'][0]['icon']}.png`
                    // };

                    // setweather([obj]);
                });
        }, [position])


    // useEffect(() => {

    //     if (position.latitude)
    //         weatherOnTwoWeek(position).then(w => {

    //             const obj = {
    //                 id: w['weather'][0]['id'],
    //                 description: w['weather'][0]['description'],
    //                 temp: w['main']['temp'],
    //                 temp_min: w['main']['temp_min'],
    //                 temp_max: w['main']['temp_max'],
    //                 humidity: w['main']['humidity'],
    //                 name: w['name'],
    //                 ico: `http://openweathermap.org/img/w/${w['weather'][0]['icon']}.png`
    //             };

    //             setweather([obj]);
    //         });
    // }, [position])

    return ( 
        <WeatherContext.Provider
            value={{
                position, setposition,
                weather, city
            }}
        >
            
            { children }
        </WeatherContext.Provider>
    );
}
