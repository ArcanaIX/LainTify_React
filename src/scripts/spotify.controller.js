

class SpotifyController{
    constructor(){
        this.client_id = "d84080803ba64c4bb14c866424724e60";
        this.client_secret = "a7ed4c0bd6134451970d2a68a35f0783";
        this.redirect_uri = "http://localhost:5173/";
    }

    async getToken() {
        const scope = "user-read-private%20user-read-email%20user-read-playback-state"
        window.location.href = "https://accounts.spotify.com/authorize?client_id=" + this.client_id + "&redirect_uri="+this.redirect_uri+"&scope="+scope+"&response_type=code";

    }

    async getTokenFromURL() {
        try {
            const uri = window.location.href.split("?")[1].split("&")[0].split("=")[1];
            console.log(uri)
            return [true, uri];
        } catch (e) {
            return [false, null];
        }

    };

    async getCurrentPlayback(token) {

    }
}

export default SpotifyController;