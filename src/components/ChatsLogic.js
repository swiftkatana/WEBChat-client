import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from '../../io';
// eslint-disable-next-line no-unused-vars
import WebRtcTools from '../../webRTCTools';

class ChatsLogic extends Component {

    componentDidMount() {

        io.on('chat' + this.chatId, (data) => {
            if (data.senderId !== this.props.user.email) {
                setTimeout(this.scrollToBottom, 100);
                this.newMessageAudio.play();
            }
            this.setState({ meassges: [...this.state.meassges, data] })

        });



        io.on('message', (data) => {

            switch (data.type) {
                case "offer":
                    console.log('new offer');
                    this.setState({ gotAcall: data, show: true });
                    break;
                case "answer":
                    console.log('new answer', data)
                    this.onAnswer(data.answer);
                    break;
                case "candidate":
                    console.log('new ice candate', data)
                    this.onCandidate(data.candidate);
                    break;
                default:
                    console.log("Got message", data);

                    break;
            }
        })







        this.scrollToBottom();

    }
    render() {
        return (
            <>

            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsLogic)
