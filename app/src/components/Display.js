import React from "react";

export default function Display(props){
    return(
        <div className="card-container">
            <div className="card-heading">
                <div className="img-container">
                    <img className="profile-pic" src={props.picture} alt=""></img>
                </div>

                <div className="channel-name-and-desc">
                    <h3 className="channel-name">{props.name}</h3>
                    <h5 className="channel-desc">{props.desc}</h5>
                </div>
            </div>

            <div className="channel-stats">
                <p className="video-count">Videos: {props.videoCount}</p>
                <p className="subs-count">Subscribers: {props.subsCount}</p>
                <p className="view-count">Views: {props.views}</p>
            </div>
        </div>
    )
}