import {useEffect, useState, useRef} from "react";
import defaultCover from "../assets/img/eye.jpeg";

const Player = (props) => {
    const [cover, setCover] = useState(defaultCover);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [durationStatus, setDurationStatus] = useState(0)

    useEffect(() => {
        if (props.tracks) {
            setCurrentTrack(props.tracks);
            setCover(props.tracks.item.album.images[0].url)
            
            minuteur(props.tracks)

        }
    }, [props.tracks])

    function formatDuration(ms) {
        const totalSeconds = Math.floor(ms / 1000); // Convert ms to seconds
        const minutes = Math.floor(totalSeconds / 60); // Get whole minutes
        const seconds = totalSeconds % 60; // Get remaining seconds
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function minuteur(track) {
        setDurationStatus((track.progress_ms/track.item.duration_ms) * 100)
    }

    return (
        <div className="player">
    
                <div className="player-album-cover-container">
                    <img className="player-album-cover" src={cover} alt=""/>
                </div>
    
                <div className="player-trackname-container">
                    <p className="player-trackname">
                        *** - {currentTrack ? currentTrack.item.artists[0].name : "Loading"} - {currentTrack ? currentTrack.item.name : "Loading"}
                    </p>
                    <div className="player-duration-container">
                        <div className="player-duration-background">
                            <div className="player-duration" style={{width: durationStatus}}>

                            </div>
                            
                        </div>
                        <p className="player-total-duration">{currentTrack ? formatDuration(currentTrack.item.duration_ms) : null}</p>
                    </div>
                </div>
    
                <div className="player-command-container">
                    <div className="player-play-command" onClick={props.tokenHandler}>
                        <p>CONNECT</p>
                    </div>
                    <div className="player-play-command" onClick={props.resume}>
                        <p>PLAY</p>
                    </div>
                    <div className="player-play-command" onClick={props.prev}>
                        <p>PREV.</p>
                    </div>
                    <div className="player-play-command" onClick={props.next}>
                        <p>NEXT</p>
                    </div>
                    
                </div>
    
            </div>
    )
    
}

export default Player