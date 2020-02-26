// import React from 'react';
import { expect } from 'chai';
// import { mount, render, shallow, configure } from 'enzyme';
import * as actions from 'src/store/User/actions';

describe('User Redux Store', function () {
  it('should return the login action', function () {
    const username = "machin";
    const password = "truc";
    const data = {
      username,
      password
    };

    const expectedAction = {
      type: actions.LOGIN,
      data
    };
    expect(actions.login(username, password)).to.eql(expectedAction);
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

    const expectedAction = {
      type: actions.SIGNUP,
      data
    };

    expect(actions.signUp(username, password, confPassword, email)).to.eql(expectedAction);
  });

  it('should return the disconnect action', function () {
    const expectedAction = {
      type: actions.DISCONNECT,
    };

    expect(actions.disconnect()).to.eql(expectedAction);
  });

  it('should return the imported games action', function () {
    const expectedAction = {
      type: actions.IMPORT_GAMES
    };

    expect(actions.importGames()).to.eql(expectedAction);
  });

  it('should return the link steam account action', function () {
    const data = { game: "games..." };
    const expectedAction = {
      type: actions.LINK_STEAM_ACCOUNT,
      data
    };

    expect(actions.linkSteamAccount(data)).to.eql(expectedAction);
  });

  it('should return the update profil action', function() {
    const newUsername = "nouveau pseudo";
    const expectedAction = {
      type: actions.UPDATE_PROFIL,
      newUsername
    };
    expect(actions.updateProfil(newUsername)).to.eql(expectedAction);
  });
});
