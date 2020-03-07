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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },

  table: {
    minWidth: 1080
  }
})

const customers = [{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': 'Louis',
  'job': 'Software Developer'
},
{
  'id': 2,
  'image': "https://placeimg.com/64/64/2",
  'name': 'Thomas',
  'job': 'Graphic Designer'
},
{
  'id': 3,
  'image': "https://placeimg.com/64/64/3",
  'name': 'Emily',
  'job': 'Business Analyst'
}
]
class App extends React.Component {

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
              { customers.map(c => {
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
              }) 
            }
            </TableBody>
          </Table> 
      </Paper>
    );
  }
}

export default withStyles(styles) (App);