import React, {Component} from 'react'
import ApiContext from '../ApiContext'
// import Option from './Option'
import config from '../config';

class AddNote extends Component {
    static contextType = ApiContext;

    state= {
        name: '',
        content: '',
        folder: '',
        error: null,
    }
    handleName = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    handleContent = (e) => {
        this.setState({
            content : e.target.value
        })
    }
    handleFolderName = (e) => {

       console.log(this.context.folders)
       
        const folderDeCui = e.target.value
        // console.log(folders.folders)
        const found = this.context.folders.find((element) => {
            return element.name === folderDeCui
        })
        console.log(found.id)

        this.setState({
            folder : e.target.value,
            folderId: found.id
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
       
        let data = this.state
       
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'content-type': 'application/json',
            }
        })
            
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(error => {
                        // then throw it
                        throw error
                    });
                } return res.json()
            })

            .then(this.props.history.push('/'))
            .catch(error => {
                console.error({error});
            });
    }
    
    render() { 
        const { className, ...otherProps } = this.props
        // console.log(this.context.folders)
        const foldersNames = this.context.folders.map(folder => 
        <option key={folder.id} value={folder.name}>{folder.name}</option>
        )
        // console.log(foldersNames)
        return (
            <div>
                <form 
                    className={['Noteful-form', className].join(' ')}
                    action='#'
                    {...otherProps}
                    onSubmit={this.handleSubmit}
                >
                    <h4>Create a Note</h4>
                    <label htmlFor='nameN'>Name</label>
                        <input type='text' id='nameN' placeholder="Note" onChange={this.handleName} />
                    <label htmlFor='nameF'>Content</label>
                        <input type='text' id='nameC' placeholder="Description" onChange={this.handleContent} />
                    <label htmlFor='choseF'>Folder</label>
                        <select id='choseF' onChange={this.handleFolderName}>
                            <option value="" defaultValue="---">---</option>
                            {foldersNames} 
                        </select>
                    <button>Add note</button>
                </form>
            </div>
        );
    }
}
 
export default AddNote;