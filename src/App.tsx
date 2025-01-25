import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Checkbox,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ReminderForm from './components/ReminderForm';
import HealthTipCard from './components/HealthTipCard';
import CountdownTimer from './components/CountdownTimer';
import { Reminder, HealthTip } from './types';
import './App.css';

// Crear un tema personalizado para mejor accesibilidad
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Arial, sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

const healthTips: HealthTip[] = [
  {
    id: '1',
    title: 'Mantén una rutina diaria',
    content: 'Establecer horarios regulares para comidas, medicamentos y actividades ayuda a mantener una mejor calidad de vida.',
    category: 'general'
  },
  {
    id: '2',
    title: 'Hidratación importante',
    content: 'Asegúrate de que la persona mayor beba suficiente agua durante el día, especialmente en épocas de calor.',
    category: 'nutrition'
  },
  {
    id: '3',
    title: 'Ejercicios suaves',
    content: 'Caminar o hacer ejercicios suaves ayuda a mantener la movilidad y el bienestar general.',
    category: 'exercise'
  }
];

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleAddReminder = (reminderData: Omit<Reminder, 'id' | 'completed'>) => {
    const newReminder: Reminder = {
      ...reminderData,
      id: Date.now().toString(),
      completed: false
    };
    setReminders([...reminders, newReminder]);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', sm: '2.2rem' }
            }}
          >
            Asistente de Cuidados
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}
          >
            Tu compañero para el cuidado de personas mayores
          </Typography>
        </Box>

        {/* Contador regresivo */}
        <CountdownTimer reminders={reminders} />

        <Paper sx={{ mb: 4, overflow: 'hidden' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            centered
            sx={{
              '& .MuiTab-root': {
                fontSize: '1.1rem',
                py: 2,
                minWidth: 160,
              }
            }}
          >
            <Tab label="Recordatorios" />
            <Tab label="Consejos de Salud" />
          </Tabs>
        </Paper>

        {tabValue === 0 && (
          <Box>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2
            }}>
              <Typography variant="h6" sx={{ color: 'text.primary' }}>
                Recordatorios y Alarmas
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenForm(true)}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: 2
                }}
              >
                Nuevo Recordatorio
              </Button>
            </Box>

            <List sx={{ mt: 3 }}>
              {reminders.map((reminder) => (
                <ListItem
                  key={reminder.id}
                  className="reminder-item"
                  sx={{
                    mb: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 1,
                    '&:hover': {
                      boxShadow: 2,
                    },
                    transition: 'all 0.3s ease',
                    p: 2,
                  }}
                >
                  <Checkbox
                    checked={reminder.completed}
                    onChange={() => handleToggleComplete(reminder.id)}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: 28,
                      },
                    }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.2rem',
                          textDecoration: reminder.completed ? 'line-through' : 'none',
                          color: reminder.completed ? 'text.secondary' : 'text.primary',
                        }}
                      >
                        {reminder.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'text.secondary',
                            textDecoration: reminder.completed ? 'line-through' : 'none',
                          }}
                        >
                          {reminder.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'primary.main',
                            mt: 1,
                            fontWeight: 500,
                          }}
                        >
                          {format(reminder.datetime, "d 'de' MMMM 'a las' HH:mm", { locale: es })}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteReminder(reminder.id)}
                      sx={{
                        color: 'error.main',
                        '&:hover': {
                          bgcolor: 'error.light',
                          color: 'error.dark',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              {reminders.length === 0 && (
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    bgcolor: 'background.default',
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderColor: 'divider',
                  }}
                >
                  <Typography color="text.secondary">
                    No hay recordatorios. ¡Añade uno nuevo!
                  </Typography>
                </Paper>
              )}
            </List>

            <ReminderForm
              open={openForm}
              onClose={() => setOpenForm(false)}
              onSave={handleAddReminder}
            />
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                mb: 4,
                color: 'text.primary',
                textAlign: 'center'
              }}
            >
              Consejos de Salud
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 3,
              }}
            >
              {healthTips.map((tip) => (
                <HealthTipCard key={tip.id} tip={tip} />
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;