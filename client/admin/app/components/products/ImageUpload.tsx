import { ImagePlus } from "lucide-react";
import { useRef } from "react";

interface ImageUploadProps {
  onFilesSelect: (files: FileList) => void;
}

export function ImageUpload({ onFilesSelect }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="space-y-3">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) onFilesSelect(e.target.files);
        }}
      />

      {/* Custom upload box */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-black hover:text-black transition"
      >
        <ImagePlus size={36} />
        <span className="text-sm font-medium">Click to upload images</span>
        <span className="text-xs text-gray-400">
          PNG, JPG, WEBP • Multiple allowed
        </span>
      </button>
    </div>
  );
}
