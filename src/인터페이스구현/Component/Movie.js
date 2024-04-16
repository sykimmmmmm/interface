import React from "react";
import '../Style/Movie.css'

function Movie({medium_cover_image,title,genres,rating}){
    return(
            <div className="movie-box">
                <div className="movie-img">
                    <img src={medium_cover_image} alt="img"/>
                </div>
                <div className="movie-desc">
                    <h3>{title}</h3>
                    <h3>{genres.join(' ')}</h3>
                    <h3>{rating}점</h3>
                </div>
            </div>
    )
}
export default Movie