import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
class DeleteCustomer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false
        }
    }

    handleOpenWindow = () => {
        this.setState({
            opened: true
        })
    }

    handleCloseWindow = () => {
        this.setState({
            opened: false
        })
    }
    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.refresh();
    }

    render() {
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleOpenWindow}>Delete</Button>
                <Dialog open={this.state.opened} onClose={this.handleCloseWindow}>
                    <DialogTitle onClose={this.handleCloseWindow}>
                        Delete Warning
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            Customer Info will be removed
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>Delete</Button>
                        <Button variant="outlined" onClick={this.handleCloseWindow}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default DeleteCustomer;