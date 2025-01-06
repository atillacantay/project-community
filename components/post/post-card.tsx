import { getAuthUser } from "@/actions/user";
import { EditorRenderer } from "@/components/rich-text/editor-renderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { Author, Post } from "@/types/supabase";
import { MessageCircle } from "lucide-react";
import { getFormatter } from "next-intl/server";
import Link from "next/link";
import { PostVote } from "./post-vote";

type PostCardProps = Post & {
  noRedirect?: boolean;
};

export async function PostCard(props: PostCardProps) {
  const format = await getFormatter();
  const user = await getAuthUser();
  const {
    slug,
    title,
    content,
    content_type,
    comments_count,
    created_at,
    noRedirect,
  } = props;
  const author = props.author as Author;
  const createdAt = new Date(created_at);

  const CommentButton = () => (
    <Button variant="outline" className="rounded-full">
      <MessageCircle />
      <Typography variant="span">{comments_count}</Typography>
    </Button>
  );

  const PostActions = ({ noRedirect }: { noRedirect?: boolean }) => (
    <CardFooter className="p-0 py-2 gap-4">
      <PostVote isAuthenticated={Boolean(user)} {...props} />
      {noRedirect ? (
        <CommentButton />
      ) : (
        <Link href={`/post/${slug}`}>
          <CommentButton />
        </Link>
      )}
    </CardFooter>
  );

  const PostCardHeader = () => (
    <Stack align="center" direction="horizontal" className="gap-2">
      <Avatar className="size-8">
        <AvatarImage />
        <AvatarFallback className="capitalize">
          {author?.username?.substring(0, 1)}
        </AvatarFallback>
      </Avatar>
      <Stack>
        <div>
          <Link href={`/user/${author?.username}`} className="hover:underline">
            {author?.username}
          </Link>
        </div>
        <Typography variant="span" affects="muted">
          {format.relativeTime(createdAt)}
        </Typography>
      </Stack>
    </Stack>
  );

  const PostCardContent = () => (
    <Card className="p-4">
      <PostCardHeader />
      <Typography variant="h3" className="mt-2 mb-4">
        {title}
      </Typography>
      {content_type === "text" && <EditorRenderer content={content} />}
      <PostActions noRedirect={noRedirect} />
    </Card>
  );

  return noRedirect ? (
    <PostCardContent />
  ) : (
    <Card className="p-4">
      <PostCardHeader />
      <Link href={`post/${slug}`}>
        <Typography variant="h3" className="mt-2 mb-4 hover:underline">
          {title}
        </Typography>
      </Link>
      {content_type === "text" && <EditorRenderer content={content} />}
      <PostActions noRedirect={noRedirect} />
    </Card>
  );
}
