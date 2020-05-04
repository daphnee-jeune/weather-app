import React from 'react'
import '../styles/Weather.css'

const WeatherInfo = (props) => {
    const { temp, humidity, desc, city } = props.data
    return (
        <>
        <h3> {desc} </h3>
        <section className="weather-data-flex">
            <div className="header-desc">
                <h4>City</h4>
                <p> {city} </p>
            </div>

            <div className="header-desc">
                <h4>Temperature</h4>
                <p> {temp} <span className="degree-symbol"></span>F</p>
            </div>

            <div className="header-desc">
                <h4>Humidity</h4>
                <p> {humidity}% </p>
            </div>
        </section>
            
        </>
    )
}

export default WeatherInfo
