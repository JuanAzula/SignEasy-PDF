import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="z-50">
      <AppBar color="primary" position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} />
          <Link to="/">
            <Typography
              variant="h5"
              color="inherit"
              component="div"
              className="cursor-pointer"
            >
              SignEasy PDF
            </Typography>
          </Link>
          <div className="ml-auto gap-4 flex flex-row">

            <Link to="/">
              <Typography
                color="inherit"
                component="p"
                className="cursor-pointer"
              >
                Home
              </Typography>
            </Link>
            <Link to="/signature">
              <Typography
                color="inherit"
                component="p"
                className="cursor-pointer"
              >
                Signature
              </Typography>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
