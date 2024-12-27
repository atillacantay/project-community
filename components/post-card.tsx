import { Card } from "@/components/ui/card";
import { Tables } from "@/lib/database.types";
import Link from "next/link";

type PostCardProps = Tables<"posts"> & {};

export default function PostCard({ slug, title }: PostCardProps) {
  return (
    <Link href={`post/${slug}`}>
      <Card className="p-4">
        <span>{title}</span>
      </Card>
    </Link>
  );
}
