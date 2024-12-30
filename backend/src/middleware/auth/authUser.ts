import { User } from '@supabase/supabase-js';

export interface CurrentUser {
  id: string;
  email: string;
}

export const convertCurrentUser = (user: User): CurrentUser => {
  return {
    id: user.id,
    email: user.email || '',
  };
};
