export default class APIManager{
    public BACK_SCHEMA = "http"
    public BACK_HOST = "localhost"
    public BACK_PORT = 8000

    public BACK_ADDRESS = `${this.BACK_SCHEMA}://${this.BACK_HOST}:${this.BACK_PORT}/`
    public BACK_GET_TASKS_ADDRESS = this.BACK_ADDRESS + `Tasks/GetTasks`
    public BACK_GET_TASK_ADDRESS = this.BACK_ADDRESS + `Tasks/GetTask/{id}`
    public BACK_DELETE_TASK_ADDRESS = this.BACK_ADDRESS + `Tasks/DeleteTask/{id}`
    public BACK_CREATE_TASK_ADDRESS = this.BACK_ADDRESS + `Tasks/CreateTask`
    
    public static instance:APIManager;

    public static getInstance(){
        if(APIManager.instance){
            return APIManager.instance
        }

        APIManager.instance = new APIManager()
        return APIManager.instance
    }
}