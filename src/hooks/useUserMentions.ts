import { useSelector } from 'react-redux';
import { RootState } from '../store';

export type MentionsUser = { id: string; display: string };

export const useUserMentions = (): MentionsUser[] => {
  const users = useSelector((state: RootState) => state.users.users);
  return Object.values(users).map((u) => ({
    id: u.id,
    display: u.displayName || u.username || u.id,
  }));
};

export default useUserMentions;


