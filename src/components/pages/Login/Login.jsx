import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Paper, TextField,Typography} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './Login.css';
import AUTH_SERVICE from '../../../services/auth';
import CredentialsModel from '../../../view_models/CredentialsModel.json';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
      width: 350,
      marginTop: 100
    }
  }));

export default connect(({ isLoading }) => ({ isLoading }), { AUTH_SERVICE })(props => {
    const [state, setState] = React.useState({
        isAdmin : false,
        emailId : "",
        password : ""
    })
    const enableAdminLogin = (event) => {
        setState({ ...state, ["isAdmin"]: event.target.checked });
      };

    const Authenticate = async ()=>{
        CredentialsModel.emailId = state["emailId"];
        CredentialsModel.password =  state["password"];
        CredentialsModel.isAdmin = state["isAdmin"];

        let authModel = await AUTH_SERVICE.AuthenticateUser(CredentialsModel);

        if(typeof (authModel) ==undefined)
        {
            return ; 
        }
        switch (authModel.role)
        {
            case "Admin" :
                window.location.href = window.location.origin + "#" + "/Admin";
                break;
            default : 
            window.location.href = window.location.origin + "#" + "/User";

        }
    } 

    const classes = useStyles();
    return (
        <div className={classes.root}>
             <Grid container justify="center" wrap="wrap">
                 <Grid item>
                     <Grid container justify="center">
                     <Grid item xs={12}>
                     <FormGroup>
                     <Grid container direction="row" spacing={2}>
                       <Paper elevation={3} className={classes.paper}>
                           <Grid container direction = "column" spacing={2} className="login-grid">
                           <Grid item xs={12}>
                           <Typography variant="h6" >Welcome!</Typography>
                           </Grid>
                           <Grid item xs={12}>
                           <TextField type="email" placeholder="Email Id" variant="outlined" fullWidth required onChange={(event)=>setState({...state,["emailId"]:event.target.value})}/>
                           </Grid>
                           <Grid item xs={12}>
                           <TextField type="password" placeholder="Password" variant="outlined"  fullWidth required onChange={(event)=>setState({...state,["password"]:event.target.value})}/>
                           </Grid>
                           <Grid item xs={12}>
                               
                     <FormControlLabel
          control={<Switch checked={state.isAdmin} onChange={enableAdminLogin}/>}
          label="Login as Admin"
        />
                           </Grid>
                           <Grid item xs={12}>
                           <Button variant="contained" color="primary" type="submit" className="login-button" onClick={Authenticate}>Login</Button>
                           </Grid>
                           </Grid>
                      
                           </Paper>
                         
                       </Grid>
                         </FormGroup>
                             </Grid>
                    
                     </Grid>
                 </Grid>
           
            </Grid>
        
        </div>
      );
});