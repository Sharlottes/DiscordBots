import Link from 'next/link';
import React from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import { SettingIcon, DiscordIcon } from 'src/assets/icons';
import { styled } from '@mui/system';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

const links: {url: string, name: string}[] = [];
(()=>{
  function addLink(url: string, name: string) {
    links.push({url: url, name: name});
  }
  addLink('/', 'Home');
  addLink('/about', 'About');
  addLink('/botList', 'Bots');
})();

const StyledTypography = styled(Typography)(() => ({
  fontFamily: 'uni-sans-heavy',
  textAlign: 'center',
  textDecoration: 'none',
  color: 'black',
  transition: 'all 0.5s',
  margin: '5px',
  padding: '5px',
  '&:hover': {
    backgroundColor: '#a7abd7'
  }
}));

function IconTabs() {
  return (
    <Stack direction="row" sx={{
      "& .MuiSvgIcon-root": { mr: '4px', ml: '4px'},
      "& :hover": {color: 'black'},
      color: 'gray'
    }}>
      <Link href='/login'><AccountCircleIcon /></Link>
      <SettingIcon />
    </Stack>
  )
}

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [overlapStep, setOverlapStep] = React.useState(0); //0: none, 1: navigator, 2: icons

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  React.useEffect(() => {
    const target = document.getElementById('navigator') as HTMLElement;
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        setOverlapStep(entry.intersectionRatio < 0.95 ? 2 : entry.intersectionRatio < 0.99 ? 1 : 0);
        if(entry.intersectionRatio >= 0.99) setAnchorEl(null);
      })
    }, {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.95, 0.99, 1]
    });
    io.observe(target);
    return () => io.unobserve(target);
  }, [overlapStep]);

  return (      
    <Stack direction="row" alignItems="center" sx={{width:'100%', borderBottom: '2px solid black', boxShadow: '0px 0px 5px', pt: '10px'}}>
    <Box sx={{transform: 'scale(2)', mr:'10px'}} ml='20px'><DiscordIcon /></Box>
    <Stack direction="row" id='navigator' justifyContent="space-between" alignItems="center" sx={{width:'100%'}}>

      <Stack direction="row" sx={{minWidth: '200px'}}>
        {overlapStep > 0 
          ? <IconButton onClick={handleOpen}><MenuIcon /></IconButton> 
          : links.map((link, i) => 
            <Link href={link.url} key={i}>
              <StyledTypography className='.noselect'>{link.name}</StyledTypography>
            </Link>
          )
        }
      </Stack>
      <IconTabs />

      <Menu 
        anchorEl={anchorEl} 
        id='navigator-menu' 
        open={Boolean(anchorEl)}
        onClick={handleClose}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {links.map((link, i) => 
          <MenuItem key={i}>
            <Link href={link.url}>
              <StyledTypography className='.noselect'>{link.name}</StyledTypography>
            </Link>
          </MenuItem>
        )}
        {overlapStep === 2 && <MenuItem><IconTabs /></MenuItem>}
      </Menu>
    </Stack>
    </Stack>
  );
}

export default Header;