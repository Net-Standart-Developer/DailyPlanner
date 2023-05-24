import React from "react";
import { Mode } from "../MainPage/Main";
import APIManager from "../../API/APIManager";

interface IProps{
    changeMode:(mode:Mode) => void
}

interface IState{
    message?:string
}

export default class TaskList extends React.Component<IProps, IState>{
    protected API?:APIManager;
    
    constructor(props:IProps){
        super(props);

        this.state = {message:"Идет загрузка задач"}
        this.API = APIManager.getInstance()
    }

    async componentDidMount(): void {
        let response = await fetch(this.API?.BACK_GET_TASKS_ADDRESS, {
            method:"GET"
        })

        if(response.ok){
            let data = await response.json();
            
        }
    }
}