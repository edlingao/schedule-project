export default{
    getTasks: '/schedule',
    postTasks: '/schedule',
    deleteTask: (taskID) => `/schedule/${taskID}`,
    getTaskFromDay: (dayName) => `/schedule-day/${dayName}`,
}