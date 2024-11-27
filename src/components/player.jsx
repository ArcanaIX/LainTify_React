import {useState} from "react";
import defaultCover from "../assets/img/eye.jpeg";

const Player = (props) => {
    const [trackname, setTrackname] = useState("NOTHING");
    const [artist, setArtist] = useState("NOBODY");
    const [cover, setCover] = useState(defaultCover);

    const connectClickHandler = () => {

    }

    return (
        <div className="player">

            <div className="player-album-cover-container">
                <img className="player-album-cover" src={cover} alt=""/>
            </div>

            <div className="player-trackname-container">
                <p className="player-trackname">
                    *** - {artist} - {trackname}
                </p>
            </div>

            <div className="player-command-container">
                <div className="player-play-command">
                    <p>PLAY</p>
                </div>
                <div className="player-play-command" onClick={props.tokenHandler}>
                    <p>CONNECT</p>
                </div>
            </div>

        </div>
    )
}

export default Player