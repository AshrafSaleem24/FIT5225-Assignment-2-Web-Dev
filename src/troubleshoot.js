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
                    Uploading image will show error if no image entered.
                </h3>
                <p>
                    To fix this issue, just refresh the page.
                </p>
                
            </React.Fragment>
        )
    }
}
export default TroubleshootComp