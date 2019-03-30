import React, { Component } from 'react';
import moment from 'moment';
import * as io from 'socket.io-client';
import './Chat.css';

class Chat extends Component {

    socketConnection = null;

    constructor() {
        super();
        this.state = {
            author: 'Wojtek B',
            messages: [],
            show: false
        }
        this.socketConnection = io.connect('https://socket-chat-server-yvhjqrpgyq.now.sh');

        this.socketConnection.on('chat message', this.addMessage);
    }

    handleActions = (action) => {
        switch(action.type){
            case 'ADD_MESSAGE':
                this.setState({ messages: [...this.state.messages, action.payload] });
                break;
            case 'OPEN_CHAT':
                this.setState({ show: true });
                break;
            case 'CLOSE_CHAT':
                this.setState({ show: false });
                break;
                
            default: break;
        }
    }

    addMessage = (message) => {
        this.setState({ messages: [...this.state.messages, message] });
        console.log(message);
    }

    handleOpen = () => {
        this.setState({ show: true })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleSend();
    }

    handleSend = () => {
        if (this.message.value) {
            const message = {
                text: this.message.value,
                authorId: this.state.author,
                //timestamp: moment().unix()
            }
            this.socketConnection.emit('chat message', message);
            //this.setState({ messages: [...this.state.messages, message] });
            this.message.value = '';
        }
    }

    timeAgo = (timestamp) => {
        return ( 
            <span className="Chat-message--time">
            {moment(timestamp).fromNow()}
            </span>
        );
    }

    render() {
        return (
            <div>
                {/* <section className={`Chat ${this.state.show ? `Chat--show` : `Chat--hide`}`}> */}
                <section className={`Chat animated ${this.state.show ? `Chat--show fadeIn` : `Chat--hide fadeOut faster`}`}>
                    <header className="Chat-header">
                        <h1>Live Chat</h1>
                        <button onClick={this.handleClose}>&times;</button>
                    </header>

                    <div className="Chat-main">
                        <div className="Chat-messages">
                            {this.state.messages.map((message) => <div className="Chat-message" key={message.id}>{message.text} <div className="Chat-message--author">{message.authorId}, {this.timeAgo(message.timestamp)}</div></div>)}
                        </div>
                    </div>

                    <footer className="Chat-footer">
                        <div className="Chat-footer-inner">
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" ref={input => this.message = input} />
                                <button type="submit">Wyślij</button>
                            </form>
                            {/* <button onClick={this.handleSend}>Wyślij</button> */}

                        </div>
                    </footer>
                </section>

                {/* <button className={`Chat-fab ${!this.state.show ? `Chat-fab--show` : `Chat-fab--hide`}`} onClick={this.handleOpen}>+</button> */}
                <button className={`Chat-fab animated ${!this.state.show ? `Chat-fab--show fadeIn` : `Chat-fab--hide fadeOut faster`}`} onClick={this.handleOpen}>+</button>
            </div>
        )
    }
}

export default Chat;