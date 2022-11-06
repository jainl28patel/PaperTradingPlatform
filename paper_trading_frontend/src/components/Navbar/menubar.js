import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Menubar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{
        background: '#321570'
        }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, mr: 30 }}>
            PaperTrading
          </Typography>
          <Button color="inherit" sx={{mr: 8}}>Dashboard</Button>
          <Button color="inherit" sx={{mr: 5}}>Buy/Sell</Button>
          <Button color="inherit" sx={{mr: 5}}>Search</Button>
          <Button color="inherit" sx={{mr: 5}}>Transaction</Button>
          <Button color="inherit" sx={{mr: 3}}>Edu</Button>
          <Button color="inherit" sx={{mr: 30}}>AboutUs</Button>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Signup</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}