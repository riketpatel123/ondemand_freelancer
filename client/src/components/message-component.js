import React, { Component } from 'react';
import { connect } from "react-redux";
import io from "socket.io-client";
import '../message.css';

//Socket io Server connection 
const socket = io.connect("http://localhost:8000");

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: [],
            msg: "",
            from: this.props.auth.user.username,
            to: this.props.match.params.name
        };
    }
    componentDidMount() {
        var emitReciver = this.state.from + "message";
        socket.on(emitReciver, ({ from, msg }) => {
            this.setState({
                chat: [...this.state.chat, { from, msg }]
            });
        });
    }
    // Function for getting text input
    onTextChange = e => {
        this.setState({ msg: e.target.value });
    };

    // Function for sending message to chat server
    onMessageSubmit = () => {
        const { from, to, msg } = this.state;
        socket.emit("chat message", { from, to, msg });
        this.setState({ msg: "" });
        this.setState({
            chat: [...this.state.chat, { from, msg }]
        });
    };
    render() {
        return (
            <div>
                <h2><i class="fas fa-comments m-3" style={{ color: "blue" }}></i>Messaging</h2>
                <div className="chatWindow">
                    <ul className="chat" id="chatList">
                        {this.state.chat.map(({ from, msg }, id) => (
                            <div key={id}>
                                {this.state.from === from ? (
                                    <li className="self">
                                        <div className="msg">
                                            <p>You</p>
                                            <div className="message"> {msg}</div>
                                        </div>
                                    </li>
                                ) : (
                                        <li className="other">
                                            <div className="msg">
                                                <p>{from}</p>
                                                <div className="message"> {msg} </div>
                                            </div>
                                        </li>
                                    )}
                            </div>
                        ))}
                    </ul>
                    <div className="chatInputWrapper">
                        <form onSubmit={this.onMessageSubmit} className="form-inline">
                            <input
                                className="textarea input w-75"
                                type="text"
                                placeholder="Enter your message..."
                                onChange={e => this.onTextChange(e)}
                                value={this.state.msg}
                            />
                            <button className="btn btn-primary" type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(Message);
