import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    margin: {
      margin: theme.spacing(1)
    },
    textField: {
      width: 310,
      "&:hover .MuiInputLabel-root": {
        color: theme.palette.text.primary
      },
      "& .Mui-focused.MuiInputLabel-root": {
        color: theme.palette.primary.main
      }
    },
    outlinedInput: {
      "&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
        color: theme.palette.text.primary
      },
      "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
        color: theme.palette.primary.main
      }
    }
  }));
  export default useStyles