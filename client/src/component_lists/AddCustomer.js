import React from 'react'
import { post } from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


const styles = theme => ({
  hidden: {
    display: 'none'
  }
});
class AddCustomer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        file: null,
        fileName: "",
        userName: "",
        gender: "",
        city: "",
        job: "",
        opened: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.addCustomer = this.addCustomer.bind(this)
    this.handleOpenWindow = this.handleOpenWindow.bind(this)
    this.handleCloseWindow = this.handleCloseWindow.bind(this)
  }
  
  handleFormSubmit(e) {
    e.preventDefault()
    this.addCustomer()
    .then((res) => {
      console.log(res.data);
      this.props.refresh();
    });
    this.setState({
        file: null,
        fileName: "",
        userName: "",
        gender: "",
        city: "",
        job: "",
        opened: false
    });
    // reloads the whole page
    // window.location.reload();
  }


  handleOpenWindow = () => {
    this.setState({
      opened: true
    });
  }

  handleCloseWindow = () => {
    this.setState( {
      file: null,
      fileName: "",
      userName: "",
      gender: "",
      city: "",
      job: "",
      opened: false
    });
  }
  
  handleFileChange(e) {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value
    });
  }
  
  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  addCustomer(){
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', this.state.file);
    formData.append('name', this.state.userName);
    formData.append('gender', this.state.gender);
    formData.append('city', this.state.city);
    formData.append('job', this.state.job);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }




 
  render() {
    const { classes } = this.props;
    return (
        <div>
          <Button variant="contained" color="primary" onClick={this.handleOpenWindow}>Add Customer</Button>

          <Dialog open={this.state.opened} onClose={this.handleCloseWindow}>
                <DialogTitle>Customer Info</DialogTitle>
                <DialogContent>
                  <input className={classes.hidden} accept="image/*" id="fileButton" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                  <label htmlFor="fileButton">
                    <Button variant="contained" color="primary" component="span" name="file">
                      { this.state.fileName === "" ? "select profile" : this.state.fileName }
                    </Button>
                  </label>
                  <br/>
                  <TextField label="Name" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                  <TextField label="Gender" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                  <TextField label="City" type="text" name="city" value={this.state.city} onChange={this.handleValueChange}/><br/>
                  <TextField label="Job" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" color="secondary" onClick={this.handleFormSubmit}>Add</Button>
                  <Button variant="contained" onClick={this.handleCloseWindow}>Close</Button>
                </DialogActions>
          </Dialog>
          
        </div>
        // <form onSubmit={this.handleFormSubmit}>
        //     <h1>Add Customer</h1>
        //     Profile Image: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
        //     Name: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
        //     Gender: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
        //     City: <input type="text" name="city" value={this.state.city} onChange={this.handleValueChange}/><br/>
        //     Job: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
        //     <button type="submit">Add</button>
        // </form>
    )
    }   
}

export default withStyles(styles)(AddCustomer);