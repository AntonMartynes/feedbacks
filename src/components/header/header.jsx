import '../../styles/header.scss';
import Box from '@mui/material/Box';


export const Header = () => {
  return (
    <Box
      sx={{
        my: 1,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <header className="header">
        <div className="header__logo"></div>
        <div className="header__content">Сервіс для відгуків Машеньки</div>
      </header>
    </Box>
  );
};
