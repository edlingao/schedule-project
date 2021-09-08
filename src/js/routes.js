export default{
    login: '/api/user/login',
    register: '/api/user/register',
    getTasks: '/api/schedule',
    postTasks: '/api/schedule',
    deleteTask: (taskID) => `/api/schedule/${taskID}`,
    getTaskFromDay: (dayName) => `/api/schedule/${dayName}`,
    getAllTasks: `/api/schedule/actvities`
}