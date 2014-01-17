define( function( require ) {
	'use strict';

	var obj = require( 'lib' );

	/**
	 * Core Object/Class for objects that use inheritance + contstructors
	 *
	 * To create a class that can be subclassed itself, extend the CoreObject class.
	 *
	 *     var Animal = CoreObject.extend();
	 *     var Horse = Animal.extend();
	 *
	 * The constructor can be defined through the init property of an object argument.
	 *
	 *     var Animal = CoreObject.extend({
	 *       init: function(name, sound){
	 *         this.name = name;
	 *       }
	 *     });
	 *
	 * Other methods and properties can be added the same way, or directly to the
	 * prototype.
	 *
	 *    var Animal = CoreObject.extend({
	 *       init: function(name){
	 *         this.name = name;
	 *       },
	 *       getName: function(){
	 *         return this.name;
	 *       },
	 *       sound: '...'
	 *    });
	 *
	 *    Animal.prototype.makeSound = function(){
	 *      alert(this.sound);
	 *    };
	 *
	 * To create an instance of a class, use the create method.
	 *
	 *    var fluffy = Animal.create('Fluffy');
	 *    fluffy.getName(); // -> Fluffy
	 *
	 * Methods and properties can be overridden in subclasses.
	 *
	 *     var Horse = Animal.extend({
	 *       sound: 'Neighhhhh!'
	 *     });
	 *
	 *     var horsey = Horse.create('Horsey');
	 *     horsey.getName(); // -> Horsey
	 *     horsey.makeSound(); // -> Alert: Neighhhhh!
	 *
	 * @class
	 * @constructor
	 */
	var CoreObject = function() {};


	/**
	 * Define a class that will inherit this Object
	 *
	 *	var Person = CoreObject.extend();
	 *	var Ninja = Person.extend();
	 * 
	 * @param  {Object} props Functions and properties to be applied to the new object's prototype
	 * @return {Object}       An object that inherits from CoreObject.
	 */
	CoreObject.extend = function( props ) {
		var child, init;
		// Set default value for props
		//-- Kung walay props na gi pass, e-set to {} para de mag error 
		//-- inig loop
		props = props || {};
		// Setup child constructor using the init method
		// or using the parent's init if not supplied
		// Make sure to check the unobfuscated version for external libs
		init = props[ 'init' ] || props.init || this.prototype[ 'init' ] || this.prototype.init || function() {};
		// Child's contructor
		//-- Inig create og object using .create, e-execute and iyang `init` method
		child = function() {
			init.apply( this, arguments );
		};

		// Inherit from this object's prototype
		child.prototype = obj.create( this.prototype );

		// Reset the child's contructor otherwise instance of child
		// will have the constructor of the parent object
		child.prototype.constructor = child;

		// Make the class extendable
		child.extend = CoreObject.extend;
		// Make a function creating instances
		child.create = CoreObject.create;

		// Extend child's prototype with functions and properties from props
		for ( var name in props ) {
			if ( props.hasOwnProperty( name ) ) {
				child.prototype[ name ] = props[ name ];
			}
		}

		return child;
	};

	/**
	 * Create an instance of this Object
	 * @return {CoreObject} An instance of a CoreObject subclass
	 */
	CoreObject.create = function() {
		// Create an object that inherits from object's prototype
		var inst = obj.create( this.prototype );

		// Apply this constructor function to the new object
		this.apply( inst, arguments );

		// Return the object instance
		return inst;
	};

	return CoreObject;

} );