import React, { Component } from 'react';
import moment from 'moment';
import * as io from 'socket.io-client';
import './Chat.css';

// 7. Przepisuje wszystko co bylo oparte na this.state i this.handleAction na propsy
class Chat extends Component {
    socketConnection = null;

    constructor(props) { // jezeli chcemy odzczytac propsy w construktor trzeba zdefiniowac
        super(props);
        this.socketConnection = io.connect('https://socket-chat-server-yvhjqrpgyq.now.sh');
        this.socketConnection.on('chat message', props.addMessage);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleSend();
    }

    handleSend = () => {
        if (this.message.value) {
            const message = {
                text: this.message.value,
                authorId: this.props.author,
            }
            this.socketConnection.emit('chat message', message);
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
                <section className={`Chat animated ${this.props.show ? `Chat--show fadeIn` : `Chat--hide fadeOut faster`}`}>
                    <header className="Chat-header">
                        <h1>Live Chat</h1>
                        <button onClick={this.props.closeChat}>&times;</button>
                    </header>

                    <div className="Chat-main">
                        <div className="Chat-messages">
                            {this.props.messages.map((message) => <div className="Chat-message" key={message.id}>{message.text} <div className="Chat-message--author">{message.authorId}, {this.timeAgo(message.timestamp)}</div></div>)}
                        </div>
                    </div>

                    <footer className="Chat-footer">
                        <div className="Chat-footer-inner">
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" ref={input => this.message = input} />
                                <button type="submit">Wyślij</button>
                            </form>
                        </div>
                    </footer>
                </section>

                <button className={`Chat-fab animated ${!this.props.show ? `Chat-fab--show fadeIn` : `Chat-fab--hide fadeOut faster`}`} onClick={this.props.openChat}>+</button>
            </div>
        )
    }
}
export default Chat;