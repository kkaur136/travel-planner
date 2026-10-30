
import {
  createContext,
  useContext,
  useState,
} from "react";
import type { ReactNode } from "react";

type SharedCountContextType = {
  sharedCount: number;
  setSharedCount: React.Dispatch<React.SetStateAction<number>>;
};

const SharedCountContext =
  createContext<SharedCountContextType | undefined>(undefined);

export function SharedCountProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sharedCount, setSharedCount] = useState(0);

  return (
    <SharedCountContext.Provider
      value={{ sharedCount, setSharedCount }}
    >
      {children}
    </SharedCountContext.Provider>
  );
}

export function useSharedCount() {
  const context = useContext(SharedCountContext);

  if (!context) {
    throw new Error(
      "useSharedCount must be used inside SharedCountProvider"
    );
  }

  return context;
}
