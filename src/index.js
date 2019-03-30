import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from './components/Chat';

// 1. Import niezbednych elementow
import { createStore } from 'redux'; // dostepne wszedzie
import { connect, Provider } from 'react-redux';  // dostepne w react

// 2. Tworzymy Reducer

// przyjmuje zawsze 2 parametry state i action
// Zawsze wraca nowy stan

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return { ...state, messages: [...state.messages, action.payload] }
        case 'OPEN_CHAT':
            return { ...state, show: true }
        case 'CLOSE_CHAT':
            return { ...state, show: false }
        default: return state;
    }
}
// 3. Domyslny Stan Aplikacji
const defaultState = {
    author: 'Wojtek B',
    messages: [],
    show: false,
    bla: 'bla'
}

// 4. Tworzymy nasz store
const store = createStore(
    reducer,
    defaultState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 5. Wybieramy wlasciwosci ze stanu zeby podpiac je do komponentu
const mapStateToProps = state => {
    return {
        author: state.author,
        messages: state.messages,
        show: state.show
    }
}

// 6. Wybieramy akcje z ktorych bedzie chcial korzystac komponent
const mapDispatchToProps = dispatch => {
    return {
        openChat: () => dispatch({ type: 'OPEN_CHAT' }),
        closeChat: () => dispatch({ type: 'CLOSE_CHAT' }),
        addMessage: (message) => dispatch({ type: 'ADD_MESSAGE', payload: message }),
    }

}
// Podpinamy store do komponentu
const ConnectedChat = connect(mapStateToProps, mapDispatchToProps)(Chat);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedChat />
    </Provider>,
    document.getElementById('root')
);