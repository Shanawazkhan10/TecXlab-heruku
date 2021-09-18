import React, { useState } from 'react';
import SweetAlert from 'sweetalert2-react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ConfirmPage = () => {
  const [Popup, setPopup] = useState(false);
  const classes = useStyles();
  const [open] = React.useState(true);

  var pagePath = window.location.pathname;
  var user_id = pagePath.split('/');
  console.log(user_id[2]);
  // useEffect(() => {
  //   {
  //     setTimeout(() => {
  //           setOpen(false);
  //           setPopup(true);
  //         }, 3000)
  //   }
  //   localStorage.setItem("email-confirm","true")
  // }, []);
  const handleClick = () => {
    window.location.href = '/PanEmailVerify';
    setPopup(false);
  };
  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <SweetAlert
        show={Popup}
        title="Accout Verify Successfully Go back to main tab"
        // text="SweetAlert in React"
        onConfirm={handleClick}
        showConfirmButton={false}
      />
    </div>
  );
};

export default ConfirmPage;
