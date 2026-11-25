import { get_task_type_data, get_tasks } from "@/apis/tasks/tasks.api"
import { queryOptions } from "@tanstack/react-query"

export const GetTaskQuery = () =>{
    return queryOptions({
        queryKey:["get_tasks"],
        queryFn:get_tasks,
        
    })
}

export const GetTaskTypeQuery = ()=>{
    return queryOptions({
        queryKey:["get_task_type"],
        queryFn:get_task_type_data
    })
}