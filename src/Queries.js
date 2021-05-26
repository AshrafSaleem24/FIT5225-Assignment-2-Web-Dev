
import React from 'react'
import { API } from 'aws-amplify';

class QueryComp extends React.Component {

    constructor(props) {
        super(props);

        this.query_style = {
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
        const path = '/testupload'; //replace this with the path you have configured on your API
        const myInit = {
            body: {}, // replace this with attributes you need
            headers: {}, // OPTIONAL
        };

        API
            .post(apiName, path, myInit)
            .then(response => {
                // Add your code here
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
export default QueryComp