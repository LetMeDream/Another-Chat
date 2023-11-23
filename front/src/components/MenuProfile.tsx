import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface MenuProfileProps {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    handleOpen: () => void;
    handleOpenQR: () => void;
}
   

export const MenuProfile: React.FC<MenuProfileProps> = ({username, setUsername, handleOpen, handleOpenQR}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  
  const handleUsernameChange = () => {
    setAnchorEl(null)
    setUsername('')
    handleOpen()
  }

  const openQR = () => {
    setAnchorEl(null);
    handleOpenQR()
  }

  return (
    <div className='px-4'>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {username}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleUsernameChange}>Change username</MenuItem>
        <MenuItem onClick={openQR}>QR Code</MenuItem>
      </Menu>
    </div>
  );
}
