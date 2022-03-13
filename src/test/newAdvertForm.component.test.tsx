import { reducer, initialState } from "../advert/newAdvertForm.component";
import renderer from 'react-test-renderer';
import React from 'react';
import NewAdvertForm from '../advert/newAdvertForm.component';

function initializeComponent() {
    const spy = jest.spyOn(NewAdvertForm.prototype, 'componentDidMount').mockImplementation();
    const wrapper = renderer.create(
        <NewAdvertForm />
    );
    const inst = wrapper.getInstance();
    inst.state = initialState;
    return inst;
}

describe('NewAdvertForm component reducer function', function () {

    const inst = initializeComponent();

    it('initial state', function () {
        expect(inst.state.title).toEqual('');
        expect(inst.state.shortDescription).toEqual('');
        expect(inst.state.longDescription).toEqual('');
        expect(inst.state.category).toEqual('');
        expect(inst.state.categories).toEqual([]);
        expect(inst.state.tags).toEqual([]);
        expect(inst.state.attachment).toEqual(new FormData());
        expect(inst.state.fileName).toEqual('');
        expect(inst.state.selectTagIds).toEqual([]);
        expect(inst.state.success).toEqual(false);
        expect(inst.state.errorMessage).toEqual('');
    });

    it('set values', function () {

        expect(inst.state.title).toEqual('');
        let state = reducer(inst.state, {
            type: 'setTitle',
            payload: 'title'

        })
        expect(state.title).toEqual('title');

        expect(inst.state.shortDescription).toEqual('');
        state = reducer(inst.state, {
            type: 'setShortDescription',
            payload: 'shortDescription'

        })
        expect(state.shortDescription).toEqual('shortDescription');

        expect(inst.state.longDescription).toEqual('');
        state = reducer(inst.state, {
            type: 'setLongDescription',
            payload: 'longDescription'

        })
        expect(state.longDescription).toEqual('longDescription');

        expect(inst.state.category).toEqual('');
        state = reducer(inst.state, {
            type: 'setCategory',
            payload: 'OTHER'

        })
        expect(state.category).toEqual('OTHER');


        expect(state.success).toEqual(false);
        state = reducer(state, {
            type: 'addSuccess',
            payload: ''
        })
        expect(state.success).toEqual(true);

        state = reducer(state, {
            type: 'addFailed',
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

describe('NewAdvertForm component form input values', function () {
    const inst = initializeComponent();

    it('handleTitleInput test', function () {
        expect(inst.state.title).toEqual('');
        inst.handleTitleInput(({ target: { value: "title" } }));
        expect(inst.state.title).toEqual('title');
    });

    it('handleShortDescriptionInput test', function () {
        expect(inst.state.shortDescription).toEqual('');
        inst.handleShortDescriptionInput(({ target: { value: "shortDescription" } }));
        expect(inst.state.shortDescription).toEqual('shortDescription');
    });

    it('handleLongDescriptionInput test', function () {
        expect(inst.state.longDescription).toEqual('');
        inst.handleLongDescriptionInput(({ target: { value: "longDescription" } }));
        expect(inst.state.longDescription).toEqual('longDescription');
    });

    it('handleAdvertCategoryInput test', function () {
        expect(inst.state.category).toEqual('');
        inst.handleAdvertCategoryInput(({ target: { value: "OTHER" } }));
        expect(inst.state.category).toEqual('OTHER');
    });

    it('addAttachment test', function () {
        expect(inst.state.fileName).toEqual('');
        inst.addAttachment(({ target: { files: [{ name: "newName" }] } }));
        expect(inst.state.fileName).toEqual("newName");
    });
});