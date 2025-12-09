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

interface AuthContextType {
  session: Session | null;
  signUpNewUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<AuthResult>;
  signInUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<AuthResult>;
  signOutUser: () => Promise<SignOutResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  //Sign up
  const signUpNewUser = async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signUp(credentials);

      if (error) {
        console.error("Error signing up: ", error.message);
        return { success: false, error: error.message };
      }
      

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message ?? "Unexpected error" };
    }
  };

  //Sign in
  const signInUser = async (credentials: {
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


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signInUser, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
