import { getAuthUser } from "@/actions/user";
import { EditorRenderer } from "@/components/rich-text/editor-renderer";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Post } from "@/types/supabase";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { PostVote } from "./post-vote";

type PostCardProps = Post & {
  noRedirect?: boolean;
};

export async function PostCard(props: PostCardProps) {
  const user = await getAuthUser();
  const { slug, title, content, content_type, comments_count, noRedirect } =
    props;

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

  const PostCardContent = () => (
    <Card className="p-4">
      <Typography variant="h3" className="mb-4">
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
      <Link href={`post/${slug}`}>
        <Typography variant="h3" className="mb-4 hover:underline">
          {title}
        </Typography>
      </Link>
      {content_type === "text" && <EditorRenderer content={content} />}
      <PostActions noRedirect={noRedirect} />
    </Card>
  );
}
