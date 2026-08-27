import { HeaderMenuButton } from "./header-menu-button";
import { HeaderNotifications } from "./header-notifications";
import { HeaderSearch } from "./header-search";
import { HeaderTitle } from "./header-title";
import { HeaderUser } from "./header-user";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
      <div className="flex flex-1 items-center gap-4">
        <HeaderMenuButton />

        <HeaderTitle />
      </div>

      <div className="mx-8 hidden max-w-md flex-1 xl:flex">
        <HeaderSearch />
      </div>

      <div className="flex items-center gap-2">
        <HeaderNotifications />

        <HeaderUser />
      </div>
    </header>
  );
}
