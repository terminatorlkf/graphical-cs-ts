import { createContext } from 'react';

export interface CurrentPageInterface {
    currentPage: number,
    setCurrentPage: (pageNumber: number) => void
}

export const CurrentPageContext = createContext<CurrentPageInterface | null>(null);