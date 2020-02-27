import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { Login } from "src/components/Login";
import { shallow, mount } from "enzyme";
import * as Redux from 'react-redux';
import sinon from 'sinon';
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router, Link } from 'react-router-dom';

const mockStore = configureMockStore();
let store = mockStore({ user: { usernameValue: '', passValue: '', loginError: '' } });
const setState = (value, key) => {
  store = mockStore({ ...store.getState(), [key]: value });
};

describe('Login component', function() {

  beforeEach(function() {
    const rootRendering = document.querySelector('#root');
    ReactDOM.render(Login, rootRendering);
  });

  it("renders <Login /> without crashing", function() {
    const wrapper = shallow(
      <Redux.Provider store={store}>
        <Login visible />
      </Redux.Provider>
    );

    expect(wrapper).to.have.lengthOf(1);
  });

  it("renders correct username & password inputs", function() {
    const wrapper = mount(
      <Redux.Provider store={store}>
        <Router>
          <Login visible />
        </Router>
      </Redux.Provider>
    );
    console.log("test wrapper", wrapper.find("input").length);
    expect(wrapper.find("input").length).to.eql(2);
  });
});
