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
import AddCustomer from './component_lists/AddCustomer'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
const styles = theme => ({
  root: {
    width: '100%',
    minwidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  menu: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  grow: {
    flexGrow: 1
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      },
    },
  }
});


class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      customers: "",
      // progress bar starts from 0.
      completed: 0,
      searchKeyword: ""
    }
  }

  refresh = () => {
    this.setState({
      customers: "",
      completed: 0,
      searchKeyword: ""
    })

    this.callApi().then(res => this.setState({
      customers: res
    })).catch(err => console.log(err));
    
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi().then(res => this.setState({
      customers: res
    })).catch(err => console.log(err));
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

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  render() {

    const filterComponents = (data) => {
      data = data.filter((d) => {
        return d.name.indexOf(this.state.searchKeyword) > -1;
      })
      return data.map((c) => {
        return <Customer refresh={this.refresh} key={c.id} id={c.id} image={c.image} name={c.name} gender={c.gender} city={c.city} job={c.job}/>
      })
    }


    // const classes = this.props.classes
    const { classes } = this.props;
    const list = ["Id", "Image", "Name", "Gender", "City", "Job", "Setting"];
    return ( 
      <div>
          <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Customer Management System
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <AddCustomer refresh={this.refresh}/>
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
           <TableHead>
             <TableRow>
               {list.map(m => {
                 return <TableCell className={classes.tableHead}>{m}</TableCell>
               })}
             </TableRow>
           </TableHead>
           <TableBody>
              {/* since I am calling calllAPI() asynchronously, when this line is first reached,
              this.state.customers is empty. Thus, I am adding in this.state.customers ? to check
              whether it is valid or not first to avoid the type error. */}
              {this.state.customers ? filterComponents(this.state.customers)
              : 
              <TableRow>
                <TableCell colSpan="7" align="center">
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
      </div>
    );
  }
}

export default withStyles(styles) (App);