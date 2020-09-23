import React, { createContext, useContext, useCallback, useState } from 'react';
import ToastContainer from '../components/ToastContainer';
import { uuid } from 'uuidv4';

interface ToastContextData {
    addToast(message: Omit<ToastMessages, 'id'>): void;
    removeToast(id: string): void;
}

export interface ToastMessages {
    id: string; /* por causa da key, vários toasts podem aparecer */
    type?: 'success' | 'error' | 'info';
    title: string;
    description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {

    const [message, setMessages] = useState<ToastMessages[]>([]);

    const addToast = useCallback(({ type, title, description }: Omit<ToastMessages, 'id'>) => {
        const id = uuid();
        const toast = {
            id,
            type,
            title,
            description
        }
        setMessages([...message, toast]);
    }, [message]);

    const removeToast = useCallback((id: string) => {
        setMessages(state => state.filter(message => message.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
        <ToastContainer messages={message}/>
        </ToastContext.Provider>
    )
}   

function useToast() {
    const context = useContext(ToastContext);

    if(!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
}

export { ToastProvider, useToast }