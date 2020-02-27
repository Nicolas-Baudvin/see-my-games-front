const { mount, render, shallow, configure } = require("enzyme");
const { assert, match, spy } = require("sinon");
const { expect } = require("chai");
const Adapter = require("enzyme-adapter-react-16");

configure({ adapter: new Adapter() });
global.expect = expect;
global.mount = mount;
global.render = render;
global.shallow = shallow;
global.assert = assert;
global.match = match;
global.spy = spy;
