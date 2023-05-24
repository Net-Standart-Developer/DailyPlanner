import React from "react";
import { Mode } from "../MainPage/Main";
import Task from "../../API/Models/Task";
import APIManager from "../../API/APIManager";
import { Button } from "../../../Components/Components";
import "./TaskInfo.css"

interface IProps{
    taskId:string
    changeMode:(mode:Mode) => void
}

interface IState{
    message?:string
    task?:Task
}

export default class TaskInfo extends React.Component<IProps, IState>{
    API:APIManager
    
    constructor(props:IProps){
        super(props)

        this.state = {message:"Идет загрузка данных о задаче"}
        this.API = APIManager.getInstance()
    }

    async componentDidMount(): Promise<void> {
        let response = await fetch(this.API.BACK_GET_TASK_ADDRESS.replace("{id}", this.props.taskId))
        if(response.ok){
            let task = await response.json()
            this.setState({task:task, message:undefined})
        }
        else{
            console.error("Ошибка при получении задачи - " + response.statusText)
            this.setState({message:"Ошибка при получении задачи - " + response.statusText})
        }
    }

    render(): React.ReactNode {
        if(this.state.message){
            return (
                <div className="task-info-message">
                    <p>
                        {
                            this.state.message
                        }
                    </p>
                </div>
            )
        }

        return (
            <div className="task-info">
                <h1>Информация о задаче</h1>
                
                <div className="text-info">
                    <div className="horizontal">
                        <div className="item">
                            <p>
                                Название:
                            </p>
                        </div>
                        <div className="item">
                            <p>
                                {
                                    this.state.task!.title
                                }
                            </p>
                        </div>
                    </div>
                    <div className="horizontal">
                        <div className="item">
                            <p>
                                Описание:
                            </p>
                        </div>
                        <div className="item">
                            <p>
                                {
                                    this.state.task!.message
                                }
                            </p>
                        </div>
                    </div>
                    <div className="horizontal">
                        <div className="item">
                            <p>
                                Начало:
                            </p>
                        </div>
                        <div className="item">
                            <p>
                                {
                                    new Date(this.state.task!.end).toLocaleString()
                                }
                            </p>
                        </div>
                    </div>
                    <div className="horizontal">
                        <div className="item">
                            <p>
                                Конец:
                            </p>
                        </div>
                        <div className="item">
                            <p>
                                {
                                    new Date(this.state.task!.end).toLocaleString()
                                }
                            </p>
                        </div>
                    </div>
                    <div className="horizontal">
                        <div className="item">
                            <p>
                                Создана:
                            </p>
                        </div>
                        <div className="item">
                            <p>
                                {
                                    new Date(this.state.task!.createdAt).toLocaleString()
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="back">
                    <Button text="к списку задач" onClick={() => this.props.changeMode(Mode.TASK_LIST)} />
                </div>
            </div>
        )
    }
}