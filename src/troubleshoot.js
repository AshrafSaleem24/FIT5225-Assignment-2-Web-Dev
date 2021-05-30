import React from 'react'

class TroubleshootComp extends React.Component {
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

    render() {
        return (
            <React.Fragment>
                <h3>
                    Uploading image will show error if no image entered
                </h3>
                <p>
                    To fix this issue, just refresh the page.
                </p>
                <h3>
                    Pop-Up box does not immediately apepar.
                </h3>
                <p>
                    Please note in the case of find by tags and image functions, you will need to wait a bit for the processing to occur and information to be sent back to you.
                </p>
                <h3>
                    Request may have not been sent.
                </h3>
                <p>
                    Please ensure you click the alert box or try sending the request again. This may have occured as the acknowledgement from the pop up box may trigger a send request.
                </p>
                
            </React.Fragment>
        )
    }
}
export default TroubleshootComp