import { connect } from "react-redux";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Paper, TextField,Typography} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import USER_STORY_SERVICE from "../../../services/user_story_service";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: 50,
      width : 700
    }
  }));

  const userStoryTypes = [
    {
      value: 'enhancement',
      label: 'Enhancement',
    },
    {
      value: 'bugfix',
      label: 'Bugfix',
    },
    {
      value: 'development',
      label: 'Development',
    },
    {
      value: 'qa',
      label: 'QA',
    },
  ];

  const complexityList = [
    {
      value: 'low',
      label: 'Low',
    },
    {
      value: 'mid',
      label: 'Mid',
    },
    {
      value: 'high',
      label: 'High',
    }
  ];

export default connect(({ isLoading }) => ({ isLoading }))(props => {
    const [state, setState] = React.useState({
        summary : "",
        description : "",
        type : "",
        cost : "",
        complexity: "",
        estimatedHrs: 0,
        status: ""
    })
    const [error, setError] = React.useState("");
    
    const classes = useStyles();
    const SetFormElement = (event,id)=>{
       let stateId = event.target.id;
        if(stateId===undefined)
       {
        stateId =id 
       }
       setState({...state,[stateId]:event.target.value})
    }

    
    const SubmitForm = async ()=>{

        if (state["summary"] === "" ||  state["type"] === "" || state["cost"]==="") {
            setError("Fields are required");
            return;
          }
        let payload = {
        "summary": state["summary"],
        "description": state["description"],
        "type": state["type"],
        "cost": state["cost"],
        "complexity": state["complexity"],
        "estimatedHrs": state["estimatedHrs"],
        "status": state["status"]
        }
        await USER_STORY_SERVICE.Create_User_Story(payload);
        window.location.href = window.location.origin + "#" + "/UserGrid";
    }
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
                           <Typography variant="h6" >Create a user story</Typography>
                           </Grid>
                           <Grid item xs={12} >
                           <TextField
                              id="summary"
                              label="Summary"
                              variant="outlined"
                              fullWidth
                              onChange=  {(event)=>SetFormElement(event)}
                            />
                            </Grid>
                            <Grid item xs={12} >
                             <TextField
                              id="description"
                              label="Description"
                              multiline
                              rows={4}
                              variant="outlined"
                              fullWidth
                              onChange=  {(event)=>SetFormElement(event)}
                            />
                             </Grid>
                            <Grid item xs={12} >
                             <TextField
                              id="type"
                              select
                              label="Type"
                              variant="outlined"
                              fullWidth
                              value= {state["type"]}
                              onChange=  {(event)=>SetFormElement(event,"type")}
                            >
                                 {userStoryTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
                                </TextField>
                             </Grid>
                            <Grid item xs={12} >
                             <TextField
                              id="complexity"
                              select
                              label="Complexity"
                              variant="outlined"
                              fullWidth
                              value= {state["complexity"]}
                               onChange =  {(event)=>SetFormElement(event,"complexity")}
                            >
                                  {complexityList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
                                </TextField>
                             </Grid>
                            <Grid item xs={12} >
                             <TextField
                              id="estimatedHrs"
                              label="Estimate Time (hrs)"  
                              variant="outlined"
                              onChange =  {(event)=>SetFormElement(event)}
                            />
                             </Grid>
                            <Grid item xs={12} >
                             <TextField
                              id="cost"
                              label="Cost associated"  
                              type="number"
                              onChange = {(event)=>SetFormElement(event)}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                              }}
                              variant="outlined"
                            />
                           </Grid>
                           <Grid item xs={12}>
                           <Button variant="contained" color="primary" type="submit" className="submit-button" onClick={SubmitForm}>Submit</Button>
                           </Grid>
                           </Grid>
                           {error && (
        <Alert severity="error" onClick={() => setError(null)}>
          {props.error || error}
        </Alert>
      )}
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