export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

export type Photo = {
    id: number;
    width: number;
    height: number;
    urls: { 
        large: string; 
        regular: string; 
        raw: string; 
        small: string 
    };
    color: string | null;
    user: {
        username: string;
        name: string;
    };
};