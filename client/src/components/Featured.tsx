import React from 'react'
import featuredPic from '../images/pumpkin.jpg';

const Featured = () => {
    return (
        <div style={verticalImageContainer}>
            <img width="250" style={{marginTop: "25vh"}} src={featuredPic} alt=""/>
        </div>
    )
}

const verticalImageContainer: React.CSSProperties | undefined = {
    width: "250px",
    margin: "auto",
    height: "100vh",
    position: "fixed",
    backgroundColor: "#90b290",
    top: "0",
    marginLeft: "8rem"
}

export default Featured
