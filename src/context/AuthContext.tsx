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
import { useIonToast } from "@ionic/react";
import { useTranslation } from "react-i18next";

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

/**
 * Provider component that handles the applications Authentication state.
 * The provider is listening on changes in Supabase session and is responsible for:
 * 1. Keep the current user session updated.
 * 2. Syncronize logged in users with the public 'Users' table.
 * 3. Handling functionality in the app regarding user authentication; Sign in, Registration
 *    (Email, Google and Facebook) and Sign out.
 */

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const { checkUserProfile } = useUsers();
  const { showLoading, hideLoading } = useLoading();
  const { t } = useTranslation();
  const [showToast] = useIonToast();

  /**
   * Initializes the application's authentication state and sets up a real-time listener.
   * * Performs two key tasks:
   * - Initial Sync (on mount): Fetches the current session to check if the user is
   * logged in. If a session exists, it ensures the user is synchronized with the
   * 'public.Users' table via checkUserProfile.
   * - Event Listening (post-initialization): Subscribes to Supabase auth changes.
   * On every state change, it updates the local session and synchronizes the
   * user profile with the database.
   * * The subscription is automatically cleaned up when the provider unmounts.
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const currentSession = data.session;
        setSession(currentSession);

        if (currentSession?.user) {
          await checkUserProfile(currentSession.user);
        }
      } catch (err) {
        console.error("Auth init error", err);
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          checkUserProfile(newSession.user);
        }
        const name =
          newSession?.user.user_metadata.name || newSession?.user.email;

        console.log("event", event);
        if (event === "SIGNED_IN" && newSession) {
          showToast({
            message: t("toasts.login.welcomeBack", { name: name }),
            duration: 3000,
            color: "secondary",
            position: "top",
          });
        }

        if (event === "SIGNED_UP" && newSession) {
          showToast({
            message: t("toasts.register.welcomeMsg", { name: name }),
            duration: 3000,
            color: "secondary",
            position: "top",
          });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  /**
   * Function that inserts row in Supabase 'Authentication.Users' creating a new user.
   * @param - takes given data from users and inserts a new row.
   * @returns AuthResult (AuthSuccess/AuthFailure): returns different objects if the result was a success or not.
   */
  const signUpNewUser = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthResult> => {
    showLoading();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
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

      return {
        success: true,
        data: { user: data.user, session: data.session },
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message ?? "Unexpected error",
          code: error.code ?? "Unexpected error",
        },
      };
    } finally {
      hideLoading();
    }
  };

  /**
   * Social login through Google with 0Auth 2.0.
   * User is directed to Google Authentication window.
   * At success user gets redirected back to the app and a new Supabase session is created.
   */
  const signInWithGoogle = async () => {
    showLoading();
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) console.error(error);
    } finally {
      hideLoading();
    }
  };

  /**
   * Login with through Google with 0Auth 2.0.
   * Same functionality as Google login. See above.
   */
  const signInWithFacebook = async () => {
    showLoading();
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) console.error(error);
    } finally {
      hideLoading();
    }
  };

  /**
   * Login with email and password.
   * @param credentials - object containing users email and password.
   * @returns A promise with an AuthResult that returns either a success or error.
   */
  const signInWithEmail = async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResult> => {
    showLoading();
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
    } finally {
      hideLoading();
    }
  };

  /**
   * Function that ends the current session and signs out user.
   * Clears locally stored session data and triggers onAuthStateChange.
   * @returns SignOutresult - object that tells if the sign out was successful or not.
   */
  const signOutUser = async (): Promise<SignOutResult> => {
    showLoading();
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
    } finally {
      hideLoading();
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
        signInWithFacebook,
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
