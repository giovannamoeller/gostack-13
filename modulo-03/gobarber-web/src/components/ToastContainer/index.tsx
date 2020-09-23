import React from 'react';
import Toast from './Toast';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'
import { Container } from './styles'; 
import { ToastMessages, useToast } from '../../hooks/toast';

interface ToastContainerProps {
    messages: ToastMessages[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {

    return (
        <Container>
            {messages.map((message) => (
                <Toast key={message.id} message={message}>
                </Toast>
            ))}
           
        </Container>
    )
}

export default ToastContainer;