import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";
import { storage_v1 } from "googleapis";

interface ResourcesDialogProps {
  show: boolean;
  onClose: () => void;
  buckets: storage_v1.Schema$Bucket[] | null | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const ResourcesDialog: React.FC<ResourcesDialogProps> = ({
  show,
  onClose,
  buckets,
  isLoading,
  isError,
  error,
}) => {
  if (!show) return null;

  return (
    <AlertDialog.Root defaultOpen>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow backdrop-blur-sm" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none data-[state=open]:animate-contentShow">
          <div className="flex justify-between items-center mb-6">
            <AlertDialog.Title className="text-lg font-semibold">
              GCP Resources
            </AlertDialog.Title>
            <AlertDialog.Cancel asChild onClick={onClose}>
              <button className="rounded-full p-1 hover:bg-gray-100">
                <X className="h-4 w-4" />
              </button>
            </AlertDialog.Cancel>
          </div>

          <div className="mb-6">
            {isLoading ? (
              <p className="text-center py-4">Loading resources...</p>
            ) : isError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">
                  Error loading resources: {error?.message}
                </p>
              </div>
            ) : buckets?.length === 0 ? (
              <p className="text-center py-4">No storage buckets found.</p>
            ) : (
              <div className="space-y-3">
                <p className="text-base font-semibold text-black">
                  Storage Buckets ({buckets?.length || 0})
                </p>

                <div className="overflow-x-auto rounded-lg bg-white">
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b text-left font-medium">
                          Name
                        </th>
                        <th className="px-4 py-2 border-b text-left font-medium">
                          Location
                        </th>
                        <th className="px-4 py-2 border-b text-left font-medium">
                          Storage Class
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {buckets?.map((bucket) => (
                        <tr key={bucket.id} className="hover:bg-gray-100">
                          <td className="px-4 py-2 border-b">{bucket.name}</td>
                          <td className="px-4 py-2 border-b">
                            {bucket.location}
                          </td>
                          <td className="px-4 py-2 border-b">
                            {bucket.storageClass}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ResourcesDialog;
