import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import LoadingSpinner from "./LoadingSpinner";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* modal */}
      <div className="relative w-full max-w-md rounded-xl bg-muted-foreground p-6 shadow-lg text-foreground">
        <div className="mb-4 flex items-center gap-4">
          <div className="shrink-0">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {title}
            </h3>
            <p className="text-foreground">{message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant={"default"} onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={"destructive"}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="sm" /> : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
