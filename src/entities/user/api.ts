import type { User } from "./types";
import { currentUser } from "./mock";

export async function getCurrentUser(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(currentUser);
    }, 150);
  });
}
