import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TryRoundedIcon from '@mui/icons-material/TryRounded';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

export const Main = () => {
  const [open, setOpen] = React.useState(false);
  const [openFeedback, setOpenFeedback] = React.useState(false);
  const [name, setName] = React.useState();
  const [reasone, setReasone] = React.useState();
  const [description, setDescription] = React.useState();
  const [rating, setRating] = React.useState();

  const [feedbacks, setFeedbacks] = React.useState([
    { name: 'qwe', reasone: 'w', description: 'ddd', rating: 2 },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName();
    setReasone();
    setDescription();
    setRating();
    setOpen(false);
  };

  const handleCloseFeedbacks = () => {
    setOpenFeedback(false);
  };

  const handleClickOpenFeedbacks = () => {
    setOpenFeedback(true);
  };

  const handleSubmit = () => {
    const data = { name, reasone, description, rating };
    sendFeedback(data);
    handleClose()
    console.log(data);
  };

  const isDisabled = () => {
    return !!name && !!reasone && !!description && !!rating;
  };

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });
  const getFeedbacks = () => {
    axios.get('https://feedbacks-829cf132703f.herokuapp.com')
    .then(response => {
      setFeedbacks(response.data)
      console.log('Response data:', response.data);
      // Обработка полученных данных
    })
    .catch(error => {
      console.error('Error:', error);
      // Обработка ошибки
    });
  }

  const sendFeedback = (data) => {
    axios.post('https://feedbacks-829cf132703f.herokuapp.com', data)
      .then(response => {
        console.log('Response data:', response.data);
        getFeedbacks()
      })
  }
  React.useEffect(() => {
    getFeedbacks()
  }, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '75vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <TryRoundedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Оберіт, що ви хочете зробити
            </Typography>
            <Button
              onClick={handleClickOpen}
              variant="outlined"
              endIcon={<SendIcon />}
              size="large"
              color="primary"
              sx={{ m: 2, minWidth: 320, minHeight: 50 }}
            >
              Відправити Відгук
            </Button>
            <Button
              onClick={handleClickOpenFeedbacks}
              variant="outlined"
              endIcon={<SendIcon />}
              size="large"
              color="info"
              sx={{ m: 2, minWidth: 320, minHeight: 50 }}
            >
              Прочитати Відгуки
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Вас вітеє форма відпраки відгуків</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Тут Ви можете залиши будь-який відгук про виконану дію, всі Ваші
            побажання будуть враховані та втілені в життя
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            value={name}
            label="Ім'я"
            placeholder="Введіть, будь ласка, ваше Ім'я"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            required
            margin="dense"
            id="reasone"
            value={reasone}
            label="Тема"
            placeholder="Введіть, будь ласка, назву виконаної дії"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setReasone(event.target.value);
            }}
          />
          <TextField
            required
            margin="dense"
            id="description"
            value={description}
            label="Враження"
            placeholder="Введіть, будь ласка, Ваші враження"
            type="text"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <StyledRating
            sx={{ mt: 2 }}
            name="simple-controlled"
            size="large"
            defaultValue={4}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            precision={0.5}
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Закрити вікно
          </Button>
          <Button
            disabled={!isDisabled()}
            onClick={handleSubmit}
            color="success"
          >
            Відправити відгук
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openFeedback} onClose={handleCloseFeedbacks}>
        <DialogTitle>Ну що, тут ми почитаємо що про тебе думають </DialogTitle>
        {feedbacks ? (
          <DialogContent>
            <DialogContentText>
              Тут будуть зібрані всі відгуки, приємного читання
            </DialogContentText>
            {feedbacks.map((feedback) => {
              return (
                <Card sx={{ minWidth: 275, mt: 1 }} key={feedback.id}>
                  <CardContent>
                    <Typography sx={{ fontSize: 18 }} gutterBottom>
                      {`Тема відгуку: ${feedback.reasone}`}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {`Автор відгуку: ${feedback.name}`}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {`Відгук: ${feedback.description}`}
                    </Typography>
                      <StyledRating
                        name="read-only"
                        size="small"
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        value={feedback.rating}
                        readOnly
                      />
                  </CardContent>
                </Card>
              );
            })}
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogContentText>
              Тут будуть зібрані всі відгуки, але на жаль зараз тут пусто
            </DialogContentText>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={handleCloseFeedbacks} color="error">
            Закрити вікно
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
