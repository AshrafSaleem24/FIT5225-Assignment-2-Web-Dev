
import React from 'react'
import { API } from 'aws-amplify';

class UploadComp extends React.Component {

    constructor(props) {
        super(props);

        this.upload_style = {
            marginTop: '20px',
            marginBottom: '20px'
        }
    }

    onChange = (e) => {
        console.log("file to upload:", e.target.files[0])
        this.file = e.target.files[0]

        if (this.file) {
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this)
            reader.readAsBinaryString(this.file)
        }
    }

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.setState({
            base64TextString: btoa(binaryString)
        })
    }

    onFileSubmit = (e) => {
        e.preventDefault()
        console.log("binary string:", this.file.name)
        const apiName = 'fit5225web'; 
        const path = '/upload-on-s3-function'; 
        const myInit = {
            body: {name:this.file.name, file:this.state.base64TextString}, 
            headers: {
        }, 
        };

        API
            .post(apiName, path, myInit)
            .then(response => {
                console.log(response.status);
            })
            .catch(error => {
                console.log(error.response);
            });
            alert("Submission of file name: " + this.file.name + " was successful.");
    }
    render() {
        return (
            <React.Fragment>
                <div style={this.upload_style}>
                    <h2> Upload Page </h2>
                    <p> Please submit the file you would like to use for the upload option and please ensure you close all pop up boxes !</p>
                    <form onSubmit={(e) => this.onFileSubmit(e)} onChange={(e) => this.onChange(e)}>
                        <input type="file" name="image" id="file" accept=".jpeg, .png, .jpg" />

                        <input type="submit" />
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
export default UploadComp