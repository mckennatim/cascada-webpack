var React = require('react');
var Main = require('../components/Main');
var Home = require('../components/Home');
var Yard = require('../components/Yard');
var But = require('../components/But');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="app" path="/" handler={Main}>
  	<Route name="yard" path="/yard" handler={Yard}></Route>
  	<Route name="home" path="/home" handler={Home}></Route>
  	<Route name="but" path="/but" handler={But}></Route>
  	<DefaultRoute handler={Yard} />
  </Route>
);