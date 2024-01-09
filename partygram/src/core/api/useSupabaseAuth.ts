import { useEffect, useMemo, useState } from "react";
import { AuthEvent, supabase } from "./supabase";
import { Session } from "@supabase/supabase-js";
import { getCurrentSession } from "@core/modules/auth/api";
import { User } from "@core/modules/auth/types";

const useSupabaseAuth = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [auth, setAuth] = useState<Session | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getCurrentSession();
      setAuth(session);
      setIsInitialized(true);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case AuthEvent.SIGNED_IN:
        case AuthEvent.USER_UPDATED:
        case AuthEvent.TOKEN_REFRESHED:
          setAuth(session);
          break;
        case AuthEvent.SIGNED_OUT:
        case AuthEvent.USER_DELETED:
          setAuth(null);
          break;
      }
    });
  }, []);

  const isLoggedIn = isInitialized && !!auth;

  const user: User | null = useMemo(() => {
    return auth
      ? {
          id: auth.user.id,
          email: auth.user.email ?? "",
          first_name: auth.user.user_metadata.first_name,
          last_name: auth.user.user_metadata.last_name,
          avatar: auth.user.user_metadata.avatar,
        }
      : null;
  }, [auth]);

  return {
    isLoggedIn,
    isInitialized,
    auth,
    user,
  };
};

export default useSupabaseAuth;
