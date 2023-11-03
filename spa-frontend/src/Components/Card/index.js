import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { StyledCard } from './styles';

function RectangularCard({
  values,
  onDeleteClick,
  onEditClick, 
  loading
}) {
  return (
    <StyledCard variant="outlined" style={{ margin: '16px' }}>
    <CardContent>
      <Typography variant="h6" component="div">
        {values.title.slice(0,31)}
      </Typography>
      {(values.dayOff) && (
        <Typography variant="body2" color="#4caf50">
          {values.dayOff}
        </Typography>
      )}
      <Typography variant="body2" color="text.secondary">
        {values.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Data e Hora: {new Date(values.dateTime).toLocaleString()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Duração: {values.durationTime}
      </Typography>
      <Button variant="contained" color="primary" onClick={onEditClick}>
        Editar
      </Button>
      <Button variant="contained" color="error" onClick={onDeleteClick} disabled={loading}>
        Excluir
      </Button>
    </CardContent>
  </StyledCard>
  );
}

export default RectangularCard;
