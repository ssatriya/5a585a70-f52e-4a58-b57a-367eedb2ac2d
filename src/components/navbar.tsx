"use client";

import * as React from "react";

import Link from "next/link";
import { Button } from "./ui/button";
import LoginButton from "./auth/login-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import UserButton from "./auth/user-button";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { Search, UserIcon } from "lucide-react";
import { useClickAway } from "@uidotdev/usehooks";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const Navbar = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const inputRef = React.useRef<React.ElementRef<"input">>(null);

  const ref = useClickAway<React.ElementRef<"div">>(() => {
    setOpen(false);
    setQuery("");
  });

  const pathname = usePathname();
  const user = useCurrentUser();

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }

    return () => {
      inputRef.current?.blur();
    };
  }, [open]);

  const handleClick = () => {
    router.push(`/search?q=${query}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  return (
    <>
      <nav
        className="w-[800px] p-4 bg-slate-200 rounded-md shadow-sm mb-4"
        data-test="navbar"
      >
        <div className="w-full flex justify-between items-center">
          <Button
            data-test="home-button"
            variant={pathname === "/" ? "default" : "ghost"}
            asChild
          >
            <Link href="/">Home</Link>
          </Button>
          <div className="flex gap-3">
            {!open && (
              <Button
                data-test="search-button"
                onClick={() => setOpen((open) => !open)}
                variant="ghost"
                className="rounded-full h-10 w-10 p-0 m-0 bg-secondary hover:bg-secondary/80"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            {open && (
              <div className="relative" ref={ref} data-test="search-form">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <Input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="rounded-full"
                  />
                  <Button
                    variant="default"
                    className="h-10 w-10 p-0 m-0 absolute right-0 top-0 rounded-full"
                    onClick={handleClick}
                    type="submit"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            )}
            {isLoading ? (
              <Skeleton className="h-10 w-10 rounded-full" />
            ) : user ? (
              <UserButton />
            ) : (
              <LoginButton mode="modal">
                <Avatar className="flex items-center justify-center bg-secondary cursor-pointer">
                  <AvatarFallback>
                    <UserIcon className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </LoginButton>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
