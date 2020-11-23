/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import {
	Button,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

/**
 * Local dependencies
 */
import PostMenuActions from './post-menu-actions';

class PostTypePanel extends Component {
	onDelete( post ) {
		const { props } = this;

		// Delete the post.
		apiFetch( {
			path: `/wp/v2/${ props.postType.rest_base }/${ post.id }`,
			method: 'DELETE',
		} ).then( ( data ) => {
			// Remove deleted post from entities.
			const filteredEntitites = props.entities.filter( ( entity ) => entity.id !== post.id );

			// Select the first available entity if the selected entity was the deleted entity.
			if ( props.currentPostId === post.id ) {
				props.loadPostIntoEditor( props.postType.slug, filteredEntitites[ 0 ].id );
			}

			// Refresh the entity store.
			props.receiveEntityRecords( 'postType', props.postType.slug, props.entities, {}, true );

			// Display a notification.
			props.createSuccessNotice(
				sprintf(
					// translators: %s is the post title.
					__( '"%s" has been deleted.', 'nextgen' ),
					data.title.raw
				),
				{
					type: 'snackbar',
					actions: [
						{
							label: __( 'Undo', 'nextgen' ),
							onClick: () => this.onUnDelete( post ),
						},
					],
				}
			);
		} ).catch( () => {
			props.createErrorNotice( __( 'Trashing failed', 'nextgen' ) );
		} );
	}

	onUnDelete( post ) {
		const { props } = this;

		// Restore the post and trigger a save.
		props.editEntityRecord( 'postType', props.postType.slug, post.id, { status: 'draft' } );
		props.loadPostIntoEditor( props.postType.slug, post.id );
		props.savePost();

		// Refresh the entity store.
		props.receiveEntityRecords( 'postType', props.postType.slug, [ ...props.entities, post ], {}, true );
	}

	onDuplicate( post ) {
		const { props } = this;

		// Duplicate the post.
		apiFetch( {
			path: `/wp/v2/${ props.postType.rest_base }`,
			method: 'POST',
			data: {
				title: post.title.raw,
				slug: post.slug,
				content: post.content.raw,
				excerpt: post.excerpt.raw,
				status: 'draft',
			},
		} ).then( ( data ) => {
			// Add duplicated post to the entity store.
			props.receiveEntityRecords( 'postType', props.postType.slug, [ ...props.entities, data ], {}, true );

			// Load the duplicate post and save it.
			props.loadPostIntoEditor( props.postType.slug, data.id );
			props.savePost();

			// Display a notification.
			props.createSuccessNotice(
				sprintf(
					// translators: %s is the post title.
					__( '"%s" has been duplicated.', 'nextgen' ),
					data.title.raw
				),
				{ type: 'snackbar' }
			);
		} ).catch( () => {
			props.createErrorNotice( __( 'Duplication failed', 'nextgen' ) );
		} );
	}

	render() {
		const { props } = this;

		return (
			<PanelBody
				key={ props.postType.slug }
				title={ props.postType.name }
				className="content-management__panel"
				initialOpen={ props.postType.slug === 'page' }>

				{ props.entities && props.entities.map( ( post, index ) => (
					<PanelRow key={ index }>
						<Button
							className={ classnames( { current: props.currentPostId === post.id } ) }
							onClick={ () => props.loadPostIntoEditor( post.type, post.id ) }
							isLink>

							{ post.title.raw ? post.title.rendered : __( '(no title)', 'nextgen' ) }

							{ props.currentPostId === post.id && (
								<span className="current-badge">
									{ __( '(current)', 'nextgen' ) }
								</span>
							) }

						</Button>

						<PostMenuActions
							onDuplicatePost={ () => this.onDuplicate( post ) }
							onDeletePost={ () => this.onDelete( post ) } />
					</PanelRow>
				) ) }

				<Button
					className="content-management__button--add-new"
					onClick={ () => window.location.href = `/wp-admin/post-new.php?post_type=${ props.postType.slug }` }>

					{ props.postType.labels.add_new_item }
					<span>
						<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m11.5 7v4.5h-4.5v1.5h4.5v4.5h1.5v-4.5h4.5v-1.5h-4.5v-4.5z" fill="#fff" /></svg>
					</span>
				</Button>
			</PanelBody>
		);
	}
}

export default compose( [

	withSelect( ( select, props ) => {
		const {
			getCurrentPostId,
		} = select( 'core/editor' );

		const {
			getEntityRecords,
		} = select( 'core' );

		const filteredPosts = {};
		( getEntityRecords( 'postType', props.postType.slug, { status: [ 'publish', 'draft' ] } ) || [] ).forEach( ( post ) => filteredPosts[ post.id ] = post );

		return {
			getEntityRecords,
			currentPostId: getCurrentPostId(),
			entities: Object.values( filteredPosts ),
		};
	} ),

	withDispatch( ( dispatch ) => {
		const {
			editEntityRecord,
			receiveEntityRecords,
		} = dispatch( 'core' );

		const {
			savePost,
		} = dispatch( 'core/editor' );

		const {
			createErrorNotice,
			createSuccessNotice,
		} = dispatch( 'core/notices' );

		return {
			createErrorNotice,
			createSuccessNotice,
			editEntityRecord,
			receiveEntityRecords,
			savePost,
		};
	} ),

] )( PostTypePanel );
