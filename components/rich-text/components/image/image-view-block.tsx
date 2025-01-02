import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { UploadReturnType } from "../../extensions/image";
import { ImageOverlay } from "./image-overlay";

const MAX_HEIGHT = 600;
const MIN_HEIGHT = 120;
const MIN_WIDTH = 120;

type ElementDimensions = { width: number; height: number };

interface ImageState {
  isServerUploading: boolean;
  imageLoaded: boolean;
  error: boolean;
  naturalSize: ElementDimensions;
}

const normalizeUploadResponse = (res: UploadReturnType) => ({
  src: typeof res === "string" ? res : res.src,
  id: typeof res === "string" ? nanoid() : res.id,
  path: typeof res === "string" ? null : res.path,
});

function ImageViewBlockComponent({
  editor,
  node,
  selected,
  updateAttributes,
}: NodeViewProps) {
  const {
    blobSrc: initialSrc,
    width: initialWidth,
    height: initialHeight,
    fileName,
  } = node.attrs;
  const uploadAttemptedRef = useRef(false);

  const [imageState, setImageState] = useState<ImageState>({
    isServerUploading: false,
    imageLoaded: false,
    error: false,
    naturalSize: { width: initialWidth, height: initialHeight },
  });
  const aspectRatio =
    imageState.naturalSize.width / imageState.naturalSize.height;
  const maxWidth = MAX_HEIGHT * aspectRatio;

  const updateImageState = useCallback(
    (updates: Partial<ImageState>) =>
      setImageState((prev) => ({ ...prev, ...updates })),
    []
  );

  const handleImageLoad = useCallback(
    (ev: React.SyntheticEvent<HTMLImageElement>) => {
      const img = ev.target as HTMLImageElement;
      const newNaturalSize = {
        width: img.naturalWidth,
        height: img.naturalHeight,
      };

      updateImageState({ naturalSize: newNaturalSize, imageLoaded: true });

      updateAttributes({
        width: newNaturalSize.width,
        height: newNaturalSize.height,
        alt: img.alt,
        title: img.title,
      });
    },
    [updateAttributes, updateImageState]
  );

  const handleImageError = useCallback(
    () => updateImageState({ error: true, imageLoaded: true }),
    [updateImageState]
  );

  const handleImageUpload = useCallback(async () => {
    if (!initialSrc.startsWith("blob:") || uploadAttemptedRef.current) {
      return;
    }

    uploadAttemptedRef.current = true;
    const imageExtension = editor.options.extensions.find(
      (ext) => ext.name === "image"
    );
    const { uploadFn } = imageExtension?.options ?? {};

    if (!uploadFn) {
      return;
    }

    try {
      updateImageState({ isServerUploading: true });
      const response = await fetch(initialSrc);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });

      const data = await uploadFn(file, node.attrs.id, editor);
      const normalizedData = normalizeUploadResponse(data);

      updateImageState({ isServerUploading: false, error: false });
      updateAttributes(normalizedData);
    } catch {
      updateImageState({ error: true, isServerUploading: false });
    }
  }, [
    editor,
    initialSrc,
    fileName,
    node.attrs.id,
    updateAttributes,
    updateImageState,
  ]);

  useEffect(() => {
    handleImageUpload();
  }, [handleImageUpload]);

  const onRemoveImg = useCallback(() => {
    editor.commands.command(({ tr, dispatch }) => {
      const { selection } = tr;
      const nodeAtSelection = tr.doc.nodeAt(selection.from);

      if (nodeAtSelection && nodeAtSelection.type.name === "image") {
        if (dispatch) {
          tr.deleteSelection();
          return true;
        }
      }
      return false;
    });
  }, [editor.commands]);

  const onRetryImgUpload = useCallback(() => {
    uploadAttemptedRef.current = false;
    handleImageUpload();
  }, [handleImageUpload]);

  return (
    <NodeViewWrapper
      data-drag-handle
      className="relative text-center leading-none"
    >
      <div
        className="group/node-image relative rounded-md object-contain"
        style={{
          maxWidth: `min(${maxWidth}px, 100%)`,
          width: imageState.naturalSize.width || MIN_WIDTH,
          maxHeight: MAX_HEIGHT,
          aspectRatio: `${imageState.naturalSize.width} / ${imageState.naturalSize.height}`,
        }}
      >
        <div
          className={cn(
            "relative flex h-full cursor-default flex-col items-center gap-2 rounded-md",
            {
              "outline outline-2 outline-offset-1 outline-primary": selected,
            }
          )}
        >
          <div className="h-full contain-paint">
            <div className="relative h-full">
              {imageState.isServerUploading && !imageState.error && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spinner className="size-7" />
                </div>
              )}

              <Image
                src={initialSrc}
                alt={node.attrs.alt}
                title={node.attrs.title}
                width={imageState.naturalSize.width || MIN_WIDTH}
                height={imageState.naturalSize.height || MIN_HEIGHT}
                onError={handleImageError}
                onLoad={handleImageLoad}
                className="rounded-md"
              />
            </div>

            {imageState.error && (
              <div className="absolute right-4 top-4 flex gap-2">
                <Button variant="outline" size="sm" onClick={onRemoveImg}>
                  Remove
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onRetryImgUpload}
                >
                  Retry
                </Button>
              </div>
            )}

            {imageState.isServerUploading && <ImageOverlay />}
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
}
export const ImageViewBlock = memo(
  ImageViewBlockComponent,
  (prevProps, nextProps) => {
    return prevProps.node.attrs.id === nextProps.node.attrs.id;
  }
);
