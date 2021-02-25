export default{
    getTasks: '/schedule',
    postTasks: '/schedule',
    deleteTask: (taskID) => `/schedule/${taskID}` 
}