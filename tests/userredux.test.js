import { expect } from 'chai';
import * as actions from 'src/store/User/actions';
import {
  mount, render, shallow, configure
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mocklocalstorage from 'mock-local-storage';
import { spyOn } from 'jasmine';
import reducer, { userData, token } from "src/store/User/reducer";

/**
 * Jsdom
 */
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

/**
 * Configuration
 */
configure({ adapter: new Adapter() });
global.expect = expect;
global.mount = mount;
global.render = render;
global.shallow = shallow;

describe('User Redux Store', function() {

  /**
   * Testing redux actions
   */
  it('should return the login action', function() {
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

  it('should return the signup action', function() {
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

  it('should return the disconnect action', function() {
    const expectedAction = () => ({
      type: actions.DISCONNECT,
    });

    expect(actions.disconnect()).to.eql(expectedAction());
  });

  it('should return the imported games action', function() {
    const expectedAction = () => ({
      type: actions.IMPORT_GAMES
    });

    expect(actions.importGames()).to.eql(expectedAction());
  });

  it('should return the link steam account action', function() {
    const data = { game: "games..." };
    const expectedAction = () => ({
      type: actions.LINK_STEAM_ACCOUNT,
      data
    });

    expect(actions.linkSteamAccount(data)).to.eql(expectedAction());
  });

  it('should return the update profil action', function() {
    const newUsername = "nouveau pseudo";
    const expectedAction = () => ({
      type: actions.UPDATE_PROFIL,
      newUsername
    });
    expect(actions.updateProfil(newUsername)).to.eql(expectedAction());
  });

  it("should return the update password action", function() {
    const password = "truc";
    const confPassword = "truc";

    const expectedAction = () => ({
      type: actions.UPDATE_PASSWORD,
      password,
      confPassword,
    });

    expect(actions.updatePassword(password, confPassword)).to.eql(expectedAction());
  });

  it("should return the update email action", function() {
    const email = "truc@truc.fr";
    const confEmail = "truc@truc.fr";

    const expectedAction = () => ({
      type: actions.UPDATE_EMAIL,
      email,
      confEmail,
    });

    expect(actions.updateEmail(email, confEmail)).to.eql(expectedAction());
  });

  it("should return the delete account actions", function() {
    const expectedAction = () => ({
      type: actions.DELETE_ACCOUNT,
    });

    expect(actions.deleteAccount()).to.eql(expectedAction());
  });

  /**
   * Testing reducer
   */

  it("should return the initial state of user store", function() {
    const expectedState = {
      signupError: '',
      signupMessage: '',
      isConnected: !!(userData && token),
      isConnectedToSteam: userData ? userData.hasOwnProperty("steam_id") : false,
      loginError: '',
      loginMessage: '',
      userData: userData || '',
      usernameChanged: '',
      emailPassSent: '',
      emailSent: '',
    };

    expect(reducer(undefined, {})).to.eql(expectedState);
  });
});
