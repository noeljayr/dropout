// context/token.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { deleteCookie, getCookie } from "cookies-next";
import { USER_TYPES } from "@/types/TOKEN";
import { TOKEN_NAME } from "@/Constants/TOKEN_NAME";

interface TokenState extends USER_TYPES {
  token: string;
  refresh: () => void;
  logout: () => void;
}

// Grab initial token from cookie (if running in the browser)
const getInitialToken = () =>
  typeof window !== "undefined" ? getCookie(TOKEN_NAME)?.toString() ?? "" : "";

export const useTokenStore = create<TokenState>()(
  persist(
    (set, get, api) => ({
      // <-- note we now have `api` available to call persist methods
      token: getInitialToken(),
      name: "",
      role: "",
      username: "",

      // re‑read the cookie and decode
      refresh: () => {
        const cookie = getCookie(TOKEN_NAME)?.toString();
        if (!cookie) {
          // no cookie → clear all fields
          set({
            token: "",
            name: "",
            role: "",
            username: "",
          });
          return;
        }
        try {
          const data = jwtDecode<USER_TYPES>(cookie);
          set({ token: cookie, ...data });
        } catch {
          // invalid JWT → clear all fields
          set({
            token: "",
            name: "",
            role: "",
            username: "",
          });
        }
      },

      // wipe cookie + clear persisted storage + reset in-memory state
      logout: () => {
        // 1) Remove the cookie
        deleteCookie(TOKEN_NAME);

        // 2) Clear the persisted storage entry
        api.persist.clearStorage();

        // 3) Reset state to initial empty values
        set({
          token: "",
          name: "",
          role: "",
          username: "",
        });
      },
    }),
    {
      name: "monitor-token-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state) state.refresh();
      },
    }
  )
);
