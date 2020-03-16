import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import DeleteCustomer from './DeleteCustomer'
// React.Component has props.
class Customer extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image}/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.city}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><DeleteCustomer refresh = {this.props.refresh} id = {this.props.id}/></TableCell>
            </TableRow>
        );
    }
}

export default Customer;