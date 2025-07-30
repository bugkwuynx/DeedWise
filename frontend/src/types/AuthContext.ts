export interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    userId: string | null;
    setUserId: (userId: string | null) => void;
    loading: boolean;
}