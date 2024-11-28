import { useEffect, useState } from "react";


function CallbackConnection(props) {
    const [displayStatus, setDisplayStatus] = useState("hidden callback-connection");

    useEffect(() => {

        if (props.status) {
            console.log("ACTIVE")*
            setDisplayStatus("displayed callback-connection")
        } else {
            console.log('NOT ACTIVE');
        }

    }, [props.status]);

    const closePopup = () => {
        setDisplayStatus("hidden callback-connection")
    }

    return (
        <div className={displayStatus} >
            <p>CONNECTED</p>
            <button onClick={closePopup}>
                OKAY
            </button>
        </div>
    )

}

export default CallbackConnection;