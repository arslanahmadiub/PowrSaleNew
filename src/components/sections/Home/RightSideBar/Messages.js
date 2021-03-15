import React from "react"
import Grid from "@material-ui/core/Grid"
import MessagePreview from "./MessagePreview"


const Messages = props => {
    const messages = props?.messages || [];
    return <Grid container direction="column" spacing={5}>
        <Grid item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><h3 style={{ padding: 0, margin: 0, display: "inline-block" }}>Messages</h3></div>
                <div><small style={{ textDecoration: "underline", color: "#31BDF4", }}>view all</small></div>
            </div>
        </Grid>
        {
            messages?.map(message => <div key={message.id} style={{ padding: "5px" }}>
                <MessagePreview key={message.id} sender={message.sender} image={message.image} message={message.message} />
            </div>
            )
        }
    </Grid >
}

export default Messages;