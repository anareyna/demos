console.log('uno.js');
console.log('inside jsinside.js');
var App;

App = (function() {
  var catchDom, dom, events, functions, initialize, st, subscribeEvents;
  dom = {};
  st = {
    body: "h1"
  };
  catchDom = function() {
    return dom.body = $(st.body);
  };
  subscribeEvents = function() {
    dom.body.on("click", events.myFunction);
  };
  events = {
    myFunction: function() {
      dom.body.css('background', 'indianred');
    }
  };
  functions = {};
  initialize = function() {
    catchDom();
    return subscribeEvents();
  };
  return {
    init: initialize
  };
})();

App.init();
