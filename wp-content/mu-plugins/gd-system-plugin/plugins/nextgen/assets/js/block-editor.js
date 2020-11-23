/* global nextgenBlockEditorDefaults, jQuery */

import domReady from '@wordpress/dom-ready';

// Temporary hack to move feedback button before preview
domReady( () => {
	const button = document.querySelector( '.edit-post-header__settings .feedback-modal-button' );
	if ( ! button ) {
		return;	
	}
	button.remove();

	document.getElementsByClassName( 'edit-post-header__settings' )[ 0 ].appendChild( button );
} );

( function( $ ) {
	let wpUserData;
	try {
		wpUserData = JSON.parse( window.localStorage.getItem( 'WP_DATA_USER_' + nextgenBlockEditorDefaults.userId ) );
	} catch ( err ) {
		wpUserData = false;
	}

	jQuery( function() {
		if ( ! wpUserData && ! wp.data.select( 'core/edit-post' ).isFeatureActive( 'fixedToolbar' ) ) {
			wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fixedToolbar' );
		}
		// Hide Yoast SEO metabox
		if ( wp.data.select( 'core/edit-post' ).isEditorPanelEnabled( 'meta-box-wpseo_meta' ) ) {
			wp.data.dispatch( 'core/edit-post' ).toggleEditorPanelEnabled( 'meta-box-wpseo_meta' );
		}
	} );

	$( window ).load( function() {
		if ( '0' === nextgenBlockEditorDefaults.closeReferer ) {
			return;
		}

		// Gutenberg
		let $target = $( '.edit-post-header' );

		if ( ! $target.length ) {
			// No Gutenberg
			$target = $( '.edit-post-header__toolbar' );
		}

		if ( ! $target.length ) {
			return;
		}

		// Gutenberg
		$target.find( '.edit-post-fullscreen-mode-close' )
			.attr( 'href', nextgenBlockEditorDefaults.closeReferer )
			.attr( 'aria-label', nextgenBlockEditorDefaults.closeLabel );

		// No Gutenberg
		$target.find( '.edit-post-fullscreen-mode-close__toolbar a' )
			.attr( 'href', nextgenBlockEditorDefaults.closeReferer )
			.attr( 'aria-label', nextgenBlockEditorDefaults.closeLabel );

		const observer = new MutationObserver( function( mutationsList ) {
			mutationsList.forEach( function( mutation ) {
				if ( mutation.type === 'childList' && typeof mutation.addedNodes[ 0 ] !== 'undefined' && ( $( mutation.addedNodes[ 0 ] ).hasClass( 'edit-post-fullscreen-mode-close' ) || $( mutation.addedNodes[ 0 ] ).hasClass( 'edit-post-fullscreen-mode-close__toolbar' ) ) ) {
					// Gutenberg
					$( mutation.addedNodes[ 0 ] )
						.attr( 'href', nextgenBlockEditorDefaults.closeReferer )
						.attr( 'aria-label', nextgenBlockEditorDefaults.closeLabel );

					// No Gutenberg
					$( mutation.addedNodes[ 0 ] )
						.find( 'a' )
						.attr( 'href', nextgenBlockEditorDefaults.closeReferer )
						.attr( 'aria-label', nextgenBlockEditorDefaults.closeLabel );
				}

				if ( mutation.type === 'childList' && ( $( mutation.target ).hasClass( 'edit-post-fullscreen-mode-close' ) || $( mutation.target ).parent().hasClass( 'edit-post-fullscreen-mode-close__toolbar' ) ) && typeof mutation.addedNodes[ 0 ] !== 'undefined' && 'SPAN' === mutation.addedNodes[ 0 ].nodeName ) {
					$( '.components-tooltip .components-popover__content' ).text( nextgenBlockEditorDefaults.closeLabel );
				}
			} );
		} );

		observer.observe( $target[ 0 ], { attributes: false, childList: true, subtree: true } );
	} );
}( jQuery ) );
