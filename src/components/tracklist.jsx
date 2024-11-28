import { useState, useEffect } from "react";

const Tracklist = (props) => {

    const [tracklist, setTracklist] = useState(null)

    useEffect(() => {
        async function settracks() {
            if (props.tracklist) {
                setTracklist(props.tracklist)

            }
        }
        settracks();
    }, [props.tracklist]);

    useEffect(() => {
        console.log("Track changed");
        console.log(tracklist);
        
        if (tracklist) {
            render()
        }

    }, [tracklist])

    const render = () => {
        console.log("RERENDERING")
        if (tracklist) {
            return (tracklist.map((item, index) => {
                <p>salut</p>
            }))
        }

    }

    return (
        
    )
}

export default Tracklist