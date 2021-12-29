import React from 'react'

function GoogleMap() {
    const mapStyle = {
        width: "100%",
        height: "500px",
        boxShadow: '0px 5px 5px 0.5px grey',
        allowfullscreen: "",
        loading: "lazy",

    }
    return (
        <div className="maps">
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.7109570174116!2d77.96464791531257!3d30.41594160788164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d4890d7c1735%3A0x22d3ae324c238e3c!2sUPES!5e0!3m2!1sen!2sin!4v1636487946906!5m2!1sen!2sin"
            title="mapFrame"
                style={mapStyle}>

            </iframe>
        </div>
    )
}

export default GoogleMap
