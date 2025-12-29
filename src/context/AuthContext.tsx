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
import { useLoading } from "./LoadingContext";

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
  signInWithFacebook: () => Promise<void>;
  signOutUser: () => Promise<SignOutResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const { checkUserProfile } = useUsers();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    showLoading()
    const initAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const currentSession = data.session
        setSession(currentSession);

        if (currentSession?.user) {
          await checkUserProfile(currentSession.user);
        }
      } catch (err) {
        console.error("Auth init error", err);
      } finally {
        hideLoading();
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
         checkUserProfile(newSession.user);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUpNewUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: {
            message: error.message,
            code: error.code,
          },
        };
      }

      return { success: true, data: {user: data.user, session: data.session} };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message ?? "Unexpected error",
          code: error.code ?? "Unexpected error",
        },
      };
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error(error);
    }
  };

  const signInWithFacebook = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
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
        return {
          success: false,
          error: {
            message: error.message ?? "Unexpected error",
            code: error.code ?? "Unexpected error",
          },
        };
      }

      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message ?? "Unexpected error",
          code: error.code ?? "Unexpected error",
        },
      };
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
        signInWithFacebook
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
