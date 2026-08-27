import { useEffect, useState } from "react";

import { getCurrentUser } from "./api";
import type { User } from "./types";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const data = await getCurrentUser();

        if (mounted) {
          setUser(data);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    user,
    isLoading,
  };
}
