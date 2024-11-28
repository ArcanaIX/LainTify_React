

class SpotifyController{
    constructor(){
        this.client_id = "";
        this.client_secret = "";
        this.redirect_uri = "http://192.168.1.55:5173/";
    }

    async getTokenScope() {
        const scope = "user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state"
        window.location.href = "https://accounts.spotify.com/authorize?client_id=" + this.client_id + "&redirect_uri="+this.redirect_uri+"&scope="+scope+"&response_type=token";

    }

    async getTokenFromURL() {
        try {
            const uri = window.location.href.split("#")[1].split("&")[0].split("=")[1];
            console.log(uri)
            return [true, uri];
        } catch (e) {
            return [false, null];
        }

    };

    async getCurrentPlayback(token) {
        const request = await fetch("https://api.spotify.com/v1/me/player", {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + token
            }
        });

        return await request.json();

    }

    async resume(token) {
        const request = await fetch("https://api.spotify.com/v1/me/player/play", {
            method: "PUT",
            headers: {
                "Authorization" : "Bearer " + token,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "position_ms": 0
            })
        });

    }

    async pause(token ) {
        const request = await fetch("https://api.spotify.com/v1/me/player/pause", {
            method: "PUT",
            headers: {
                "Authorization" : "Bearer " + token
            }
        })
    }

    async next(token) {
        const request = await fetch("https://api.spotify.com/v1/me/player/next", {
            method: "POST",
            headers: {
                "Authorization" : "Bearer " + token
            }
        })
    }

    async prev(token) {
        const request = await fetch("https://api.spotify.com/v1/me/player/previous", {
            method: "POST",
            headers: {
                "Authorization" : "Bearer " + token
            }
        })
    }

    async getTracksBySearch(data, type, limit, token) {
        const query = "q=" + data + "&limit=" + limit + "&type=" + type;

        const request = await fetch("https://api.spotify.com/v1/search?" + query, {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + token
            }
        });

        const response = await request.json();
        return response;
    }

    async play(id, token) {
        const request = await fetch("https://api.spotify.com/v1/me/player/queue?uri=spotify:track:" + id, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

}

export default SpotifyController;