"use client";

import { createComment } from "@/actions/comment";
import { Editor } from "@/components/rich-text/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Stack } from "@/components/ui/stack";
import { commentSchema, type CommentValues } from "@/lib/comments/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type CreateCommentFormProps = {
  postId: number;
  onCancel: () => void;
};

export function CreateCommentForm({
  postId,
  onCancel,
}: CreateCommentFormProps) {
  const [error, setError] = useState("");
  const form = useForm<CommentValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: CommentValues) => {
    setError("");
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    formData.append("postId", postId.toString());

    const response = await createComment(formData);
    if (response?.error) {
      setError(response.error);
      toast.error(response.error, { position: "bottom-right" });
      return;
    }

    onCancel();
  };

  return (
    <Form {...form}>
      <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor
                  onChange={field.onChange}
                  disabledExtensions={["image"]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-end space-y-2">
          {error && <FormMessage>{error}</FormMessage>}
          <Stack direction="horizontal" justify="end" className="gap-2">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              disabled={isSubmitting}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              className="rounded-full"
            >
              Post
            </Button>
          </Stack>
        </div>
      </form>
    </Form>
  );
}
