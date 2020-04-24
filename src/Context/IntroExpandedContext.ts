import { createContext } from "react";

export interface IntroExpandedInterface {
    pagesExpanded: boolean[],
    setExpanded: (index: number) => void
};

export const IntroExpandedContext = createContext<IntroExpandedInterface | null>(null);