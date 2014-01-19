( function() {
	'use strict';

	require.config( {
		'baseUrl': '../',

		'paths': {
			'spec'  : 'test/spec',
			'mocha' : 'bower_components/mocha/mocha',
			'chai'  : 'bower_components/chai/chai',
		}
	}, require(
		[ 'spec/testSuite' ],
		function( testSuite ) {
			require( testSuite.specs, function () {

				if ( window.mochaPhantomJS ) {
					mochaPhantomJS.run();
				} else {
					mocha.run();
				}

			} );
		} )
	);

} ).call( this );