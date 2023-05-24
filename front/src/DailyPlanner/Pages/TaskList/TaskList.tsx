import React from "react";
import { Mode } from "../MainPage/Main";
import APIManager from "../../API/APIManager";
import Task from "../../API/Models/Task";
import { Button, List } from "../../../Components/Components";
import "./TaskList.css"
import Clipboard from "../../../Icons/Clipboard.svg"

interface IProps{
    changeMode:(mode:Mode, id?:string) => void
}

interface IState{
    message?:string
    tasks?:Task[]
}

export default class TaskList extends React.Component<IProps, IState>{
    protected API?:APIManager;
    
    constructor(props:IProps){
        super(props);

        this.state = {message:"Идет загрузка задач"}
        this.API = APIManager.getInstance()

        this.deleteTask = this.deleteTask.bind(this)
    }

    async deleteTask(id:string){
        let response = await fetch(this.API!.BACK_DELETE_TASK_ADDRESS.replace("{id}", id), {
            method:"DELETE"
        })

        if(response.ok){
            let deletedTask:Task = await response.json()
            alert(`Задача \"${deletedTask.title}\" удалена`)

            this.setState({tasks:this.state.tasks!.filter(task => task.id != deletedTask.id)})
        }
        else{
            console.error("Ошибка при удалении задачи - " + response.statusText)
            this.setState({message:"Ошибка при удалении задачи - " + response.statusText})
        }
    }

    async componentDidMount(): Promise<void> {
        let response = await fetch(this.API!.BACK_GET_TASKS_ADDRESS, {
            method:"GET"
        })

        if(response.ok){
            let data:Task[] = await response.json();
            this.setState({tasks:data, message:undefined})
        }
        else{
            console.error("Ошибка при получении списка задач от сервера - " + response.statusText)
            this.setState({message:"Ошибка при получении списка задач от сервера - " + response.statusText})
        }
    }

    render(): React.ReactNode {
        if(this.state.message){
            return (
                <div className="task-list-message">
                    <p>
                        {
                            this.state.message
                        }
                    </p>
                </div>
            )
        }

        return(
            <div className="task-list">
                <h1>Список задач</h1>
                <Button text="Создать задачу" onClick={() => this.props.changeMode(Mode.CREATE_TASK)} />
                <div>
                    <List items={
                        this.state!.tasks!.map((task, index) => {
                            return {
                                elements:[
                                    <img src={Clipboard} />,
                                    <p>
                                        {
                                            task.title
                                        }
                                    </p>,
                                    <p>
                                        {
                                            task.message
                                        }
                                    </p>,
                                    <Button text="Подробнее" onClick={() => this.props.changeMode(Mode.TASK_INFO, task.id)} />,
                                    <Button text="Удалить" onClick={() => this.deleteTask(task.id)} />
                                ]
                            }
                        })
                    } />
                </div>
            </div>
            
        )
    }
}