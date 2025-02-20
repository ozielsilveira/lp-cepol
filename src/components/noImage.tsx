import { Image } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';


interface IProps {
  color?: string;
}

export const NoImage = (props: IProps) => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <Box textAlign="center" padding={5}>
      <Typography variant="h3" component="div" sx={{ mb: 0, color: props.color ? props.color : 'text.secondary' }}>
        <Image fontSize="large" />
      </Typography>
      <Typography variant="body2" component="div" sx={{ color: props.color ? props.color : 'text.secondary' }}>
        No Image
      </Typography>
    </Box>
  </Box>
);