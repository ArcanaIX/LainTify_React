import { useState } from "react"


const Searchbar = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const [type, setType] = useState("track");

    const handleKeyUp = async (e) => {

        if (e.key == "Enter") {
            props.search(searchValue, type);
        } else {
            await setSearchValue(e.target.value);
        }
    }

    const handleTypeChange = async (e) => {
        await setType(e.target.value);
    }

    return (
        <>
            
            <div className="searchbar">
            <input type="text" className="searchbar-input" name="" id="" onKeyUp={(e) => handleKeyUp(e)} />
            <select name="" id="" onChange={(e) => handleTypeChange(e)}>
                <option value="track">Track</option>
                <option value="album">Album</option>
            </select>
            </div>
        </>
    )
}

export default Searchbar