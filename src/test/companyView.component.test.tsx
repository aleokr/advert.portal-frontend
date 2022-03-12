import CompanyView, { reducer, initialState } from "../company/companyView.component"
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

describe('CompanyView component reducer function', function () {
    const inst = initializeComponent();

    it('initial state', function () {
        expect(inst.state.id).toEqual(0);
        expect(inst.state.name).toEqual('');
        expect(inst.state.description).toEqual('');
        expect(inst.state.logoPath).toEqual('');
        expect(inst.state.members).toEqual([]);
        expect(inst.state.ownCompany).toEqual(false);
        expect(inst.state.editMode).toEqual(false);
        expect(inst.state.attachment).toEqual(new FormData());
        expect(inst.state.attachmentName).toEqual('');
        expect(inst.state.image).toEqual(new FormData());
        expect(inst.state.imageName).toEqual('');
        expect(inst.state.imagePath).toEqual('');
        expect(inst.state.mainFilePath).toEqual('');
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

        expect(state.editMode).toEqual(false);
        state = reducer(state, {
            type: 'setEditMode',
            payload: true

        })
        expect(state.editMode).toEqual(true);

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

describe('CompanyView component form input values', function () {

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

    it('editMode test', function () {
        expect(inst.state.editMode).toEqual(false);
        inst.editMode();
        expect(inst.state.editMode).toEqual(true);
    });

    it('addAttachment test', function () {
        expect(inst.state.attachmentName).toEqual('');
        inst.addAttachment(({ target: { files: [{name : "attachmentName"}] } }));
        expect(inst.state.attachmentName).toEqual("attachmentName");
    });

    it('addImage test', function () {
        expect(inst.state.imageName).toEqual('');
        inst.addImage(({ target: { files: [{name : "imageName"}] } }));
        expect(inst.state.imageName).toEqual("imageName");
    });
});