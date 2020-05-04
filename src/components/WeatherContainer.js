import React, {useState} from 'react'
import '../styles/Weather.css'
import WeatherInfo from './WeatherInfo'

const WeatherContainer = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [weatherData, setWeahterData] = useState({
        temp: null,
        humidity: null,
        description: null,
        city: null
    })
    
    const [isValidZip, setIsValidZip] = useState(true)



    const updateSearchQuery = e => {
        let zip = e.target.value

        setSearchQuery(zip)

        let isValid = validateZip(zip)

        if (isValid || zip === '' || isValid.length === 5) {
            setIsValidZip(true)
        } else {
            setIsValidZip(false)
        }
        
    }

    const validateZip = zip => {
        let regex = /[0-9]{5}/;
        return regex.test(zip)
    }

    const API_KEY = '594b5e9bf70f52f4ba1b83e1a7b1ee5b'
    const getWeatherData = () => {

        if (!isValidZip || searchQuery === "") {
            setIsValidZip(false)
            return
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${searchQuery},us&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => setWeahterData({
                temp: toFarenheit(data.main.temp),
                humidity: data.main.humidity,
                desc: data.weather[0].main,
                city: data.name
            }))
    }

    const toFarenheit = temp => {
        return ((temp - 273.15) * (9.0 / 5.0) + 32).toFixed(0)
    }
    return (
        <section className="weather-container">
            <header className="weather-header">
                <h3>Weather</h3>
                <div>
                    <input 
                        className="search-input"
                        placeholder="zipcode" 
                        onChange={updateSearchQuery}
                        maxLength="5"
                    />
                    <button className="material-icons" onClick={getWeatherData}>search</button>
                </div>
            </header>
            <p className="error">{isValidZip ? "" : "Invalid Zipcode"}</p>
            <section className="weather-info">
                {weatherData.temp === null ? ( <p>No weahter to display<i className="material-icons">wb_sunny</i></p>) : <WeatherInfo data={weatherData} />}
            </section>
        </section>
    )
}

export default WeatherContainer
