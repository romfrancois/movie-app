import React from "react";

import { Movie } from '../types/Movie';

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const getRatingClass = (rating: number): string => {
    if (rating >= 7) {
        return "ratingGreen";
    } else if (rating < 7 && rating > 5) {
        return "ratingOrange";
    }

    return "ratingRed";
};

const MovieComponent = ({
    title,
    poster_path,
    overview,
    vote_average,
}: Movie) => {
    const posterImg = poster_path ? IMGPATH + poster_path : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1040&q=80';
    
    return  (
        <div className="movie">
            <img src={posterImg} alt={title} />

            <div className="movie-info">
                <h3>{title}</h3>
                <span className={getRatingClass(vote_average)}>{vote_average}</span>
            </div>

            <div className="movie-overview">
                <h2>Overview</h2>
                <p>{overview}</p>
            </div>
        </div>
    )};

export default MovieComponent;
