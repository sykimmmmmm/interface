import React from "react";
import '../Style/Banner.css'

function Banner({large_cover_image,title,rating,runtime,genres,description_full,suggestion}){
    let filteredDescription_full = description_full.split('')
    if(filteredDescription_full.length>500){
        let x = filteredDescription_full.splice(500,description_full.length,"...")
    }
    return(
        <div className="banner-container">
            <div className="banner">
            <div className="banner-img">
                <img src={large_cover_image} alt="사진"/>
            </div>
            <div className="banner-desc">
                <div className="banner-information">
                    <div className="banner-title">{title}</div>
                    <div className="banner-info">
                        <span>평점:{rating}</span>
                        <span>상영시간:{runtime}</span>
                        <span>장르:{genres.join(' ')}</span>
                    </div>
                    <div className="banner-description">{filteredDescription_full.join('')}</div>
                </div>
                <div className="banner-suggestion">
                    {suggestion.map((img,i)=>{
                        return <img key={i} src={img.medium_cover_image}/>
                    })}
                </div>
            </div>
            </div>
        </div>
    )
}
export default Banner