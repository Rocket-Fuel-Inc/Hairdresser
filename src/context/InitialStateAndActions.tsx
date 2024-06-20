import { User } from 'firebase/auth';
import { State } from './Interface';

// Initial State
export const initialState: State = {
  loading: false,
  currentUser: null,
  register: false,
};

// Actions
export type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_USER'; payload: User | null}
  | { type: 'SET_REGISTER'; payload: boolean };

export type Dispatch = (action: Action) => void;
