import React from "react";
import "./List.css";

interface IProps{
    elements:React.ReactNode[]
}

export default class ListItem extends React.Component<IProps, any>{
    constructor(props:IProps){
        super(props);
    }

    render(): React.ReactNode {
        return(
            <div className="list-item">
                {
                    this.props.elements.map((el, index) => {
                        return (
                            <div key={"col" + index} className="list-item-col">
                                {
                                    el
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}