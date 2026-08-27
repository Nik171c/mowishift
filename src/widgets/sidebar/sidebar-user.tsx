import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import type { User } from "@/entities/user";
import { cn } from "@/shared/lib/utils";

type SidebarUserProps = {
  collapsed: boolean;
  user: User;
};

export function SidebarUser({ collapsed, user }: SidebarUserProps) {
  const initials = user.fullName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="border-t p-4">
      <div
        className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "gap-3",
        )}
      >
        <div className="relative shrink-0">
          <Avatar className="h-11 w-11">
            <AvatarImage src={user.avatarUrl} alt={user.fullName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          {user.online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
          )}
        </div>

        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user.fullName}</p>

            <p className="truncate text-xs text-muted-foreground">
              {user.role}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user.company}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
