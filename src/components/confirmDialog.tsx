import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    content: string;
}

export default function ConfirmDialog({ open, onClose, onConfirm, title, content }: ConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onConfirm} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

