import mocklocalstorage from 'mock-local-storage';
import reducer, { userData, token } from "../src/store/User/reducer";
import middleware from "../src/store/User/middleware";
import * as actions from '../src/store/User/actions';

/**
 * Utils
 */
const create = {
  store: {
    getState: () => ({}),
    dispatch: () => { }
  },
  next: () => { },
  invoke: (action) => middleware(create.store)(create.next)(action),
};

const expectedState = {
  signupError: '',
  signupMessage: '',
  isConnected: !!(userData && token),
  isConnectedToSteam: userData ? "steam_id" in userData : false,
  loginError: '',
  loginMessage: '',
  userData: userData || '',
  usernameChanged: '',
  emailPassSent: '',
  emailSent: '',
};

/**
 * Tests
 */
describe('User Redux Store', function () {
  /**
   * Testing redux actions
   */
  it('should return the login action', function () {
    const username = "machin";
    const password = "truc";
    const data = {
      username,
      password
    };

    const expectedAction = () => ({
      type: actions.LOGIN,
      data
    });
    expect(actions.login(username, password)).to.eql(expectedAction());
  });

  it('should return the signup action', function () {
    const username = "machin";
    const password = "truc";
    const email = "email@email.fr";
    const confPassword = "truc";
    const data = {
      username,
      password,
      confPassword,
      email
    };

    const expectedAction = () => ({
      type: actions.SIGNUP,
      data
    });

    expect(actions.signUp(username, password, confPassword, email)).to.eql(expectedAction());
  });

  it('should return the disconnect action', function () {
    const expectedAction = () => ({
      type: actions.DISCONNECT,
    });

    expect(actions.disconnect()).to.eql(expectedAction());
  });

  it('should return the imported games action', function () {
    const expectedAction = () => ({
      type: actions.IMPORT_GAMES
    });

    expect(actions.importGames()).to.eql(expectedAction());
  });

  it('should return the link steam account action', function () {
    const data = { game: "games..." };
    const expectedAction = () => ({
      type: actions.LINK_STEAM_ACCOUNT,
      data
    });

    expect(actions.linkSteamAccount(data)).to.eql(expectedAction());
  });

  it('should return the update profil action', function () {
    const newUsername = "nouveau pseudo";
    const expectedAction = () => ({
      type: actions.UPDATE_PROFIL,
      newUsername
    });
    expect(actions.updateProfil(newUsername)).to.eql(expectedAction());
  });

  it("should return the update password action", function () {
    const password = "truc";
    const confPassword = "truc";

    const expectedAction = () => ({
      type: actions.UPDATE_PASSWORD,
      password,
      confPassword,
    });

    expect(actions.updatePassword(password, confPassword)).to.eql(expectedAction());
  });

  it("should return the update email action", function () {
    const email = "truc@truc.fr";
    const confEmail = "truc@truc.fr";

    const expectedAction = () => ({
      type: actions.UPDATE_EMAIL,
      email,
      confEmail,
    });

    expect(actions.updateEmail(email, confEmail)).to.eql(expectedAction());
  });

  it("should return the delete account actions", function () {
    const expectedAction = () => ({
      type: actions.DELETE_ACCOUNT,
    });

    expect(actions.deleteAccount()).to.eql(expectedAction());
  });

  /**
   * Testing reducer
   */

  it("should return the initial state of user store", function () {

    expect(reducer(undefined, {})).to.eql(expectedState);
  });

  it("should connect the user", function () {
    expect(
      reducer([], {
        type: actions.LOGIN,
        data: {
          username: "machin",
          password: "truc",
        },
        userData: { username: "machin" }
      })
    ).to.eql({
      isConnected: true,
      userData: { username: "machin" },
      isConnectedToSteam: false,
    });
  });

  /**
   * Testing Middleware
   */
  it("middleware passes dispatch and getState", function () {
    const { store } = create;
    const dispatchSpy = spy(store, 'dispatch');
    const stateSpy = spy(store, 'getState');
    store.dispatch('TEST DISPATCH');
    store.getState();

    assert.calledWith(dispatchSpy, match('TEST DISPATCH'));
    assert.called(stateSpy);
  });

  it("calls the function", function () {
    const invokeSpy = spy(create, 'invoke');
    const action = { type: 'TEST DISPATCH' };

    create.invoke(action);

    assert.calledWith(invokeSpy, match(action));
  });
});
