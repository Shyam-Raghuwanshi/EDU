import { UserContextType } from "@/types";
import { createContext, useContext } from "react";
export const AppContext = createContext<UserContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
  };