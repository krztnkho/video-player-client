define( function() {
	'use strict';

	var Lib = {};

	/**
	 * Creates a new object from obj. See Douglas Crockford's Javascript: The Good Parts
	 * @param  {Object} obj Object spec to use as protoype
	 * @return {Function} An object based on obj
	 */
	Lib.create = function( obj ) {
		// Create a variable F which is a Function, books code looks like this:
		// function F() {}
		// The reason this not an Object() because `new` only works on Function()'s
		var F = new Function();

		// Set F's prototype to obj
		F.prototype = obj;

		// Create a new object from F function
		return new F();
	};

	return Lib;
} );