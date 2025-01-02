import type { ImageOptions } from "@tiptap/extension-image";
import { Image as TiptapImage } from "@tiptap/extension-image";
import type { Attrs } from "@tiptap/pm/model";
import type { Editor } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { nanoid } from "nanoid";
import { ImageViewBlock } from "../components/image/image-view-block";
import { FileError, FileValidationOptions, filterFiles } from "../utils";

export type UploadReturnType =
  | string
  | {
      id: string | number;
      src: string;
      path: string;
    };

type ImageAttr = {
  src: string | File;
  alt?: string;
  title?: string;
};

interface CustomImageOptions
  extends ImageOptions,
    Omit<FileValidationOptions, "allowBase64"> {
  uploadFn?: (
    file: File,
    id: string,
    editor: Editor
  ) => Promise<UploadReturnType>;
  onImageRemoved?: (props: Attrs) => void;
  onValidationError?: (errors: FileError[]) => void;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    setImages: {
      setImages: (attrs: ImageAttr[]) => ReturnType;
    };
  }
}

export const Image = TiptapImage.extend<CustomImageOptions>({
  atom: true,

  addOptions() {
    return {
      ...this.parent?.(),
      allowedMimeTypes: [],
      maxFileSize: 0,
      uploadFn: undefined,
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      blobSrc: {
        default: null,
      },
      alt: {
        default: "rich text editor image",
      },
      title: {
        default: null,
      },
      id: {
        default: null,
      },
      path: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setImages:
        (attrs) =>
        ({ commands }) => {
          const [validImages, errors] = filterFiles(attrs, {
            allowedMimeTypes: this.options.allowedMimeTypes,
            maxFileSize: this.options.maxFileSize,
            allowBase64: this.options.allowBase64,
          });

          if (errors.length > 0 && this.options.onValidationError) {
            this.options.onValidationError(errors);
          }

          if (validImages.length > 0) {
            return commands.insertContent(
              validImages.map((image) => {
                if (image.src instanceof File) {
                  const blobUrl = URL.createObjectURL(image.src);
                  const id = nanoid();

                  return {
                    type: this.type.name,
                    attrs: {
                      id,
                      blobSrc: blobUrl,
                      alt: image.alt,
                      title: image.title,
                      fileName: image.src.name,
                    },
                  };
                } else {
                  return {
                    type: this.type.name,
                    attrs: {
                      id: nanoid(),
                      blobSrc: image.src,
                      alt: image.alt,
                      title: image.title,
                      fileName: null,
                    },
                  };
                }
              })
            );
          }

          return false;
        },
    };
  },

  onTransaction({ transaction }) {
    const currentNodeIds = new Set<string>();

    // Collect current node IDs
    transaction.doc.descendants((node) => {
      const attrs = node.attrs;
      if (node.type.name === "image" && attrs?.id) {
        currentNodeIds.add(attrs.id);
      }
    });

    // Detect deleted nodes
    transaction.before.descendants((node) => {
      const attrs = node.attrs;
      if (
        node.type.name === "image" &&
        attrs?.id &&
        !currentNodeIds.has(attrs.id)
      ) {
        if (attrs.blobSrc?.startsWith("blob:")) {
          URL.revokeObjectURL(attrs.blobSrc);
        }

        if (attrs.src) {
          this.options.onImageRemoved?.(attrs);
        }
      }
    });
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageViewBlock, { className: "block-node" });
  },
});
