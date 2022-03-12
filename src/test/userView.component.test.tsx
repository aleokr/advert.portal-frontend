import UserView, { reducer, initialState } from "../user/userView.component"
import renderer from 'react-test-renderer';
import React from 'react';

function initializeComponent() {
    const spy = jest.spyOn(UserView.prototype, 'componentDidMount').mockImplementation();
    const wrapper = renderer.create(
        <UserView/>
    );


    const inst = wrapper.getInstance();
    inst.state = initialState;
    return inst;
}

describe('UserView component reducer function', function () {
    const inst = initializeComponent();

    it('initial state', function () {
        expect(inst.state.id).toEqual(0);
        expect(inst.state.name).toEqual('');
        expect(inst.state.surname).toEqual('');
        expect(inst.state.email).toEqual('');
        expect(inst.state.login).toEqual('');
        expect(inst.state.password).toEqual('');
        expect(inst.state.confirmPassword).toEqual('');
        expect(inst.state.advertsCount).toEqual(0);
        expect(inst.state.responsesCount).toEqual(0);
        expect(inst.state.applicationsCount).toEqual(0);
        expect(inst.state.ownData).toEqual(false);
        expect(inst.state.editMode).toEqual(false);
        expect(inst.state.tags).toEqual([]);
        expect(inst.state.tagsToSubscribe).toEqual([]);
        expect(inst.state.selectedIds).toEqual([]);
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

        expect(inst.state.surname).toEqual('');
        state = reducer(inst.state, {
            type: 'setSurname',
            payload: 'surname'

        })
        expect(state.surname).toEqual('surname');

        expect(inst.state.email).toEqual('');
        state = reducer(inst.state, {
            type: 'setEmail',
            payload: 'email'

        })
        expect(state.email).toEqual('email');

        expect(inst.state.password).toEqual('');
        state = reducer(inst.state, {
            type: 'setPassword',
            payload: 'password'

        })
        expect(state.password).toEqual('password');

        expect(inst.state.confirmPassword).toEqual('');
        state = reducer(inst.state, {
            type: 'setConfirmPassword',
            payload: 'confirmPassword'

        })
        expect(state.confirmPassword).toEqual('confirmPassword');

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

describe('UserView component form input values', function () {

    const inst = initializeComponent();

    it('handleNameInput test', function () {
        expect(inst.state.name).toEqual('');
        inst.handleNameInput(({ target: { value: "newName" } }));
        expect(inst.state.name).toEqual('newName');
    });

    it('handleSurnameInput test', function () {
        expect(inst.state.surname).toEqual('');
        inst.handleSurnameInput(({ target: { value: "newSurname" } }));
        expect(inst.state.surname).toEqual('newSurname');
    });

    it('handleEmailInput test', function () {
        expect(inst.state.email).toEqual('');
        inst.handleEmailInput(({ target: { value: "newEmail" } }));
        expect(inst.state.email).toEqual('newEmail');
    });

    it('handlePasswordInput test', function () {
        expect(inst.state.password).toEqual('');
        inst.handlePasswordInput(({ target: { value: "newPassword" } }));
        expect(inst.state.password).toEqual('newPassword');
    });

    it('handleConfirmPasswordInput test', function () {
        expect(inst.state.confirmPassword).toEqual('');
        inst.handleConfirmPasswordInput(({ target: { value: "newConfirmPassword" } }));
        expect(inst.state.confirmPassword).toEqual('newConfirmPassword');
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