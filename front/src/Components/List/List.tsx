import React from "react";
import ListItem from "./ListItem";
import "./List.css";

interface IProps{
    items:ListItemData[]
}

export interface ListItemData{
    elements:React.ReactNode[]
}

export default class List extends React.Component<IProps, any>{
    constructor(props:IProps){
        super(props);
    }

    render(): React.ReactNode {
        return(
            <div className="list">
                {
                    this.props.items.map((item, index) => {
                        return (
                            <div key={"row" + index}>
                                <ListItem elements={item.elements} />
                                {
                                    index != this.props.items.length - 1 ? <div className="br" /> : undefined
                                }
                            </div>
                            
                        )
                    })
                }
            </div>
        )
    }
}