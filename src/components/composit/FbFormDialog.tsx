import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from '@mui/material';

type ActionButton = {
    key: string;
    label: string;
    color?: 'primary' | 'secondary' | 'error' | 'inherit' | 'success' | 'info' | 'warning';
};

interface FormDialogProps {
    title: string;
    show: boolean;
    children: React.ReactNode;
    actions: ActionButton[];
    handleActionButton: (key: string, value?: any) => void;
    onClose: () => void;
}

export const FbFormDialog: React.FC<FormDialogProps> = ({
                                                   title,
                                                   show,
                                                   children,
                                                   actions,
                                                   handleActionButton,
                                                   onClose,
                                               }) => {
    return (
        <Dialog open={show} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box sx={{mt: 2}}>{children}</Box>
            </DialogContent>
            <DialogActions>
                {actions.map((action) => (
                    <Button
                        key={action.key}
                        onClick={() => handleActionButton(action.key)}
                        color={action.color || 'primary'}
                    >
                        {action.label}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    );
};
