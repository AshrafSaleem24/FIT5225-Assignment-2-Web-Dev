
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
        let file = e.target.files[0]

        if (file) {
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
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
        console.log("binary string:", this.state.base64TextString)

        const apiName = 'FIT5225A2WEBAPI'; // replace this with your api name.
        const path = '/dev/testupload'; //replace this with the path you have configured on your API
        const myInit = {
            body: {}, // replace this with attributes you need
            headers: {
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
                "X-Requested-With": "*"   
            //"Access-Control-Allow-Origin":"*", 
            //"Access-Control-Allow-Headers" : "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            //"Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
             //"Access-Control-Allow-Credentials" : true,
            //"Access-Control-Allow-Methods": "OPTIONS,POST"
        }, // OPTIONAL
        };

        API
            .post(apiName, path, myInit)
            .then(response => {
                // Add your code here
                console.log(response.status);
            })
            .catch(error => {
                console.log(error.response);
            });
    }
    render() {
        return (
            <React.Fragment>
                <div style={this.upload_style}>
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