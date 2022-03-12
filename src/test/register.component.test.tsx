import RegisterView from '../login/register.component';
import { reducer, initialState } from "../login/register.component";
import renderer from 'react-test-renderer';
import React from 'react';
function initializeComponent() {
    const spy = jest.spyOn(RegisterView.prototype, 'componentDidMount').mockImplementation();
    const wrapper = renderer.create(
        <RegisterView />
    );


    const inst = wrapper.getInstance();
    inst.state = initialState;
    return inst;
}

describe('Register component reducer function', function () {
    const inst = initializeComponent();

    it('initial state', function () {
        expect(inst.state.name).toEqual('');
        expect(inst.state.surname).toEqual('');
        expect(inst.state.username).toEqual('');
        expect(inst.state.email).toEqual('');
        expect(inst.state.password).toEqual('');
        expect(inst.state.userType).toEqual('INDIVIDUAL_USER');
        expect(inst.state.companyUser).toEqual(false);
        expect(inst.state.companyAdmin).toEqual(false);
        expect(inst.state.companyName).toEqual('');
        expect(inst.state.companyId).toEqual('');
        expect(inst.state.companies).toEqual([]);
        expect(inst.state.userTypes).toEqual([]);
        expect(inst.state.success).toEqual(false);
        expect(inst.state.errorMessage).toEqual('');
    });

    it('set values', function () {
        const inst = initializeComponent();

        expect(inst.state.name).toEqual('');
        let state = reducer(inst.state, {
            type: 'setName',
            payload: 'name'

        })
        expect(state.name).toEqual('name');

        expect(state.surname).toEqual('');
        state = reducer(state, {
            type: 'setSurname',
            payload: 'surname'

        })
        expect(state.surname).toEqual('surname');

        expect(state.username).toEqual('');
        state = reducer(state, {
            type: 'setUsername',
            payload: 'username'

        })
        expect(state.username).toEqual('username');

        expect(state.email).toEqual('');
        state = reducer(state, {
            type: 'setEmail',
            payload: 'email'

        })
        expect(state.email).toEqual('email');

        expect(state.password).toEqual('');
        state = reducer(state, {
            type: 'setPassword',
            payload: 'password'

        })
        expect(state.password).toEqual('password');

        expect(state.userType).toEqual('INDIVIDUAL_USER');
        state = reducer(state, {
            type: 'setUserType',
            payload: 'COMPANY_ADMIN'

        })
        expect(state.userType).toEqual('COMPANY_ADMIN');

        expect(state.companyName).toEqual('');
        state = reducer(state, {
            type: 'setCompanyName',
            payload: 'companyName'

        })
        expect(state.companyName).toEqual('companyName');

        expect(state.companyId).toEqual('');
        state = reducer(state, {
            type: 'setCompanyId',
            payload: '1'

        })
        expect(state.companyId).toEqual('1');

        expect(state.success).toEqual(false);
        state = reducer(state, {
            type: 'registerSuccess',
            payload: ''
        })
        expect(state.success).toEqual(true);

        state = reducer(state, {
            type: 'registerFailed',
            payload: 'error'

        })
        expect(state.success).toEqual(false);
        expect(state.errorMessage).toEqual('error');

        state = reducer(state, {
            type: 'setError',
            payload: 'newError'

        })
        expect(state.errorMessage).toEqual('newError');

    });
});

describe('Register component form input values', function () {
    const inst = initializeComponent();

    it('handleUserTypeInput test', function () {
        expect(inst.state.userType).toEqual('INDIVIDUAL_USER');
        inst.handleUserTypeInput(({ target: { value: "COMPANY_ADMIN" } }));
        expect(inst.state.userType).toEqual('COMPANY_ADMIN');
    });

    it('handleNameInput test', function () {
        expect(inst.state.name).toEqual('');
        inst.handleNameInput(({ target: { value: "John" } }));
        expect(inst.state.name).toEqual('John');
    });

    it('handleSurnameInput test', function () {
        expect(inst.state.surname).toEqual('');
        inst.handleSurnameInput(({ target: { value: "Smith" } }));
        expect(inst.state.surname).toEqual('Smith');
    });

    it('handleUsernameInput test', function () {
        expect(inst.state.username).toEqual('');
        inst.handleUsernameInput(({ target: { value: "john123" } }));
        expect(inst.state.username).toEqual('john123');
    });

    it('handleEmailInput test', function () {
        expect(inst.state.email).toEqual('');
        inst.handleEmailInput(({ target: { value: "john@123" } }));
        expect(inst.state.email).toEqual('john@123');
    });

    it('handlePasswordInput test', function () {
        expect(inst.state.password).toEqual('');
        inst.handlePasswordInput(({ target: { value: "password123" } }));
        expect(inst.state.password).toEqual('password123');
    });

    it('handleCompanyIdInput test', function () {
        expect(inst.state.companyId).toEqual('');
        inst.handleCompanyIdInput(({ target: { value: "1" } }));
        expect(inst.state.companyId).toEqual('1');
    });

});