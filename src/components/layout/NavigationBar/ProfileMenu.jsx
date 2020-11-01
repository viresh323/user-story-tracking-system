import { Avatar } from '@material-ui/core'
import AUTH_SERVICE from '../../../services/auth'
import { makeStyles } from '@material-ui/core/styles';

const profileDetails = AUTH_SERVICE.GetAuthModel();
const useStyles = makeStyles((theme) => ({
    avatar: {
      marginLeft: theme.spacing(2),
      cursor: 'pointer'
    },


  }));

export default ()=>{

  const classes = useStyles();
    return (
    <span>
        {profileDetails.firstName + profileDetails.lastName}
                    <Avatar 
                      className={classes.avatar}
                       alt={profileDetails.firstName + profileDetails.lastName}
                       src={profileDetails.picture}
                      />
    </span>  
    )
}