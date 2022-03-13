import { reducer, initialState } from "../advert/advertList.component";
import renderer from 'react-test-renderer';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';
import React from 'react';
import AdvertListView from "../advert/advertList.component";

const history = createMemoryHistory();
const path = `/route/:id`;

function initializeComponent() {
    jest.spyOn(AdvertListView.prototype, 'componentDidMount').mockImplementation();
    jest.spyOn(AdvertListView.prototype, 'loadCompanyAdverts').mockImplementation();
    jest.spyOn(AdvertListView.prototype, 'loadIndividualAdverts').mockImplementation();

    const wrapper = renderer.create(
        <AdvertListView history={history}
            location={location}
            match={match} />
    );
    const inst = wrapper.getInstance();
    inst.state = initialState;
    return inst;
}
const location = createLocation(path.replace(':id', '1'));

describe('AdvertList component reducer function', function () {
    const inst = initializeComponent();

    it('initial state', function () {
        expect(inst.state.companyAdverts).toEqual([]);
        expect(inst.state.individualAdverts).toEqual([]);
        expect(inst.state.companyPageNumber).toEqual(0);
        expect(inst.state.companyPagesCount).toEqual(0);
        expect(inst.state.individualPageNumber).toEqual(0);
        expect(inst.state.individualPagesCount).toEqual(0);
        expect(inst.state.categories).toEqual([]);
        expect(inst.state.companies).toEqual([]);
        expect(inst.state.similarFiles).toEqual(false);
        expect(inst.state.searchText).toEqual('');
        expect(inst.state.success).toEqual(false);
        expect(inst.state.errorMessage).toEqual('');
    });

    it('set values', function () {
        expect(inst.state.individualPageNumber).toEqual(0);
        let state = reducer(inst.state, {
            type: 'setIndividaulPageNumber',
            payload: 1

        })
        expect(state.individualPageNumber).toEqual(1);

        expect(state.companyPageNumber).toEqual(0);
        state = reducer(state, {
            type: 'setCompanyPageNumber',
            payload: 1

        })
        expect(state.companyPageNumber).toEqual(1);

        state = reducer(state, {
            type: 'registerSuccess',
            payload: ''

        })
        expect(state.success).toEqual(true);

        state = reducer(state, {
            type: 'registerFailed',
            payload: ''

        })
        expect(state.success).toEqual(false);


        expect(state.errorMessage).toEqual('');
        state = reducer(state, {
            type: 'setError',
            payload: 'error'

        })
        expect(state.errorMessage).toEqual('error');

        expect(state.searchText).toEqual('');
        state = reducer(state, {
            type: 'setSearchText',
            payload: 'searchText'

        })
        expect(state.searchText).toEqual('searchText');

    });
});

describe('AdvertList put some value to the form', function () {
    const inst = initializeComponent();

    it('handleCompanyPageChange test', () => {
        expect(inst.state.companyPageNumber).toEqual(0);
        inst.handleCompanyPageChange({ selected: 3 });
        expect(inst.state.companyPageNumber).toEqual(3);
    });

    it('handleIndividualPageChange test', () => {
        expect(inst.state.individualPageNumber).toEqual(0);
        inst.handleIndividualPageChange({ selected: 3 });
        expect(inst.state.individualPageNumber).toEqual(3);
    });

    it('handleChangeSimiliarFiles test', () => {
        expect(inst.state.similarFiles).toEqual(false);
        inst.handleChangeSimiliarFiles();
        expect(inst.state.similarFiles).toEqual(true);
    });

    it('handleChangeSearchText test', () => {
        expect(inst.state.searchText).toEqual('');
        inst.handleChangeSearchText({ target: { value: "someText" } });
        expect(inst.state.searchText).toEqual("someText");
    });
});

describe('AdvertList change page', function () {
    const inst = initializeComponent();

    it('go to details', () => {
        inst.details(1);
        expect(inst.props.history.location.pathname).toEqual("/details/1");
    });
});
