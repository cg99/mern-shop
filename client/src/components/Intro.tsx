import React from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../sass/intro.scss';

const Intro: React.FC = () => {
    return (
        <div className="w-50 text-left mx-auto my-5">
            <h1 style={{
                fontFamily: "Ranchers, cursive"
            }}>
                100% <span style={textUnderline}>Vegan</span>,
                Palm-Oil &amp; Chemical Free <span style={textUnderline}>Dairy</span>
            </h1>
            <Link to="/products" style={{
                backgroundColor: "#90b290",
                color: "#000",
                border: "none",
                borderRadius: "30px",
                fontSize: "12px",
                fontWeight: 600,
                padding: "8px 32px",
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                width: "50%"
            }} className="btn__cta">
                <span>EXPLORE</span> <span style={{
                    borderRadius: "30px",
                    backgroundColor: "#b3d7bb",
                    padding: "5px",
                    display: "inline-flex",
                    marginLeft: "21px",
                    marginRight: "-26px",
                }}><AiOutlineArrowRight /></span>
            </Link>
        </div>
    )
}

const textUnderline: React.CSSProperties | undefined = {
    textDecorationLine: "underline",
    textDecorationColor: "#90b290",
    textDecorationThickness: "8px",
    textDecorationSkipInk: "none",
    textUnderlineOffset: "-8px",
}

export default Intro
