/* global nextgenPublishGuideDefaults, jQuery */

export default ( function( $ ) {
	const wpUserData = JSON.parse( window.localStorage.getItem( 'WP_DATA_USER_' + nextgenPublishGuideDefaults.userId ) );

	$( function() {
		// Hide welcome guide by default
		if ( ! wpUserData && wp.data.select( 'core/edit-post' ).isFeatureActive( 'welcomeGuide' ) ) {
			wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'welcomeGuide' );
		}
	} );
}( jQuery ) );
