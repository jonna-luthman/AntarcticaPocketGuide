import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../api/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { AuthResult, SignOutResult } from "../types/auth";
import useUsers from "../hooks/useUser";

interface AuthContextType {
  session: Session | null;
  signUpNewUser: (payload: {
    email: string;
    password: string;
    name: string;
  }) => Promise<AuthResult>;
  signInWithEmail: (payload: {
    email: string;
    password: string;
  }) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<SignOutResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const { checkUserProfile } = useUsers();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);

      if (data.session?.user) {
        checkUserProfile(data.session.user);
      }
    });

    const { data } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session ?? null);

        if (session?.user) {
          await checkUserProfile(session.user);
        }
      }
    );

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  //Sign up
  const signUpNewUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return supabase.auth.signUp({ email, password });
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error(error);
    }
  };

  //Sign in
  const signInWithEmail = async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(
        credentials
      );

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message ?? "Unexpected error" };
    }
  };

  //Sign out
  const signOutUser = async (): Promise<SignOutResult> => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message ?? "Unexpected error",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        signUpNewUser,
        signInWithEmail,
        signOutUser,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthProvider");
  }
  return context;
};
