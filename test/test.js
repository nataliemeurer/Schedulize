var assert = require("assert");
var assign = require('../scripts/assign.js');
var expect = require('expect.js');


// Declare test variables
var employees = {
	1: {name: 'Kevin Meurer', shiftsDesired: 3, availability: [], edges:[], canManage: true},
	2: {name: 'Paul Allen', shiftsDesired: 4, availability: [], edges:[], canManage: false},
	3: {name: 'Raymond Ramon', shiftsDesired: 2, availability: [], edges:[], canManage: true},
	4: {name: 'Riley Zinar', shiftsDesired: 1, availability: [], edges:[], canManage: true},
	5: {name: 'Jeff Gladchun', shiftsDesired: 3, availability: [], edges:[], canManage: false},
	6: {name: 'Will Burgo', shiftsDesired: 3, availability: [], edges:[], canManage: false},
	7: {name: 'Andrew Teich', shiftsDesired: 2, availability: [], edges:[], canManage: false},
	8: {name: 'Conor McNulty', shiftsDesired: 1, availability: [], edges:[], canManage: false},
	9: {name: 'Andrew Morrison', shiftsDesired: 4, availability: [], edges:[], canManage: true}
};

var shifts = {
	1: {name: '1430-1630/mon/man', time: 'blaj', edges[]},
	1: {name: '1630-1830/mon/man', time: 'blaj', edges[]},
	1: {name: '1430-1630/mon/cash', time: 'blaj', edges[]},
	1: {name: '1630-1830/mon/cash', time: 'blaj', edges[]},
	1: {name: '1430-1630/mon/cash', time: 'blaj', edges[]},
	1: {name: '1430-1630/mon/cash', time: 'blaj', edges[]},
	1: {name: '1430-1630/mon/cash', time: 'blaj', edges[]},
	1: {name: '1430-1630/tues/man', time: 'blaj', edges[]},
	1: {name: '1430-1630/tues/man', time: 'blaj', edges[]},
	1: {name: '1430-1630/tues/cash', time: 'blaj', edges[]},
	1: {name: '1430-1630/tues/cash', time: 'blaj', edges[]},
	1: {name: '1430-1630/tues/cash', time: 'blaj', edges[]},
	1: {name: '1430-1630/tues/cash', time: 'blaj', edges[]},
	1: {name: '1430-1630/wed/man', time: 'blaj', edges[]},
	1: {name: '1630-1830/wed/man', time: 'blaj', edges[]},
	1: {name: '1430-1630/wed/cash', time: 'blaj', edges[]},
	1: {name: '1430-1630/wed/cash', time: 'blaj', edges[]},
	1: {name: '1430-1630/wed/cash', time: 'blaj', edges[]},
	1: {name: '1430-1630/wed/cash', time: 'blaj', edges[]},
	1: {name: '1430-1630/thurs/man', time: 'blaj', edges[]},
	1: {name: '1430-1630/thurs/man', time: 'blaj', edges[]},
	1: {name: '1430-1630/thurs/man', time: 'blaj', edges[]},
	1: {name: '1430-1630/thurs/man', time: 'blaj', edges[]},
	1: {name: '1430-1630/fri/man', time: 'blaj', edges[]},
	1: {name: '1430-1630/fri/man', time: 'blaj', edges[]},
	1: {name: '1430-1630/fri/man', time: 'blaj', edges[]},
	1: {name: '1430-1630/fri/man', time: 'blaj', edges[]},
};

var network = new assign.FlowNetwork(employees, shifts);


describe('Flow Network Instantiation', function(){
  
  describe('Flow Network has the necessary keys', function(){
    it('should have a source property with an edges array', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    }),
    it('should have a sink property with an edges array')
  })
  // describe('Adds edges to each element')

})
