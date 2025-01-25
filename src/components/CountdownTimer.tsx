import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { differenceInSeconds, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Reminder } from '../types';

interface CountdownTimerProps {
  reminders: Reminder[];
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ reminders }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [nextReminder, setNextReminder] = useState<Reminder | null>(null);

  useEffect(() => {
    // Encontrar el próximo recordatorio no completado
    const findNextReminder = () => {
      const now = new Date();
      const upcomingReminders = reminders
        .filter(reminder => !reminder.completed && reminder.datetime > now)
        .sort((a, b) => a.datetime.getTime() - b.datetime.getTime());
      
      return upcomingReminders[0] || null;
    };

    // Calcular tiempo restante
    const calculateTimeLeft = (targetDate: Date) => {
      const totalSeconds = differenceInSeconds(targetDate, new Date());
      if (totalSeconds <= 0) return null;

      return {
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60
      };
    };

    // Actualizar el próximo recordatorio
    const next = findNextReminder();
    setNextReminder(next);

    if (!next) {
      setTimeLeft(null);
      return;
    }

    // Iniciar el contador
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(next.datetime);
      if (!newTimeLeft) {
        clearInterval(timer);
        setTimeLeft(null);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [reminders]);

  if (!nextReminder || !timeLeft) {
    return (
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          bgcolor: 'background.default',
          textAlign: 'center',
          borderRadius: 2,
          border: '2px dashed',
          borderColor: 'divider'
        }}
      >
        <Box>
          <Typography variant="h6" component="div" color="text.secondary">
            No hay recordatorios pendientes
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper 
      sx={{ 
        p: 3,
        mb: 4,
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        color: 'white',
        borderRadius: 2,
      }}
    >
      <Box>
        <Typography variant="h6" component="div" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
          Próximo recordatorio
        </Typography>
      </Box>
      
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
          {nextReminder.title}
        </Typography>
        <Typography variant="body1" component="div">
          {format(nextReminder.datetime, "d 'de' MMMM 'a las' HH:mm", { locale: es })}
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mt: 3
        }}
      >
        <TimeUnit value={timeLeft.hours} unit="horas" />
        <TimeUnit value={timeLeft.minutes} unit="minutos" />
        <TimeUnit value={timeLeft.seconds} unit="segundos" />
      </Box>
    </Paper>
  );
}

function TimeUnit({ value, unit }: { value: number; unit: string }) {
  return (
    <Box 
      sx={{ 
        textAlign: 'center',
        minWidth: '80px',
      }}
    >
      <Paper
        sx={{
          p: 2,
          bgcolor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(5px)',
          borderRadius: 1,
          mb: 1,
        }}
      >
        <Typography 
          variant="h4" 
          component="div"
          sx={{ 
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {value.toString().padStart(2, '0')}
        </Typography>
      </Paper>
      <Typography 
        variant="body2" 
        component="div"
        sx={{ 
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontSize: '0.75rem',
        }}
      >
        {unit}
      </Typography>
    </Box>
  );
}