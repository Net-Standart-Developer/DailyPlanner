import React from "react";
import CreateTaskViewModel from "../../API/ViewModels/CreateTaskViewModel";
import { Button, Input } from "../../../Components/Components";
import { Mode } from "../MainPage/Main";
import APIManager from "../../API/APIManager";
import "./CreateTask.css"

interface IState{
    title?:string
    message?:string
    start?:string
    end?:string
}

interface IProps{
    changeMode:(mode:Mode) => void
}

export default class CreateTask extends React.Component<IProps, IState>{
    API:APIManager
    
    constructor(props:IProps){
        super(props)

        this.state = {}

        this.createTask = this.createTask.bind(this)
        this.API = APIManager.getInstance()
    }

    async createTask(){
        let {title, message, start, end} = this.state
        if(title && message && start && end){
            let newTask = new CreateTaskViewModel(title, message, start, end)
            let response = await fetch(this.API.BACK_CREATE_TASK_ADDRESS, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newTask)
            })

            if(response.ok){
                alert(`Задача ${newTask.title} успешно создана`)
                this.props.changeMode(Mode.TASK_LIST)
            }
            else{
                console.error("Ошибка при создании задачи - " + response.statusText)
                alert("Ошибка при создании задачи - " + response.statusText)
                this.props.changeMode(Mode.TASK_LIST)
            }
        }
        else{
            alert("Данные не заполнены")
        }
    }

    render(): React.ReactNode {
        return(
            <div className="create-task">
                <h1>Создание задачи</h1>
                <div className="horizontal">
                    <div className="item">
                        <p>
                            Название
                        </p>
                    </div>
                    <div className="item">
                        <Input type="text" value={this.state.title} 
                            onChange={(text) => this.setState({title:text})} />
                    </div>
                </div>
                <div className="horizontal">
                    <div className="item">
                        <p>
                            Описание
                        </p>
                    </div>
                    <div className="item">
                        <Input type="text" value={this.state.message} 
                            onChange={(text) => this.setState({message:text})} />
                    </div>
                </div>
                <div className="horizontal">
                    <div className="item">
                        <p>
                            Дата начала задачи
                        </p>
                    </div>
                    <div className="item">
                        <Input type="date" value={this.state.start} 
                            onChange={(text) => this.setState({start:text})} />
                    </div>
                </div>
                <div className="horizontal">
                    <div className="item">
                        <p>
                            Дата завершения задачи
                        </p>
                    </div>
                    <div className="item">
                        <Input type="date" value={this.state.end} 
                            onChange={(text) => this.setState({end:text})} />
                    </div>
                </div>
                <Button text="Создать задачу" onClick={() => this.createTask()} />
                <Button text="К списку задач" onClick={() => this.props.changeMode(Mode.TASK_LIST)} />
            </div>
        )
    }
}