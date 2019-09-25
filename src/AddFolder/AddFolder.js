import React, {Component} from 'react'

class AddFolder extends Component {

    state= {
        name: '',
        error: null,
    }
    handleChange = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.name)
    }
    
    render() { 
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='nameF'>Name new Folder</label>
                    <input type='text' id='nameF' defaultValue="Folder" onChange={this.handleChange} />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
 
export default AddFolder;