import React from 'react'
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
const SubInputAdornment = (props) => {
    return (
        <div>
             <InputAdornment
                    position={'end'}
                    style={{
                     maxHeight: 'none',
                     height: 'auto',
                     marginTop: '-1px',
                     marginRight: '-1px',
                     marginBottom: '-1px',
                    }}
                   >
                    {props.Dataicon}
                   </InputAdornment>   
                     </div>
    )
}

export default SubInputAdornment
