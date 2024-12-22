import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';
import { useState } from 'react';
import ConfirmDialog from './confirmDialog.tsx';
import GenericForm from './genericForm';

interface Item {
    id: number;
    title: string;
    description: string;
}

interface GenericListProps {
    items: Item[];
    onAdd: (item: Omit<Item, 'id'>) => void;
    onUpdate: (id: number, item: Omit<Item, 'id'>) => void;
    onDelete: (id: number) => void;
    itemType: string;
}

export default function GenericList({ items, onAdd, onUpdate, onDelete, itemType }: GenericListProps) {
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    const handleEdit = (item: Item) => {
        setEditingItem(item);
    };

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleSubmit = (item: Omit<Item, 'id'>) => {
        if (editingItem) {
            onUpdate(editingItem.id, item);
        } else {
            onAdd(item);
        }
        setEditingItem(null);
        setIsAdding(false);
    };

    const handleDelete = (id: number) => {
        setItemToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (itemToDelete !== null) {
            onDelete(itemToDelete);
            setDeleteConfirmOpen(false);
            setItemToDelete(null);
        }
    };

    return (
        <Box>
            <List>
                {items.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.title} secondary={item.description} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Button startIcon={<AddIcon />} onClick={handleAdd}>
                Adicionar {itemType}
            </Button>
            {(editingItem || isAdding) && (
                <GenericForm
                    item={editingItem || { title: '', description: '' }}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setEditingItem(null);
                        setIsAdding(false);
                    }}
                    itemType={itemType}
                />
            )}
            <ConfirmDialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={confirmDelete}
                title={`Excluir ${itemType}`}
                content={`Tem certeza que deseja excluir este ${itemType.toLowerCase()}?`}
            />
        </Box>
    );
}

