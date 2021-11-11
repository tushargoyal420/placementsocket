import React from 'react'


function ImageWithName(props) {
    const imageDivStyle = {
        // backgroundColor: 'red',
        maxWidth: '150px', height: '150px',
        boxShadow: '0px 4px 5px 2px grey',
        borderRadius: '100%',
        // alignItems:'center',
        overflow: 'hidden', marginBottom: '30px'
    }
    const imageStyle = {
        width: '100%',
    }
    const nameDivStyle = {
        display: 'flex', justifyContent: 'center', alignItem: 'center',
        flexDirection: 'column', fontSize: '3vh', lineHeight: '15px', fontWeight: '800'
    }
    const wholeDivStyle = {
        maxWidth: '170px',
        padding: '10px',
        display: 'flex', textAlign: 'center', flexDirection: 'column'
    }
    return (
        <div className="whole" style={wholeDivStyle}>
            <div className="image" style={imageDivStyle}>
                <img src={props.image} alt={props.alt} style={imageStyle} />
            </div>
            <div className="name" style={nameDivStyle}>
                <p>{props.firstName}</p>
                <p>{props.lastName}</p>
            </div>

        </div>

    )
}

export default ImageWithName
