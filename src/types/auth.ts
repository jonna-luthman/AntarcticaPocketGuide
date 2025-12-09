import { User, Session } from '@supabase/supabase-js';

type AuthSuccess = {
  success: true;
  data: {
    user: User | null;
    session: Session | null;
  };
};

type AuthFailure = {
  success: false;
  error: string;
};

export type AuthResult = AuthSuccess | AuthFailure;

export type SignOutResult =
  | { success: true }
  | { success: false; error: string };