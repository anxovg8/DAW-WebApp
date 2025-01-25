import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { HealthTip } from '../types';

interface HealthTipCardProps {
  tip: HealthTip;
}

const categoryColors = {
  nutrition: 'success',
  exercise: 'primary',
  mental: 'secondary',
  general: 'default',
};

const categoryIcons = {
  nutrition: '🥗',
  exercise: '🚶‍♂️',
  mental: '🧠',
  general: 'ℹ️',
};

export default function HealthTipCard({ tip }: HealthTipCardProps) {
  return (
    <Card 
      className="health-tip-card"
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1.25rem',
              color: 'text.primary',
              flex: 1,
            }}
          >
            {categoryIcons[tip.category as keyof typeof categoryIcons]} {tip.title}
          </Typography>
        </Box>
        
        <Chip
          label={tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
          color={categoryColors[tip.category as keyof typeof categoryColors] as any}
          size="small"
          sx={{ 
            alignSelf: 'flex-start',
            mb: 2,
            px: 1,
            fontWeight: 500,
          }}
        />
        
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            flex: 1,
            lineHeight: 1.6,
            fontSize: '1rem',
          }}
        >
          {tip.content}
        </Typography>
      </CardContent>
    </Card>
  );
}