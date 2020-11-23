/**
 * External dependencies
 */
import { sortBy } from 'lodash';
import { ContentIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { Fragment, Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { Icon } from '@wordpress/components';

/**
 * Local dependencies
 */
import PostTypePanel from './post-type-panel';

class NextGenSiteContent extends Component {
	loadPostIntoEditor = ( postType, postId ) => {
		// Disable the post publish button
		this.props.lockPostSaving();

		const postObject = this.props.getEntityRecord( 'postType', postType, postId );
		this.props.setupEditor( postObject, {} );

		// Re-enable the post publish button
		this.props.unlockPostSaving();
	}

	render() {
		return (
			<Fragment>

				<PluginSidebar
					name="nextgen-site-content"
					title={ __( 'Site contents', 'nextgen' ) }>

					{ this.props.postTypes.map( ( postType ) => (
						<PostTypePanel
							key={ postType.slug }
							postType={ postType }
							loadPostIntoEditor={ this.loadPostIntoEditor } />
					) ) }
				</PluginSidebar>

			</Fragment>
		);
	}
}

registerPlugin( 'nextgen-site-content', {
	icon: <Icon icon={ icon } />,
	render: compose( [

		withSelect( ( select ) => {
			const {
				getCurrentPostId,
			} = select( 'core/editor' );

			const {
				getEntityRecord,
				getEntityRecords,
				getPostTypes,
			} = select( 'core' );

			const thePostTypes = ( getPostTypes() || [] )
				.filter( ( postType ) =>
					postType.viewable === true &&
					[ 'post', 'page' ].includes( postType.slug )
				);

			return {
				currentPostId: getCurrentPostId(),
				getEntityRecord,
				getEntityRecords,
				postTypes: sortBy( thePostTypes, [ 'name' ] ),
			};
		} ),

		withDispatch( ( dispatch ) => {
			const {
				lockPostSaving,
				setupEditor,
				unlockPostSaving,
			} = dispatch( 'core/editor' );

			return {
				lockPostSaving,
				setupEditor,
				unlockPostSaving,
			};
		} ),

	] )( NextGenSiteContent ),
} );
