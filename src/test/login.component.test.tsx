import LoginView from '../login/login.component';
import { reducer, initialState } from "../login/login.component";
import renderer from 'react-test-renderer';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';
import React from 'react';

const history = createMemoryHistory();
const path = `/route/:id`;

function initializeComponent() {
    const wrapper = renderer.create(
        <LoginView history={history}
            location={location}
            match={match} />
    );
    const inst = wrapper.getInstance();
    inst.state = initialState;
    return inst;
}
const location = createLocation(path.replace(':id', '1'));
describe('Login component reducer function', function () {
    const inst = initializeComponent();

    it('initial state', function () {
        expect(inst.state.username).toEqual('');
        expect(inst.state.password).toEqual('');
        expect(inst.state.success).toEqual(false);
        expect(inst.state.errorMessage).toEqual('');
    });

    it('set values', function () {
        expect(inst.state.username).toEqual('');
        let state = reducer(inst.state, {
            type: 'setUsername',
            payload: 'username'

        })
        expect(state.username).toEqual('username');


        expect(state.password).toEqual('');
        state = reducer(state, {
            type: 'setPassword',
            payload: 'password'

        })
        expect(state.password).toEqual('password');

        state = reducer(state, {
            type: 'loginSuccess',
            payload: ''

        })
        expect(state.success).toEqual(true);

        state = reducer(state, {
            type: 'loginFailed',
            payload: ''

        })
        expect(state.success).toEqual(false);


        expect(state.errorMessage).toEqual('');
        state = reducer(state, {
            type: 'setError',
            payload: 'error'

        })
        expect(state.errorMessage).toEqual('error');

    });
});

describe('Put some value to the form', function () {
    const inst = initializeComponent();

    it('change password input', () => {
        inst.handlePasswordInput({ target: { value: "newPassword" } });
        expect(inst.state.password).toEqual("newPassword");
    });

    it('change username input', () => {
        inst.handleUsernameInput({ target: { value: "newUsername" } })
        expect(inst.state.username).toEqual("newUsername");
    });
});

describe('Change page', function () {
    const inst = initializeComponent();
    
    it('go to register', () => {
        inst.goToRegister();
        expect(inst.props.history.location.pathname).toEqual("/register");
    });
});
