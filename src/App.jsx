import './App.css'
import Tracklist from "./components/tracklist.jsx";
import Player from "./components/player.jsx";
import Searchbar from "./components/searchbar.jsx";
import {useEffect, useState} from "react";
import SpotifyController from "./scripts/spotify.controller.js";

function App() {
    const [currentTrack, setCurrentTrack] = useState({});
    const [token, setToken] = useState(null);

    const Spotify = new SpotifyController();

    const getToken = async () => {
        await Spotify.getToken();
    }

    useEffect( () => {

        const effect = async () => {
            const grabToken = await Spotify.getTokenFromURL();

            if (grabToken[0]) {
                setToken(grabToken[1]);

            }else {
                console.log("NOT CONNECTED")
            }
        }
        effect()
    }, [])

  return (
    <>
        <Player tracks={currentTrack} tokenHandler={getToken} />
        <Tracklist />
        <Searchbar />
    </>
  )
}

export default App
