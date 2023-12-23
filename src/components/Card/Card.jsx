import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

function MuiCard({ children, sx }) {
  return (
    <Card variant="outlined" sx={sx}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default MuiCard;
