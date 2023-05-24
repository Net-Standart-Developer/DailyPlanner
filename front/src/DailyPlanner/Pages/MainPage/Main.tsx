import React from "react";
import TaskList from "../TaskList/TaskList";
import "./Main.css"

export enum Mode{
    TASK_LIST,
    CREATE_TASK,
    EDIT_TASK,
    DELETE_TASK
}

interface IState{
    mode:Mode
}

export default class Main extends React.Component<any, any>{
    constructor(props:any){
        super(props);

        this.state = {mode:Mode.TASK_LIST}
    }

    render(): React.ReactNode {
        let content:React.ReactNode;

        switch(this.state.mode){
            case Mode.TASK_LIST:
                content = <TaskList />
                break;
        }

        return (
            <div>
                {
                    content
                }
            </div>
        )
    }
}