import { createContext, useContext, useEffect, useState } from "react";

export interface User {
  id: number;
  email: string;
  name: string;
}

interface UserContextType {
  users: User[];
  registerUser: (u: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const registerUser = (u: User) => setUsers(prev => [...prev, u]);

  return (
    <UserContext.Provider value={{ users, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUsers must be inside UserProvider");
  return ctx;
};
