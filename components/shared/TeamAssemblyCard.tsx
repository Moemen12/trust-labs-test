"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { tasks as initialTasks, policies, STORAGE_KEY } from "@/constants";
import { AuthSession, Task } from "@/types";
import { getGcpProjects, getStorageBuckets } from "@/lib/actions/auth.action";
import ProjectSelectorDialog from "./dialogs/ProjectSelectorDialog";
import ResourcesDialog from "./dialogs/ResourcesDialog";
import TaskItem from "./TaskItem";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";

interface SavedProject {
  taskIndex: number;
  projectId: string;
}

const TeamAssemblyCard: React.FC<{ session: AuthSession }> = ({ session }) => {
  const searchParams = useSearchParams();

  const [projectState, setProjectState] = useState({
    selector: {
      show: searchParams.get("showgcpselector") === "true" && !!session,
      taskIndex: null as number | null,
    },
    selectedId: null as string | null,
    confirmedId: null as string | null,
  });

  const [dialogState, setDialogState] = useState({
    showResources: false,
    isSectionOpen: false,
  });

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    if (searchParams.get("showgcpselector") === "true" && session) {
      setProjectState((prev) => ({
        ...prev,
        selector: { show: true, taskIndex: 0 },
      }));
    }
  }, [session, searchParams]);

  useEffect(() => {
    const savedProjects = localStorage.getItem(STORAGE_KEY);
    if (savedProjects) {
      const parsedProjects: SavedProject[] = JSON.parse(savedProjects);

      setTasks((prevTasks) =>
        prevTasks.map((task, index) => {
          const savedProject = parsedProjects.find(
            (p) => p.taskIndex === index
          );
          return savedProject
            ? { ...task, confirmedProjectId: savedProject.projectId }
            : task;
        })
      );
    }
  }, []);

  const { data: gcpProjects, ...projectsQuery } = useQuery({
    queryKey: ["gcp-projects"],
    queryFn: getGcpProjects,
  });

  const { data: storageBuckets, ...bucketsQuery } = useQuery({
    queryKey: ["storage-buckets", projectState.confirmedId],
    queryFn: () =>
      projectState.confirmedId
        ? getStorageBuckets(projectState.confirmedId)
        : null,
    enabled: !!projectState.confirmedId,
  });

  const handleProjectConfirmation = useCallback(
    (projectId: string) => {
      if (projectState.selector.taskIndex !== null) {
        setTasks((prevTasks: Task[]) =>
          prevTasks.map((task, index) =>
            index === projectState.selector.taskIndex
              ? { ...task, confirmedProjectId: projectId }
              : task
          )
        );
        const savedProjects = localStorage.getItem(STORAGE_KEY);
        const parsedProjects: SavedProject[] = savedProjects
          ? JSON.parse(savedProjects)
          : [];

        const updatedProjects = [
          ...parsedProjects.filter(
            (p) => p.taskIndex !== projectState.selector.taskIndex
          ),
          { taskIndex: projectState.selector.taskIndex, projectId },
        ];

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));

        setProjectState((prev) => ({
          ...prev,
          confirmedId: projectId,
          selector: { show: false, taskIndex: null },
        }));
      }
    },
    [projectState.selector.taskIndex]
  );

  const handleFetchResources = useCallback(
    async (taskIndex: number) => {
      const task = tasks[taskIndex];
      if (task.confirmedProjectId) {
        setProjectState((prev) => ({
          ...prev,
          confirmedId: task.confirmedProjectId,
        }));
        await bucketsQuery.refetch();
        setDialogState((prev) => ({ ...prev, showResources: true }));
      }
    },
    [tasks, bucketsQuery]
  );

  const handleChangeProject = useCallback((taskIndex: number) => {
    setProjectState((prev) => ({
      ...prev,
      selector: { show: true, taskIndex },
    }));
  }, []);

  const toggleSection = useCallback(() => {
    setDialogState((prev) => ({
      ...prev,
      isSectionOpen: !prev.isSectionOpen,
    }));
  }, []);

  const memoizedTasks = useMemo(
    () =>
      tasks.map((task: Task, index: number) => (
        <TaskItem
          key={task.title}
          task={task}
          taskIndex={index}
          session={session}
          onSelectProject={() =>
            setProjectState((prev) => ({
              ...prev,
              selector: { show: true, taskIndex: index },
            }))
          }
          onFetchResources={() => handleFetchResources(index)}
          onDebugConnection={() => handleChangeProject(index)}
        />
      )),
    [tasks, session, handleFetchResources, handleChangeProject]
  );

  return (
    <>
      <ProjectSelectorDialog
        show={projectState.selector.show}
        onClose={() =>
          setProjectState((prev) => ({
            ...prev,
            selector: { show: false, taskIndex: null },
          }))
        }
        projects={gcpProjects}
        selectedProjectId={projectState.selectedId}
        onSelectProject={(id) =>
          setProjectState((prev) => ({
            ...prev,
            selectedId: id,
          }))
        }
        onConfirm={handleProjectConfirmation}
        isLoading={projectsQuery.isLoading}
        isError={projectsQuery.isError}
        error={projectsQuery.error}
      />

      <ResourcesDialog
        show={dialogState.showResources}
        onClose={() =>
          setDialogState((prev) => ({
            ...prev,
            showResources: false,
          }))
        }
        buckets={storageBuckets}
        isLoading={bucketsQuery.isLoading}
        isError={bucketsQuery.isError}
        error={bucketsQuery.error}
      />

      <div className="space-y-4">
        {memoizedTasks}

        <div className="border rounded-lg p-4 text-center">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="cursor-pointer" onClick={toggleSection}>
                  <div className="flex items-center gap-2 justify-center mb-1">
                    <h3 className="font-bold">
                      Upload HR & Risk policies (Optional)
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Policies are the foundation of your security program. Upload
                    existing policies and we can help you with what is missing.{" "}
                    <br />
                    <span className="text-purple-600 font-medium inline-block mt-3">
                      Getting Started with Policies (coming soon)
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    0 of 4 complete
                  </span>

                  <button className="p-2">
                    {dialogState.isSectionOpen ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronUp className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {dialogState.isSectionOpen && (
                <div className="mt-4">
                  {policies.map((policy: string) => (
                    <div
                      key={policy}
                      className="flex justify-between items-center rounded-lg p-2"
                    >
                      <span className="text-muted-foreground text-xs lg:text-sm">
                        {policy}
                      </span>
                      <button className="sm:px-4 px-2 py-2 sm:py-2 border border-gray-300 rounded-lg text-xs bg-white hover:bg-gray-100">
                        Upload policy
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamAssemblyCard;
