import React from 'react'
import { post } from 'axios';
import { withStyles } from '@material-ui/core/styles';


class AddCustomer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        file: null,
        fileName: "",
        userName: "",
        gender: "",
        city: "",
        job: ""
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.addCustomer = this.addCustomer.bind(this)
  }
  
  handleFormSubmit(e) {
    e.preventDefault()
    this.addCustomer()
    .then((response) => {
      console.log(response.data);
      this.props.refresh();
    })
    this.setState({
        file: null,
        fileName: "",
        userName: "",
        gender: "",
        city: "",
        job: ""
    })
    // reloads the whole page
    // window.location.reload();
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
    return (
        <form onSubmit={this.handleFormSubmit}>
            <h1>Add Customer</h1>
            Profile Image: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
            Name: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
            Gender: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
            City: <input type="text" name="city" value={this.state.city} onChange={this.handleValueChange}/><br/>
            Job: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
            <button type="submit">Add</button>
        </form>
    )
    }   
}

export default AddCustomer;