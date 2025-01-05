import { Stack } from "@/components/ui/stack";
import type { Comment as CommentType } from "@/types/supabase";
import { Comment } from "./comment";

type CommentListProps = {
  comments: CommentType[];
};

export async function CommentList({ comments }: CommentListProps) {
  return (
    <Stack className="w-full space-y-6">
      {comments &&
        comments.map((comment) => <Comment key={comment.id} {...comment} />)}
    </Stack>
  );
}
