"use client";

import { createPost } from "@/actions/post";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { postSchema, type PostValues } from "@/lib/posts/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function CreatePostForm() {
  const [error, setError] = useState("");
  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: PostValues) => {
    setError("");
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    const response = await createPost(formData);
    if (response.error) {
      setError(response.error);
    }
  };

  return (
    <Tabs defaultValue="text" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="text">Text</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
      </TabsList>
      <TabsContent value="text">
        <Form {...form}>
          <form
            className="space-y-6 p-2"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichTextEditor onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-end space-y-2">
              {error && <FormMessage>{error}</FormMessage>}
              <Button
                type="submit"
                loading={isSubmitting}
                className="rounded-full"
              >
                Post
              </Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="media">
        <Card>
          <CardHeader />
          <CardContent className="space-y-2">
            <Input placeholder="Title" />
          </CardContent>
          <CardFooter className="justify-end">
            <Button>Post</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}