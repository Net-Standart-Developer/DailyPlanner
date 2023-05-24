import React from "react";
import "./Input.css";

interface IProps{
    type:string
    value?:string
    placeholder?:string
    onChange:(text:string) => void
}

interface IState{
    val:string
}

export default class Input extends React.Component<IProps, IState>{
    constructor(props:IProps){
        super(props);

        this.state = {val: this.props.value ? this.props.value : ""}
    }

    render(): React.ReactNode {
        return(
            <div className="Input">
                <input type={this.props.type} placeholder={this.props.placeholder} 
                       value={this.state.val}
                       onChange={e => {
                            this.setState({val: e.target.value})
                            this.props.onChange(e.target.value)
                        }}/>
            </div>
        )
    }
}