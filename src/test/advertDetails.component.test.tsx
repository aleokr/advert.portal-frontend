import AdvertDetails, { reducer, initialState } from "../advert/advertDetails.component"
import renderer from 'react-test-renderer';
import React from 'react';
import { match } from 'react-router';
import { createMemoryHistory, createLocation } from 'history';


const history = createMemoryHistory();
const path = `/route/:id`;

function initializeComponent() {
    jest.spyOn(AdvertDetails.prototype, 'componentDidMount').mockImplementation();

    const wrapper = renderer.create(
        <AdvertDetails history={history}
            location={location}
            match={match} />
    );
    const inst = wrapper.getInstance();
    inst.state = initialState;
    return inst;
}
const location = createLocation(path.replace(':id', '1'));

describe('AdvertDetails component reducer function', function () {
    const inst = initializeComponent();

    it('initial state', function () {
        expect(inst.state.advertId).toEqual(0);
        expect(inst.state.advertTitle).toEqual('');
        expect(inst.state.advertDescription).toEqual('');
        expect(inst.state.advertShortDescription).toEqual('');
        expect(inst.state.advertCreatedAt).toEqual('');
        expect(inst.state.advertType).toEqual('');
        expect(inst.state.advertCategory).toEqual('');
        expect(inst.state.ownerName).toEqual('');
        expect(inst.state.ownerId).toEqual(0);
        expect(inst.state.canApplicate).toEqual(false);
        expect(inst.state.applicationExists).toEqual(true);
        expect(inst.state.canEdit).toEqual(false);
        expect(inst.state.editMode).toEqual(false);
        expect(inst.state.archived).toEqual(false);
        expect(inst.state.tags).toEqual([]);
        expect(inst.state.mainFilePath).toEqual('');
        expect(inst.state.success).toEqual(false);
        expect(inst.state.errorMessage).toEqual('');
    });

    it('set values', function () {

        expect(inst.state.advertTitle).toEqual('');
        let state = reducer(inst.state, {
            type: 'setTitle',
            payload: 'title'

        })
        expect(state.advertTitle).toEqual('title');

        expect(state.advertShortDescription).toEqual('');
        state = reducer(inst.state, {
            type: 'setShortDescription',
            payload: 'shortDescription'

        })
        expect(state.advertShortDescription).toEqual('shortDescription');

        expect(state.advertDescription).toEqual('');
        state = reducer(inst.state, {
            type: 'setLongDescription',
            payload: 'description'

        })
        expect(state.advertDescription).toEqual('description');

        expect(state.editMode).toEqual(false);
        state = reducer(state, {
            type: 'setEditMode',
            payload: true

        })
        expect(state.editMode).toEqual(true);

        expect(state.canApplicate).toEqual(false);
        state = reducer(state, {
            type: 'setCanApplicate',
            payload: true

        })
        expect(state.canApplicate).toEqual(true);

        expect(state.applicationExists).toEqual(true);
        state = reducer(state, {
            type: 'setApplicationExists',
            payload: false

        })
        expect(state.applicationExists).toEqual(false);

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

describe('AdvertDetails component form input values', function () {

    const inst = initializeComponent();

    it('handleTitleInput test', function () {
        expect(inst.state.advertTitle).toEqual('');
        inst.handleTitleInput(({ target: { value: "newTitle" } }));
        expect(inst.state.advertTitle).toEqual('newTitle');
    });

    it('handleShortDescriptionInput test', function () {
        expect(inst.state.advertShortDescription).toEqual('');
        inst.handleShortDescriptionInput(({ target: { value: "newShortDescription" } }));
        expect(inst.state.advertShortDescription).toEqual('newShortDescription');
    });

    it('handleLongDescriptionInput test', function () {
        expect(inst.state.advertDescription).toEqual('');
        inst.handleLongDescriptionInput(({ target: { value: "newLongDescription" } }));
        expect(inst.state.advertDescription).toEqual('newLongDescription');
    });

    it('editMode test', function () {
        expect(inst.state.editMode).toEqual(false);
        inst.editMode();
        expect(inst.state.editMode).toEqual(true);
    });

});

describe('AdvertDetails change page', function () {
    const inst = initializeComponent();

    it('go to individual owner details', () => {
        inst.state.advertType = 'INDIVIDUAL';
        inst.ownerDetails();
        expect(inst.props.history.location.pathname).toEqual("/user/0");
    });

    it('go to individual owner details', () => {
        inst.state.advertType = 'COMPANY';
        inst.ownerDetails();
        expect(inst.props.history.location.pathname).toEqual("/company/0");
    });


    it('go to individual owner details', () => {
        localStorage.setItem('access_token', '');
        inst.ownerDetails();
        expect(inst.props.history.location.pathname).toEqual("/login");
    });
});