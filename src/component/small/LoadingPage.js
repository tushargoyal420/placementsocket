import React from 'react'
import "../../css/LoadingPage.css"
import loadingImage from '../../img/logo/logo_black.png'

function LoadingPage() {
    const imageStyle={width: '500px'}
    return (
        <div className="loadingPage">
            <img src={loadingImage}  alt="loading" style={imageStyle}/>
        </div>
    )
}

export default LoadingPage
