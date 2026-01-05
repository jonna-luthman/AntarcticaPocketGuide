import { Session } from '@supabase/supabase-js';
import { AuthUser } from './user';
import { User } from '@supabase/auth-js/src/lib/types'

type AuthSuccess = {
  success: true;
  data: {
    user: User | null;
    session?: Session | null;
  };
};

type AuthSuccessUpdateUser = {
  success: true;
  user: User
};

type AuthFailure = {
  success: false;
  error: {
    message: string;
    code?: string;
  };
};

export type AuthResult = AuthSuccess | AuthFailure;

export type AuthResultUpdateUser = AuthFailure | AuthSuccessUpdateUser;

export type checkUserProfileResult = {
  
}

export type SignOutResult =
  | { success: true }
  | { success: false; error: string };