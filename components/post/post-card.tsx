import { EditorRenderer } from "@/components/rich-text/editor-renderer";
import { Card, CardFooter } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Post } from "@/types/supabase";
import Link from "next/link";
import { PostVote } from "./post-vote";

type PostCardProps = Post & {
  noRedirect?: boolean;
};

export function PostCard(props: PostCardProps) {
  const { slug, title, content, content_type, noRedirect } = props;

  const PostActions = () => (
    <CardFooter className="p-2">
      <PostVote {...props} />
    </CardFooter>
  );

  const PostCardContent = () => (
    <Card className="p-4">
      <Typography variant="h3" className="mb-4">
        {title}
      </Typography>
      {content_type === "text" && <EditorRenderer content={content} />}
      <PostActions />
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
      <PostActions />
    </Card>
  );
}
