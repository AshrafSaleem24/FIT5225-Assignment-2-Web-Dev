
import React from 'react'
import { API } from 'aws-amplify';

class QueryComp extends React.Component {
    constructor(props) {
        super(props);

        this.upload_style = {
            marginTop: '20px',
            marginBottom: '20px'
        }

        this.button_style = {
            marginLeft: '20px'
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
        //console.log("binary string:", this.state.base64TextString)
        console.log("binary string:", this.file.name)
        const apiName = 'fit5225web'; // replace this with your api name.
        const path = '/test'; //replace this with the path you have configured on your API
        const myInit = {
            body: { name: this.file.name, file: this.state.base64TextString }, // replace this with attributes you need
            headers: {
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
            alert("Submission of file name: " + this.file.name + " was successful.");
    }

    onChangeFindTags = (e) => {
        console.log(e.target.value.split(","))
        this.findTagsValue = e.target.value.split(",")
    }

    onFindTagsSubmit = (e) => {
        e.preventDefault()
        //console.log("binary string:", this.state.base64TextString)
        const apiName = 'fit5225web'; // replace this with your api name.
        const path = '/test'; //replace this with the path you have configured on your API
        const myInit = {
            body: { tags: this.findTagsValue }, // replace this with attributes you need
            headers: {
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
        alert("Submission of tags for find by tags function has been completed.");
    }

    onChangeAddTagsUrl = (e) => {
        this.addTagsUrl = e.target.value.split(",")[0]
        console.log(this.addTagsUrl)
        if (e.target.value.split(",").length > 1) {
            this.addTextTag = e.target.value.split(",")
            this.addTextTag.shift()
            console.log(this.addTextTag)
        }

    }

    onAddTagsSubmit = (e) => {
        e.preventDefault()
        //console.log("binary string:", this.state.base64TextString)
        const apiName = 'fit5225web'; // replace this with your api name.
        const path = '/test'; //replace this with the path you have configured on your API
        const myInit = {
            body: { url: this.addTagsUrl, tags: this.addTextTag }, // replace this with attributes you need
            headers: {
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
            alert("Submission of tags for add tags function has been completed.");
    }

    onChangeDeleteTags = (e) => {
        this.deleteUrl = e.target.value
        console.log(this.deleteUrl)
    }

    onDeleteSubmit = (e) => {
        e.preventDefault()
        //console.log("binary string:", this.state.base64TextString)
        const apiName = 'fit5225web'; // replace this with your api name.
        const path = '/test'; //replace this with the path you have configured on your API
        const myInit = {
            body: {url: this.deleteUrl }, // replace this with attributes you need
            headers: {
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
            alert("Deletion of file has been completed");
    }

    render() {
        return (
            <React.Fragment>
                <div style={this.upload_style}>
                    <h2> Query Page </h2>
                    <div style={this.upload_style}>
                        <h3> Find By Image </h3>
                        <p> Please submit the file you would like to use for the query option</p>
                        <form onSubmit={(e) => this.onFileSubmit(e)} onChange={(e) => this.onChange(e)}>
                            <input type="file" name="image" id="file" accept=".jpeg, .png, .jpg, .txt" />

                            <input type="submit" />
                        </form>
                    </div>

                    <div style={this.upload_style}>
                        <h3> Find By Tages </h3>
                        <p> Please enter the tags you want and use , to seperate the tags</p>
                        <form onSubmit={(e) => this.onFindTagsSubmit(e)}>
                            <textarea name="findtagstext" placeholder="Enter tags" onChange={(e) => this.onChangeFindTags(e)} />

                            <input type="submit" style={this.button_style} />
                        </form>
                    </div>

                    <div style={this.upload_style}>
                        <h3> Add Tages </h3>
                        <p> Please enter the url first, then the tags you wish. Use , to seperate each tags and the url</p>
                        <p> Example: url,tag1,tag2,tag3</p>
                        <form onSubmit={(e) => this.onAddTagsSubmit(e)}>
                            <textarea name="addtagtext" placeholder="Enter tags to add" onChange={(e) => this.onChangeAddTagsUrl(e)} />
                            
                            <input type="submit" style={this.button_style} />
                        </form>
                    </div>

                    <div style={this.upload_style}>
                        <h3> Delete Image</h3>
                        <form  onSubmit={(e) => this.onDeleteSubmit(e)}>
                            <input type="text" placeholder="Enter url" onChange={(e) => this.onChangeDeleteTags(e)}/>

                            <input type="submit" style={this.button_style} />
                        </form>
                    </div>

                </div>

            </React.Fragment>
        )
    }
}
export default QueryComp