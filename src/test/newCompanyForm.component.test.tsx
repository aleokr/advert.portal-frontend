import NewCompanyForm, { reducer, initialState } from "../company/newCompanyForm.component"
import renderer from 'react-test-renderer';
import React from 'react';

function initializeComponent() {
    const wrapper = renderer.create(
        <NewCompanyForm />
    );


    const inst = wrapper.getInstance();
    inst.state = initialState;
    return inst;
}

describe('NewCompanyForm component reducer function', function () {
    const inst = initializeComponent();

    it('initial state', function () {
        expect(inst.state.name).toEqual('');
        expect(inst.state.description).toEqual('');
        expect(inst.state.success).toEqual(false);
        expect(inst.state.errorMessage).toEqual('');
    });

    it('set values', function () {

        expect(inst.state.name).toEqual('');
        let state = reducer(inst.state, {
            type: 'setName',
            payload: 'name'

        })
        expect(state.name).toEqual('name');

        expect(inst.state.description).toEqual('');
        state = reducer(inst.state, {
            type: 'setDescription',
            payload: 'description'

        })
        expect(state.description).toEqual('description');

        expect(state.success).toEqual(false);
        state = reducer(state, {
            type: 'addCompanySuccess',
            payload: ''
        })
        expect(state.success).toEqual(true);

        state = reducer(state, {
            type: 'addCompanyFailed',
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

describe('NewCompanyForm component form input values', function () {

    const inst = initializeComponent();

    it('handleNameInput test', function () {
        expect(inst.state.name).toEqual('');
        inst.handleNameInput(({ target: { value: "newName" } }));
        expect(inst.state.name).toEqual('newName');
    });

    it('handleDescriptionInput test', function () {
        expect(inst.state.description).toEqual('');
        inst.handleDescriptionInput(({ target: { value: "newDescription" } }));
        expect(inst.state.description).toEqual('newDescription');
    });
});