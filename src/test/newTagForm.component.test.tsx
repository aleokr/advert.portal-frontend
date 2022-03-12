import { reducer, initialState } from "../tag/newTagForm.component";
import renderer from 'react-test-renderer';
import React from 'react';
import NewTagForm from '../tag/newTagForm.component';

function initializeComponent() {
    const wrapper = renderer.create(
        <NewTagForm/>
    );


    const inst = wrapper.getInstance();
    inst.state = initialState;
    return inst;
}

describe('NewTagForm component reducer function', function () {
    const inst = initializeComponent();

    it('initial state', function () {
        expect(inst.state.name).toEqual('');
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

        expect(state.success).toEqual(false);
        state = reducer(state, {
            type: 'setSuccess',
            payload: ''
        })
        expect(state.success).toEqual(true);

        state = reducer(state, {
            type: 'setFailed',
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

describe('NewTagForm component form input values', function () {
    const inst = initializeComponent();

    it('handleNameInput test', function () {
        expect(inst.state.name).toEqual('');
        inst.handleNameInput(({ target: { value: "newTag" } }));
        expect(inst.state.name).toEqual('newTag');
    });
});