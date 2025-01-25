import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from '@mui/material';
import { Reminder } from '../types';

interface ReminderFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (reminder: Omit<Reminder, 'id' | 'completed'>) => void;
}

export default function ReminderForm({ open, onClose, onSave }: ReminderFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState('');
  const [type, setType] = useState<'medication' | 'appointment' | 'activity'>('medication');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      datetime: new Date(datetime),
      type,
    });
    // Limpiar el formulario
    setTitle('');
    setDescription('');
    setDatetime('');
    setType('medication');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 24,
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          pb: 2,
        }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Crear Nuevo Recordatorio
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              autoFocus
              label="Título"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ '& .MuiInputBase-input': { fontSize: '1.1rem' } }}
            />
            
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              sx={{ '& .MuiInputBase-input': { fontSize: '1.1rem' } }}
            />
            
            <TextField
              label="Fecha y Hora"
              type="datetime-local"
              fullWidth
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
              sx={{ '& .MuiInputBase-input': { fontSize: '1.1rem' } }}
            />
            
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                required
                sx={{ '& .MuiSelect-select': { fontSize: '1.1rem' } }}
              >
                <MenuItem value="medication">💊 Medicación</MenuItem>
                <MenuItem value="appointment">🏥 Cita Médica</MenuItem>
                <MenuItem value="activity">🎯 Actividad</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3,
          borderTop: 1, 
          borderColor: 'divider',
        }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            sx={{ 
              px: 3,
              py: 1,
              fontSize: '1rem',
              textTransform: 'none',
            }}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ 
              px: 3,
              py: 1,
              fontSize: '1rem',
              textTransform: 'none',
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}