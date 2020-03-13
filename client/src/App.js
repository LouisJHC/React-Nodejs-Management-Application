import React from 'react'
import './App.css'
import Customer from './component_lists/Customer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },

  table: {
    minWidth: 1080
  },

  progress: {
    margin: theme.spacing.unit * 2
  }
});


class App extends React.Component {
  
  state = {
    customers: "",
    // progress bar starts from 0.
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi().then(res => this.setState({
      customers: res
    })).catch(error => console.log(error));
  }

  callApi = async () => {
    const res = await fetch('/api/customers');
    const body = await res.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  }
  render() {
    // const classes = this.props.classes
    const { classes } = this.props;
    return ( 
      <Paper className={classes.root}>
        <Table className={classes.table}>
           <TableHead>
             <TableRow>
               <TableCell>id</TableCell>
               <TableCell>image</TableCell>
               <TableCell>name</TableCell>
               <TableCell>job</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
              {/* since I am calling calllAPI() asynchronously, when this line is first reached,
              this.state.customers is empty. Thus, I am adding in this.state.customers ? to check
              whether it is valid or not first to avoid the type error. */}
              {this.state.customers ? this.state.customers.map(c => {
                return (
                  <Customer
                  // A key to identify each element. Since I already have id which is unique for each person, I am using id as a key.
                  key = {c.id}
                  id = {c.id}
                  image = {c.image}
                  name = {c.name}
                  job = {c.job}
                  />
                );
              }) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  {/* From material-ui website:
                      "Determinate circular indicators fill the invisible, circular track with color, as the indicator moves from 0 to 360 degrees.
                      Indeterminate circular indicators grow and shrink in size while moving along the invisible track." */}
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
                </TableCell>
              </TableRow>
              
              }

            </TableBody>
          </Table> 
      </Paper>
    );
  }
}

export default withStyles(styles) (App);
