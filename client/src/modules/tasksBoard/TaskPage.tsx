import AddtaskForm from "@/components/form/addtask.form";
import { TaskKanban } from "@/components/Kanban/Taskkanban";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const TaskPage = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Dialog>
          <DialogTrigger
            render={
              <Button variant="outline">
                {" "}
                <Plus /> Add Task
              </Button>
            }
          />
          <DialogContent className="sm:max-w-sm" >
            <AddtaskForm />
          </DialogContent>
        </Dialog>
        <TaskKanban />
      </div>
    </>
  );
};

export default TaskPage;
