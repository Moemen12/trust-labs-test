import React, { useState, useEffect } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { cloudresourcemanager_v1 } from "googleapis";

interface ProjectSelectorDialogProps {
  show: boolean;
  onClose: () => void;
  projects: cloudresourcemanager_v1.Schema$Project[] | undefined;
  selectedProjectId: string | null;
  onSelectProject: (projectId: string) => void;
  onConfirm: (projectId: string) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const ProjectSelectorDialog: React.FC<ProjectSelectorDialogProps> = ({
  show,
  onClose,
  projects,
  selectedProjectId,
  onSelectProject,
  onConfirm,
  isLoading,
  isError,
  error,
}) => {
  const [localSelectedId, setLocalSelectedId] = useState<string | null>(
    selectedProjectId
  );

  useEffect(() => {
    setLocalSelectedId(selectedProjectId);
  }, [selectedProjectId]);

  if (!show) return null;

  const handleProjectSelection = (projectId: string) => {
    setLocalSelectedId(projectId);
    onSelectProject(projectId);
  };

  const handleConfirm = () => {
    if (localSelectedId) {
      onConfirm(localSelectedId);
    }
  };

  return (
    <AlertDialog.Root defaultOpen>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow backdrop-blur-sm" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none data-[state=open]:animate-contentShow">
          <div className="flex justify-between items-center mb-6">
            <AlertDialog.Title className="text-lg font-semibold">
              Select GCP Project
            </AlertDialog.Title>
            <AlertDialog.Cancel asChild onClick={onClose}>
              <button className="rounded-full p-1 hover:bg-gray-100">
                <X className="h-4 w-4" />
              </button>
            </AlertDialog.Cancel>
          </div>

          <div className="mb-6 max-h-[50vh] overflow-y-auto no-scrollbar">
            {isLoading ? (
              <p className="text-center">Loading projects...</p>
            ) : isError ? (
              <p className="text-red-600">
                Error loading projects: {error?.message}
              </p>
            ) : projects && projects.length === 0 ? (
              <p className="text-center">No projects available.</p>
            ) : (
              projects?.map(({ projectId, createTime, name }) => (
                <div
                  key={projectId}
                  className={`border rounded-lg p-4 cursor-pointer mb-3 ${
                    localSelectedId === projectId
                      ? "border-purple-600 bg-blue-50"
                      : "border-purple-200 bg-purple-50/50"
                  } hover:bg-purple-50`}
                  onClick={() => handleProjectSelection(projectId!)}
                >
                  <h3 className="font-medium mb-1">{name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Project ID: {projectId}
                  </p>
                  <p className="text-sm text-gray-500">
                    Created: {formatDate(createTime!)}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                className="bg-purple-600"
                onClick={handleConfirm}
                disabled={!localSelectedId}
              >
                Confirm Selection
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ProjectSelectorDialog;
