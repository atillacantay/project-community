import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UploadReturnType } from "../../extensions/image";
import { ImageOverlay } from "./image-overlay";

const MAX_HEIGHT = 600;
const MIN_HEIGHT = 120;
const MIN_WIDTH = 120;

type ElementDimensions = { width: number; height: number };

interface ImageState {
  src: string;
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

export function ImageViewBlock({
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

  const initSrc = useMemo(() => {
    if (typeof initialSrc === "string") {
      return initialSrc;
    }
    return initialSrc.src;
  }, [initialSrc]);

  const [imageState, setImageState] = useState<ImageState>({
    src: initSrc,
    isServerUploading: false,
    imageLoaded: false,
    error: false,
    naturalSize: { width: initialWidth, height: initialHeight },
  });
  const aspectRatio =
    imageState.naturalSize.width / imageState.naturalSize.height;
  const maxWidth = MAX_HEIGHT * aspectRatio;

  const handleImageLoad = useCallback(
    (ev: React.SyntheticEvent<HTMLImageElement>) => {
      const img = ev.target as HTMLImageElement;
      const newNaturalSize = {
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
      setImageState((prev) => ({
        ...prev,
        naturalSize: newNaturalSize,
        imageLoaded: true,
      }));

      updateAttributes({
        width: newNaturalSize.width,
        height: newNaturalSize.height,
        alt: img.alt,
        title: img.title,
      });
    },
    [updateAttributes]
  );

  const handleImageError = useCallback(() => {
    setImageState((prev) => ({ ...prev, error: true, imageLoaded: true }));
  }, []);

  useEffect(() => {
    const handleImage = async () => {
      if (!initSrc.startsWith("blob:") || uploadAttemptedRef.current) {
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
        setImageState((prev) => ({ ...prev, isServerUploading: true }));
        const response = await fetch(initSrc);
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: blob.type });

        const data = await uploadFn(file, node.attrs.id, editor);
        console.log(data);
        const normalizedData = normalizeUploadResponse(data);
        console.log(normalizedData);

        setImageState((prev) => ({
          ...prev,
          id: data.id,
          isServerUploading: false,
        }));

        updateAttributes(normalizedData);
      } catch {
        setImageState((prev) => ({
          ...prev,
          error: true,
          isServerUploading: false,
        }));
      }
    };

    handleImage();
  }, [editor, fileName, initSrc, updateAttributes]);

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
                src={imageState.src}
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
                <Button variant="outline" size="sm">
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
