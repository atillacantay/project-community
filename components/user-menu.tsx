import { signOut } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";

interface UserMenuProps {
  authUser: User;
}

export function UserMenu({ authUser }: UserMenuProps) {
  const username: string = authUser.user_metadata["username"];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar className="size-6">
            <AvatarImage />
            <AvatarFallback className="capitalize">
              {username?.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
