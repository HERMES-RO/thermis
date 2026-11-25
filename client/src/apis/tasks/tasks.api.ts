 import { app_axios_interface } from "@/axios/axiosInstance";
import type {
  tasksAPI_type,
  updateTaskPlayload,
} from "@/types/tasks/tasks.type";

const task_base_url = "task_board";

export const get_tasks = async () => {
  try {
    const tasks_list_response = await app_axios_interface.get(
      `${task_base_url}`,
    );

    return tasks_list_response.data;
  } catch (error) {
    return error ;
  }
};

export const add_task = async (values: tasksAPI_type) => {
  try {
    await app_axios_interface.post(`${task_base_url}/create`, values);

    return { sucess: true, data: {} };
  } catch (error) {
    return { sucess: false, error };
  }
};

export const get_task_type_data = async () => {
  try {
    const task_type_list = await app_axios_interface.get(
      `${task_base_url}/task_type`,
    );

    return task_type_list.data ;
  } catch (error) {
    return error
  }
};

export const update_task = async (
  task_id: string,
  value: updateTaskPlayload,
) => {
  try {
    const update_task = await app_axios_interface.patch(
      `${task_base_url}/update/tasks/${task_id}`,
      value,
    );

    return { sucess: true, data: update_task.data };
  } catch (error) {
    return { sucess: false, error };
  }
};

export const delete_task = async (taskid: string) => {
  try {
    await app_axios_interface.delete(`${task_base_url}/delete_task/${taskid}`);
    return { sucess: true, data: "Delted Task" };
  } catch (error) {
    return { sucess: false, error };
  }
};
