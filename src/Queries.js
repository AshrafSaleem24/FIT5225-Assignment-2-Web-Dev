
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
        console.log("binary string:", this.file.name)
        const apiName = 'fit5225web'; 
        const path = '/find-by-image-function'; 
        const myInit = {
            body: { name: this.file.name, file: this.state.base64TextString },
            headers: {
            }, 
        };

        API
            .post(apiName, path, myInit)
            .then(response => {
                console.log(response.status);
                alert(response["links"]);
            })
            .catch(error => {
                console.log(error.response);
            });
        
    }

    onChangeFindTags = (e) => {
        console.log(e.target.value.split(","))
        this.findTagsValue = e.target.value.split(",")
    }

    onFindTagsSubmit = (e) => {
        e.preventDefault()
        const apiName = 'fit5225web'; 
        const path = '/find-by-tags-function'; 
        const myInit = {
            body: { tags: this.findTagsValue },
            headers: {
            }, 
        };

        API
            .post(apiName, path, myInit)
            .then(response => {
                console.log(response.status);
                alert(response["links"]);
            })
            .catch(error => {
                console.log(error.response);
            });
        
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
        const apiName = 'fit5225web'; 
        const path = '/add-delete'; 
        const myInit = {
            body: { url: this.addTagsUrl, tags: this.addTextTag }, 
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
            alert("Submission of tags for add tags function has been completed.");
    }

    onChangeDeleteTags = (e) => {
        this.deleteUrl = e.target.value
        console.log(this.deleteUrl)
    }

    onDeleteSubmit = (e) => {
        e.preventDefault()
        const apiName = 'fit5225web'; 
        const path = '/delete'; 
        const myInit = {
            body: {url: this.deleteUrl }, 
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
            alert("Deletion of file has been completed");
    }

    render() {
        return (
            <React.Fragment>
                <div style={this.upload_style}>
                    <h2> Query Page </h2>
                    <p>
                        When using the Find By Image or Find By Tags function please wait until a pop-up box appears with the link/links are returned by the server.
                    </p>
                    <p>
                        In the event they are no matching images, the server will return a pop-up box with no links. Please ensure you close all pop up boxes !
                    </p>
                    <div style={this.upload_style}>
                        <h3> Find By Image </h3>
                        <p> Please submit the file you would like to use for the query option.</p>
                        <form onSubmit={(e) => this.onFileSubmit(e)} onChange={(e) => this.onChange(e)}>
                            <input type="file" name="image" id="file" accept=".jpeg, .png, .jpg, .txt" />

                            <input type="submit" />
                        </form>
                    </div>

                    <div style={this.upload_style}>
                        <h3> Find By Tags </h3>
                        <p> Please enter the tags you want and use , to seperate the tags.</p>
                        <form onSubmit={(e) => this.onFindTagsSubmit(e)}>
                            <textarea name="findtagstext" placeholder="Enter tags" onChange={(e) => this.onChangeFindTags(e)} />

                            <input type="submit" style={this.button_style} />
                        </form>
                    </div>

                    <div style={this.upload_style}>
                        <h3> Add Tages </h3>
                        <p> Please enter the url first, then the tags you wish. Use , to seperate each tags and the url.</p>
                        <p> Example: url,tag1,tag2,tag3.</p>
                        <form onSubmit={(e) => this.onAddTagsSubmit(e)}>
                            <textarea name="addtagtext" placeholder="Enter tags to add" onChange={(e) => this.onChangeAddTagsUrl(e)} />
                            
                            <input type="submit" style={this.button_style} />
                        </form>
                    </div>

                    <div style={this.upload_style}>
                        <h3> Delete Image</h3>
                        <p> Please enter the URL to the image you wish to delete.</p>
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