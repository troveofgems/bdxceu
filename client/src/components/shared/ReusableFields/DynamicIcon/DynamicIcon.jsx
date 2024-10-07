import {Icon} from "@iconify/react";
import React from "react";

import "./DynamicIcon.css";
export const DynamicIcon = ({ icon }) => {
    const iconToSet = `${icon}`;

    return (
        <div className={"dynamicIcon"}>
            <Icon icon={iconToSet}/>
        </div>
    );
}