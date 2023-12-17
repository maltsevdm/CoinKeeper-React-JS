import React, { useState } from "react";
import './iconList.css';
import { CURRENT_URL } from "../../services/config";

const IconList = ({iconList}) => {
    const [active, setActive] = useState(false)

    function changeState ({target}) {
        setActive(active ? false : true)
        target.className = active ? "cat-icon active" : "cat-icon"
    }

    return (
        <div className="icon-list">
            {iconList.map(icon_name => 
                <img 
                src={CURRENT_URL + "icons/" + icon_name} 
                className="cat-icon"
                onClick={changeState}
                />)}
        </div>
    )
};

export default IconList;