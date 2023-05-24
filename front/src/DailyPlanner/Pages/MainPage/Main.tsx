import React from "react";
import TaskList from "../TaskList/TaskList";
import "./Main.css"
import TaskInfo from "../TaskInfo/TaskInfo";
import CreateTask from "../CreateTask/CreateTask";

export enum Mode{
    TASK_LIST,
    TASK_INFO,
    CREATE_TASK,
    EDIT_TASK,
    DELETE_TASK
}

interface IState{
    mode:Mode,
    taskId?:string
}

export default class MainPage extends React.Component<any, any>{
    constructor(props:any){
        super(props);

        this.state = {mode:Mode.TASK_LIST}
    }

    render(): React.ReactNode {
        let content:React.ReactNode;

        switch(this.state.mode){
            case Mode.TASK_LIST:
                content = <TaskList changeMode={(mode:Mode, id?:string) => this.setState({mode:mode, taskId:id})}/>
                break;
            case Mode.TASK_INFO:
                content = <TaskInfo taskId={this.state.taskId} changeMode={(mode:Mode) => {
                        this.setState({mode:mode, taskId:undefined})
                    }
                }/>
                break;
            case Mode.CREATE_TASK:
                content = <CreateTask changeMode={(mode:Mode) => this.setState({mode:mode})} />
                break;
        }

        return (
            <div className="main-page">
                <div className="menu">

                </div>
                <div className="content">
                {
                    content
                }
                </div>
                <div className="footer">

                </div>
            </div>
        )
    }
}