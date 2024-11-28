import './App.css'
import Player from "./components/player.jsx";
import Searchbar from "./components/searchbar.jsx";
import {useEffect, useState} from "react";
import SpotifyController from "./scripts/spotify.controller.js";
import eye from "./assets/img/navi.png"
import CallbackConnection from "./components/callbackConnection.jsx";

function App() {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [token, setToken] = useState(null);
    const [tracklist, setTracklist] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const Spotify = new SpotifyController();

    const getToken = async () => {
        await Spotify.getTokenScope();
    }

    const resume = async () => {

        const currentState = await Spotify.getCurrentPlayback(token);

        if (currentState.is_playing) {
            console.log("MUSIQUE IS ALREADY PAUSED");
            await Spotify.pause(token);
        }else {
            await Spotify.resume(token);
            console.log(token);
            
            setCurrentTrack(await Spotify.getCurrentPlayback(token));
        }

        
    }

    const next = async () => {
        await Spotify.next(token);
        setCurrentTrack(await Spotify.getCurrentPlayback(token))
    }

    const prev = async () => {
        await Spotify.prev(token)
        setCurrentTrack(await Spotify.getCurrentPlayback(token));
    }

    function formatDuration(ms) {
        const totalSeconds = Math.floor(ms / 1000); // Convert ms to seconds
        const minutes = Math.floor(totalSeconds / 60); // Get whole minutes
        const seconds = totalSeconds % 60; // Get remaining seconds
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    const launchTrack = async (e) => {
        console.log("SALUUUUUT")
        if (e.currentTarget.tagName != "DIV") {
            const type = e.currentTarget.parentElement.dataset.type;
            const id = e.currentTarget.parentElement.id;
            
            await Spotify.pause(token)
            await Spotify.play(id, token)
            await Spotify.next(token)*
            setCurrentTrack(await Spotify.getCurrentPlayback(token))
            
        } else {
            const type = e.currentTarget.dataset.type;
            const id = e.currentTarget.id;
            
            await Spotify.pause(token)
            await Spotify.play(id, token)
            await Spotify.next(token)
            setCurrentTrack(await Spotify.getCurrentPlayback(token))
        }
    }

    async function fetchTracks(data, type) {
        console.log(data)
        console.log(type)

        
        
        if (type === "track") {
            const list = await Spotify.getTracksBySearch(data, type, 30, token);
            console.log(list);
            setTracklist(list.tracks.items.map((track, index) => 
            <div id={track.id} data-type={track.type} className='track-container' onClick={(e) => launchTrack(e)}>
                <p className='track' key={track.id} id={track.id}>{index + 1} - {track.name}</p>
                <p>{formatDuration(track.duration_ms)}</p>
            </div>))
        } else {
            const list = await Spotify.getTracksBySearch(data, type, 1, token);
            console.log(list);
            setTracklist(list.tracks.items.map((track, index) => 
                <div id={track.id} className='track-container'>
                    <p className='track' key={track.id} id={track.id}>{index} - {track.name}</p>
                    <p>{formatDuration(track.duration_ms)}</p>
                </div>))
        }

    }
    
    

    useEffect( () => {

        const effect = async () => {
            const grabToken = await Spotify.getTokenFromURL();
            

            if (grabToken[0]) {
                setToken(grabToken[1]);
                setIsConnected(true);

                

                const track = await Spotify.getCurrentPlayback(grabToken[1]);
                setCurrentTrack(track);

                setInterval( async () => {
                    const track = await Spotify.getCurrentPlayback(grabToken[1]);
                    setCurrentTrack(track);
                }, 1000);

            }else {
                console.log("NOT CONNECTED")
            }
        }
        effect()
    }, [])

  return (
    <>
        <Player tracks={currentTrack} tokenHandler={getToken} token={token} resume={resume} next={next} prev={prev} />
        
        <div className="tracklist">
            {tracklist}        
        </div>

        <Searchbar search={fetchTracks} />

        <CallbackConnection status={isConnected} />

    </>
  )
}

export default App
