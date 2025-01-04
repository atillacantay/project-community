import { EditorRenderer } from "@/components/rich-text/editor-renderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import type { Comment } from "@/types/supabase";
import { useFormatter } from "next-intl";
import Link from "next/link";

type CommentProps = Comment;

export function Comment(props: CommentProps) {
  const format = useFormatter();
  const { user, content, created_at } = props;
  const { username } = user;
  const createdAt = new Date(created_at);

  // const PostActions = () => (
  //   <CardFooter className="p-0 py-2">
  //     <PostVote {...props} />
  //   </CardFooter>
  // );

  return (
    <Stack className="gap-2">
      <Stack direction="horizontal" align="center" className="gap-2">
        <Avatar className="size-8">
          <AvatarImage />
          <AvatarFallback className="capitalize">
            {username?.substring(0, 1)}
          </AvatarFallback>
        </Avatar>

        <Link href={`/user/${username}`} className="hover:underline">
          {username}
        </Link>

        <time dateTime={created_at} title={createdAt.toString()}>
          <Typography variant="h4" affects="muted">
            {format.relativeTime(createdAt)}
          </Typography>
        </time>
      </Stack>
      <Stack className="ml-10">
        <EditorRenderer content={content} />
      </Stack>
      {/* <PostActions /> */}
    </Stack>
  );
}
