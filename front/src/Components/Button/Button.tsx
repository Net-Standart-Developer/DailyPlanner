import React from "react";
import "./Button.css";

interface IProps{
    text:string
    onClick: () => void
}

export default class Button extends React.Component<IProps, any>{
    render(): React.ReactNode {
        return(
            <div className="button" onClick={this.props.onClick}>
                <input type="button" value={this.props.text} />
            </div>
        )
    }
}