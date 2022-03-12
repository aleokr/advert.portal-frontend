import CompanyView, { reducer, initialState } from "../userPanel/userPanelCompany.component"
import renderer from 'react-test-renderer';
import React from 'react';

function initializeComponent() {
    const spy = jest.spyOn(CompanyView.prototype, 'componentDidMount').mockImplementation();
    const wrapper = renderer.create(
        <CompanyView/>
    );


    const inst = wrapper.getInstance();
    inst.state = initialState;
    return inst;
}

describe('UserPanelCompany component reducer function', function () {
    const inst = initializeComponent();

    it('initial state', function () {
        expect(inst.state.id).toEqual(0);
        expect(inst.state.name).toEqual('');
        expect(inst.state.description).toEqual('');
        expect(inst.state.logoPath).toEqual('');
        expect(inst.state.members).toEqual([]);
        expect(inst.state.membersPage).toEqual(0);
        expect(inst.state.requestToJoin).toEqual([]);
        expect(inst.state.requestsPage).toEqual(0);
        expect(inst.state.success).toEqual(false);
        expect(inst.state.errorMessage).toEqual('');
    });

    it('set values', function () {

        expect(inst.state.errorMessage).toEqual('');
        let state = reducer(inst.state, {
            type: 'setError',
            payload: 'newError'

        })
        expect(state.errorMessage).toEqual('newError');

    });

});
