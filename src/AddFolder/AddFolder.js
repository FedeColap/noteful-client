import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import config from '../config';
import PropTypes from 'prop-types';

class AddFolder extends Component {
    static contextType = ApiContext;

    
    

    state= {
        name: ""
    }
    handleChange = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        const name = this.state
        console.log(e)
        
        fetch(`${config.API_ENDPOINT}/folders`,{
            method: 'POST',
            body: JSON.stringify(name),
            headers: {
            'content-type': 'application/json',
            }
        })
            .then((res) => {
                console.log(res)
                if (!res.ok) {
                    // get the error message from the response,
                    return res.json().then(error => {
                      // then throw it
                      throw error
                    })
                    
                } return res.json()
            })
            // .then(this.props.retrieveAdjFolders())
            .then(data => {
                this.props.history.push('/')
                this.context.addFolder(data)
            })
            .catch(error => {
                console.error({error});
            });
    }
    
    render() { 
        const { className, ...otherProps } = this.props
        const {name} = this.state
        return (
            <div>
                <form 
                    className={['Noteful-form', className].join(' ')}
                    action='#'
                    {...otherProps}
                    onSubmit={this.handleSubmit}
                >
                    <h4>Create a folder</h4>
                    <label htmlFor='nameF'>Name</label>
                        <input type='text' id='nameF' placeholder="Folder" value={name} onChange={this.handleChange} />
                    <button>Add Folder</button>
                </form>
            </div>
        );
    }
}
 
export default AddFolder;

AddFolder.defaultProps = {
    name: "New Folder"
  };

AddFolder.propTypes = {
  name: PropTypes.string.isRequired
};