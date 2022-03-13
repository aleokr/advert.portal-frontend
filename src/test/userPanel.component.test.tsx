import UserPanel, { reducer, initialState } from "../userPanel/userPanel.component"
import renderer from 'react-test-renderer';
import React from 'react';
import { match } from 'react-router';
import { createMemoryHistory, createLocation } from 'history';


const history = createMemoryHistory();
const path = `/route/:id`;

function initializeComponent() {
    jest.spyOn(UserPanel.prototype, 'componentDidMount').mockImplementation();
    jest.spyOn(UserPanel.prototype, 'loadUserAdverts').mockImplementation();
    jest.spyOn(UserPanel.prototype, 'loadUserAppliactions').mockImplementation();
    jest.spyOn(UserPanel.prototype, 'loadUserResponses').mockImplementation();

    const wrapper = renderer.create(
        <UserPanel history={history}
            location={location}
            match={match} />
    );
    const inst = wrapper.getInstance();
    inst.state = initialState;
    return inst;
}
const location = createLocation(path.replace(':id', '1'));

describe('UserPanel component reducer function', function () {
    const inst = initializeComponent();

    it('initial state', function () {
        expect(inst.state.companyAdmin).toEqual(true);
        expect(inst.state.userAdvertsPage).toEqual(0);
        expect(inst.state.userApplicationsPage).toEqual(0);
        expect(inst.state.userResponsesPage).toEqual(0);
        expect(inst.state.userAdvertsPagesCount).toEqual(0);
        expect(inst.state.userApplicationsPagesCount).toEqual(0);
        expect(inst.state.userResponsesPagesCount).toEqual(0);
        expect(inst.state.userAdverts).toEqual([]);
        expect(inst.state.userApplications).toEqual([]);
        expect(inst.state.userResponses).toEqual([]);
        expect(inst.state.tabIndex).toEqual(1);
        expect(inst.state.success).toEqual(false);
        expect(inst.state.errorMessage).toEqual('');
    });

    it('set values', function () {

        expect(inst.state.userAdvertsPage).toEqual(0);
        let state = reducer(inst.state, {
            type: 'setUserAdvertsPage',
            payload: 2
        })
        expect(state.userAdvertsPage).toEqual(2);

        expect(state.userApplicationsPage).toEqual(0);
        state = reducer(inst.state, {
            type: 'setUserApplicationsPage',
            payload: 2
        })
        expect(state.userApplicationsPage).toEqual(2);

        expect(state.userResponsesPage).toEqual(0);
        state = reducer(inst.state, {
            type: 'setUserResponsesPage',
            payload: 2

        })
        expect(state.userResponsesPage).toEqual(2);

        expect(state.success).toEqual(false);
        state = reducer(state, {
            type: 'setSuccess',
            payload: true
        })
        expect(state.success).toEqual(true);

        expect(state.errorMessage).toEqual('');

        state = reducer(state, {
            type: 'setError',
            payload: 'newError'

        })
        expect(state.errorMessage).toEqual('newError');

    });
});

describe('UserPanel component form input values', function () {

    const inst = initializeComponent();

    it('handleUserAdvertsPage test', function () {
        expect(inst.state.userAdvertsPage).toEqual(0);
        inst.handleUserAdvertsPage(({ selected: 4 }));
        expect(inst.state.userAdvertsPage).toEqual(4);
    });

    it('handleUserApplicationsPage test', function () {
        expect(inst.state.userApplicationsPage).toEqual(0);
        inst.handleUserApplicationsPage(({ selected: 4 }));
        expect(inst.state.userApplicationsPage).toEqual(4);
    });

    it('handleUserResponsesPage test', function () {
        expect(inst.state.userResponsesPage).toEqual(0);
        inst.handleUserResponsesPage(({ selected: 4 }));
        expect(inst.state.userResponsesPage).toEqual(4);
    });
});

describe('UserPanel change page', function () {
    const inst = initializeComponent();

    it('loadCompany test', () => {
        expect(inst.state.tabIndex).toEqual(1);
        inst.loadCompany();
        expect(inst.state.tabIndex).toEqual(4);
    });

    it('advertDetails test', () => {
        inst.advertDetails(3);
        expect(inst.props.history.location.pathname).toEqual("/details/3");
    });

    it('addedByDetails details - INDIVIDUAL', () => {
        inst.addedByDetails(null, 1, 'INDIVIDUAL');
        expect(inst.props.history.location.pathname).toEqual("/company/1");
    });

    it('adedByDetails details - COMPANY', () => {
        inst.addedByDetails(1, null, 'COMPANY');
        expect(inst.props.history.location.pathname).toEqual("/user/1");
    });
});