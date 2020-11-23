/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Set logic to handle default editor behaviors.
 * BlockFocus: Close design or content side-panels when a block is selected.
 * DisablePublishSidebar: Handle dispatch to disable pre-publish sidebar.
 *
 */
function EditorBehaviorDefaults( ) {
	const {
		openGeneralSidebar,
		closeGeneralSidebar,
		setIsInserterOpened,
	} = useDispatch( 'core/edit-post' );

	const {
		clearSelectedBlock,
	} = useDispatch( 'core/block-editor' );

	const { disablePublishSidebar } = useDispatch( 'core/editor' );

	const {
		sidebarIsOpened,
		isInserterOpened,
		hasSelectedBlock,
		isPublishSidebarEnabled,
	} = useSelect( ( select ) => {
		return {
			sidebarIsOpened: select( 'core/interface' ).getActiveComplementaryArea( 'core/edit-post' ),
			isInserterOpened: select( 'core/edit-post' ).isInserterOpened(),
			hasSelectedBlock: select( 'core/block-editor' ).hasSelectedBlock(),
			isPublishSidebarEnabled: select( 'core/editor' ).isPublishSidebarEnabled(),
		};
	}, [] );

	// Inserter and Sidebars are mutually exclusive.
	useEffect( () => {
		if ( sidebarIsOpened ) {
			setIsInserterOpened( false );
			if ( sidebarIsOpened !== 'edit-post/block' ) {
				clearSelectedBlock();
			}
		}
	}, [ sidebarIsOpened ] );
	useEffect( () => {
		if ( isInserterOpened ) {
			closeGeneralSidebar();
		}
	}, [ isInserterOpened ] );

	// Handle disable of pre-publish sidebar
	useEffect( () => {
		if ( isPublishSidebarEnabled ) {
			disablePublishSidebar();
		}
	}, [ isPublishSidebarEnabled ] );

	// Switch to the block inspector automatically if any sidebar is already open.
	useEffect( () => {
		if ( hasSelectedBlock && sidebarIsOpened && sidebarIsOpened !== 'edit-post/block' ) {
			openGeneralSidebar( 'edit-post/block' );
		}
	}, [ hasSelectedBlock ] );

	return null;
}

registerPlugin( 'nextgen-block-editor-behavior', {
	render: EditorBehaviorDefaults,
} );
