import { createContext } from "react";
import type { AuthContextType } from "../../types/AuthContext";

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  userId: null,
  setUserId: () => {},
  loading: true,
}); 