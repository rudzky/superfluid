"use client";

import Image from "next/image";
import { Control, useController } from "react-hook-form";

import { TCreateWorkspaceSchema } from "@/actions/create-workspace/types";

import { UploadButton } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { toast } from "sonner";

interface Props {
  endpoint: "serverImage";
  control: Control<TCreateWorkspaceSchema>;
}

export default function FileUpload({ endpoint, control }: Props) {
  const {
    field: { value, onChange },
  } = useController({
    name: "imageUrl",
    control,
  });

  return (
    <div className="mt-4">
      {value ? (
        <div className="grid gap-1">
          <div className="relative w-14 aspect-square">
            <button
              className="peer absolute w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 grid place-items-center -right-2 -top-2 z-10"
              onClick={() => onChange("")}
            >
              <i className="ri-close-line"></i>
            </button>
            <Image
              fill
              src={value}
              alt="Upload"
              className="w-full object-cover rounded-md peer-hover:brightness-50 transition-[filter]"
            />
          </div>
          <p className="text-xs leading-5 text-green-400">
            Uploaded successfully!
          </p>
        </div>
      ) : (
        <UploadButton
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            onChange(res[0].url);
          }}
          onUploadError={(error: Error) => {
            console.error(error);
            toast.error("Something went wrong while uploading!");
            onChange("");
          }}
          onBeforeUploadBegin={(files) => {
            return files.map(
              (f) => new File([f], "renamed-" + f.name, { type: f.type })
            );
          }}
          content={{
            button({ ready, isUploading, uploadProgress }) {
              if (isUploading)
                return (
                  <div className="group w-full h-full grid place-items-center">
                    <i className="ri-loader-4-line animate-spin"></i>
                  </div>
                );

              if (ready)
                return (
                  <div className="group w-full h-full grid place-items-center">
                    <i className="ri-image-add-line"></i>
                    <div className="grid opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/75 place-items-center transition-opacity">
                      <span className="text-center text-xs leading-tight">
                        Upload image
                      </span>
                    </div>
                  </div>
                );

              return (
                <div>
                  <i className="ri-image-add-line"></i>
                </div>
              );
            },
            allowedContent({ ready, fileTypes, isUploading, uploadProgress }) {
              if (!ready) return "Getting ready...";
              if (isUploading) return `Uploading ${uploadProgress}%`;
              return `Pick a logo for your workspace. Recommended size is 256x256px.`;
            },
            clearBtn({}) {
              return <button className="bg-green-500 p-2">Clear</button>;
            },
          }}
          className="items-start ut-button:bg-red-500 ut-readying:ut-button:opacity-25 ut-button:w-14 ut-button:h-auto ut-button:aspect-square ut-uploading:animate-pulse ut-clear-btn:w-10 ut-clear-btn:h-10 ut-clear-btn:bg-green-500 ut-allowed-content:text-gray-400 ut-allowed-content:h-auto"
        />
      )}
    </div>
  );
}
