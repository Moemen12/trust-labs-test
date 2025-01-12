import React, { JSX } from "react";
import { AuthSession, Task } from "@/types";
import SignIn from "./auth/SignIn";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

interface TaskItemProps {
  task: Task;
  taskIndex: number;
  session: AuthSession;
  onSelectProject: () => void;
  onFetchResources: () => void;
  onDebugConnection: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  session,
  onSelectProject,
  onFetchResources,
  onDebugConnection,
}) => {
  const {
    icon: Icon,
    title,
    description,
    details,
    buttonText,
    confirmedProjectId,
    progress,
  } = task;

  const handleAction = (): void => {
    if (confirmedProjectId) {
      onFetchResources();
    } else {
      onSelectProject();
    }
  };

  const ProgressDisplay: React.FC = (): JSX.Element => (
    <span className="text-sm text-muted-foreground">
      {session && confirmedProjectId ? progress.total : 0} of {progress.total}{" "}
      complete
    </span>
  );

  return (
    <div className="border rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {description}
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                {session && confirmedProjectId ? (
                  <span className="flex items-center">
                    <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mr-2">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </span>
                    Connected to GCP
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border"></span>
                    <span>{details}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <ProgressDisplay />
              {session ? (
                confirmedProjectId ? (
                  <>
                    <Button
                      onClick={onFetchResources}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Fetch Resources
                    </Button>
                    <Button variant="outline" onClick={onDebugConnection}>
                      Switch Project
                    </Button>
                  </>
                ) : (
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
                    onClick={handleAction}
                  >
                    {buttonText}
                  </Button>
                )
              ) : (
                <SignIn textBtn={buttonText} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
