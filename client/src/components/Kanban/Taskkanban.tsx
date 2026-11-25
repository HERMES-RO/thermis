import {
  delete_task,
  update_task
} from "@/apis/tasks/tasks.api";
import { Badge } from "@/components/reui/badge";
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
  type KanbanCommitMeta,
} from "@/components/reui/kanban";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GetTaskQuery, GetTaskTypeQuery } from "@/hooks/useTasks";
import { type tasksAPI_type, type tasksType } from "@/types/tasks/tasks.type";
import { useQuery } from "@tanstack/react-query";
import { Ellipsis, GripVerticalIcon } from "lucide-react";
import { ComponentProps, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface TaskCardProps extends Omit<
  ComponentProps<typeof KanbanItem>,
  "value" | "children"
> {
  task: tasksAPI_type;
  asHandle?: boolean;
  isOverlay?: boolean;
}

function TaskCard({ task, asHandle, isOverlay, ...props }: TaskCardProps) {
  const handelDelete = async (taskId: string) => {
    const reponse = await delete_task(taskId);

    if (reponse.sucess === true) {
      console.log("delted task");
    } else {
      console.log("not deleted");
    }
  };
  const cardContent = (
    <Card>
      <CardContent className="space-y-2.5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Badge
              variant={
                task.priority === "high"
                  ? "destructive-light"
                  : task.priority === "medium"
                    ? "primary-light"
                    : "warning-light"
              }
              className="pointer-events-none h-5 shrink-0 rounded-sm px-1.5 text-xs capitalize"
            >
              {task.priority}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" />}>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <Button onClick={() => handelDelete(task.id)}>
                      Delete
                    </Button>
                  </DropdownMenuLabel>
                  {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
                  {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="line-clamp-1 text-sm font-medium text-left">
            {task.task_name}
          </div>
          <div className="font-light text-justify">{task.description}</div>
        </div>
        {/* <div className="text-muted-foreground flex items-center justify-between text-xs">
          {task.assignee_to && (
            <div className="flex items-center gap-1">
              <Avatar className="size-4">
              
                <AvatarFallback>{task.assignee_to.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="line-clamp-1">{task.assignee_to}</span>
            </div>
        )}
        
        </div> */}
      </CardContent>
    </Card>
  );

  return (
    <KanbanItem value={task.id} {...props}>
      {asHandle && !isOverlay ? (
        <KanbanItemHandle>{cardContent}</KanbanItemHandle>
      ) : (
        cardContent
      )}
    </KanbanItem>
  );
}

interface TaskColumnProps extends Omit<
  ComponentProps<typeof KanbanColumn>,
  "children"
> {
  tasks: tasksAPI_type[];
  isOverlay?: boolean;
}

function TaskColumn({ value, tasks, isOverlay, ...props }: TaskColumnProps) {
  return (
    <KanbanColumn value={value} {...props}>
      <Card className="mb-2.5">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold">{value}</span>
            <Badge variant="outline">{tasks.length}</Badge>
          </div>
          <KanbanColumnHandle
            render={(props) => (
              <Button {...props} size="icon-xs" variant="ghost">
                <GripVerticalIcon />
              </Button>
            )}
          />
        </CardHeader>
        <CardContent>
          <KanbanColumnContent value={value} className="flex flex-col gap-2.5">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                asHandle={!isOverlay}
                isOverlay={isOverlay}
              />
            ))}
          </KanbanColumnContent>
        </CardContent>
      </Card>
    </KanbanColumn>
  );
}

export function TaskKanban() {
  const [taskData, setTaskData] = useState<tasksAPI_type[]>([]);
  const [taskTypes, setTaskTypes] = useState<tasksType[]>([]);

const get_tasks = useQuery(GetTaskQuery());
const get_task_type =useQuery(GetTaskTypeQuery())
console.log(taskData , taskTypes)
if(get_tasks.data && get_task_type.data){
   setTaskData(get_tasks.data || []);
  setTaskTypes(get_task_type.data || []);
}
  
  // useEffect(() => {
  //   const fetch_tasks_list = async () => {
  //     const taskDataReponse = await get_tasks();
  //     const taskTypeResponse = await get_task_type_data();
  //     if (taskDataReponse.sucess === true && taskTypeResponse.sucess === true) {
  //       setTaskData(taskDataReponse.data.data || []);
  //       setTaskTypes(taskTypeResponse.data.data || []);
  //     } else {
  //       console.log(taskDataReponse.error || taskTypeResponse.error);
  //     }
  //   };

  //   fetch_tasks_list();
  // }, []);

  const columns = useMemo(() => {
    const empty_col = taskTypes.reduce<Record<string, tasksAPI_type[]>>(
      (group, type) => {
        group[type.title] = [];
        return group;
      },
      { Draft: [] },
    );
    return taskData.reduce<Record<string, tasksAPI_type[]>>((group, task) => {
      const task_type = task?.task_type?.title;
      const key = task_type ?? "Draft";
      if (!group[key]) {
        group[key] = [];
      }

      group[key].push(task);
      return group;
    }, empty_col);
  }, [taskData, taskTypes]);

  const handleColumnsChange = (
    updatedColumns: Record<string, tasksAPI_type[]>,
  ) => {
    const updatedTasks = Object.entries(updatedColumns).flatMap(
      ([columnTitle, columnTasks]) => {
        const columnType = taskTypes.find((t) => t.title === columnTitle);
        return columnTasks.map((task) => ({ ...task, task_type: columnType }));
      },
    );

    setTaskData(updatedTasks);
  };
  const handleTaskMoved = async (
    finalColumns: Record<string, tasksAPI_type[]>,
    meta: KanbanCommitMeta<tasksAPI_type>,
  ) => {
    if (meta.kind != "item" || meta.activeContainer === meta.overContainer)
      return;

    const task = finalColumns[meta.overContainer][meta.overIndex];
    const newType = taskTypes.find((t) => t.title === meta.overContainer);

    const response = await update_task(task.id as string, {
      task_name: task.task_name,
      description: task.description ?? undefined,
      priority: task.priority,
      assignee_to: task.assignee_to ?? undefined,
      task_type: newType?.id, // undefined for "Draft", saved as NULL
    });

    if (!response.sucess) {
      console.log(response.error);
      handleColumnsChange(meta.previousValue);
    }
  };
  const typeMap = Object.fromEntries(taskTypes.map((t) => [t.id, t.title]));
  return (
    <Kanban
      value={columns}
      onValueChange={handleColumnsChange}
      onValueCommit={handleTaskMoved}
      getItemValue={(item) => item.id}
    >
      <KanbanBoard className="grid auto-rows-fr grid-cols-3">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <TaskColumn
            key={columnValue}
            value={columnValue}
            tasks={tasks}
            title={typeMap[columnValue] ?? "Draft"}
          />
        ))}
      </KanbanBoard>
      <KanbanOverlay className="bg-muted/10 rounded-md border-2 border-dashed" />
    </Kanban>
  );
}
