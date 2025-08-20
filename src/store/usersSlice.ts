// Store slice for users. Accepts either an array (for mentions demo) or a keyed object.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user.types';
import usersSeedJson from '../data/users.json';

interface UsersState {
  users: Record<string, User>;
}

type UsersSeed = { users?: Record<string, User> } | Array<{ id: string; display: string }>;
const parsedUsers = usersSeedJson as unknown as UsersSeed;
const usersFromSeed: Record<string, User> = Array.isArray(parsedUsers)
  ? Object.fromEntries(
      parsedUsers.map((u) => [u.id, {
        id: u.id,
        username: u.id,
        displayName: (u as any).display ?? u.id,
        avatar: '',
        isOnline: false,
        lastSeen: new Date().toISOString(),
      } as User])
    )
  : (parsedUsers.users ?? {});

const initialState: UsersState = {
  users: usersFromSeed,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users[action.payload.id] = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.users[action.payload.id] = action.payload;
    },
  },
});

export const { addUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
