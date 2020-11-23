/**
 * External dependencies
 */
import { isFunction } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component, cloneElement } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

class PublishGuideList extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			completedItems: props.completedItems || [],
			closedItems: props.closedItems || [],
		};
	}

	componentDidMount() {
		if ( ! this.incompleteItems().length && isFunction( this.props.onListComplete ) ) {
			this.props.onListComplete();
		}

		this.setState( JSON.parse( window.localStorage.getItem( 'nextgenPublishGuideList' ) ) );
	}

	componentDidUpdate( _prevProps, prevState ) {
		const { completedItems } = this.state;
		const { onListComplete } = this.props;

		if (
			completedItems.length !== prevState.completedItems.length &&
			! this.incompleteItems().length && isFunction( onListComplete )
		) {
			onListComplete();
		}

		// Update local storage with current state.
		window.localStorage.setItem( 'nextgenPublishGuideList', JSON.stringify( this.state ) );
	}

	toggleComplete( childIndex ) {
		const { completedItems, closedItems } = this.state;

		this.setState( {
			completedItems: completedItems.includes( childIndex )
				? completedItems.filter( ( index ) => index !== childIndex )
				: [ ...completedItems, childIndex ],
			// Force the item to closed.
			closedItems: closedItems.includes( childIndex )
				? closedItems
				: [ ...closedItems, childIndex ],
		} );
	}

	toggleOpen( childIndex ) {
		const { closedItems } = this.state;

		this.setState( {
			closedItems: closedItems.includes( childIndex )
				? closedItems.filter( ( index ) => index !== childIndex )
				: [ ...closedItems, childIndex ],
		} );
	}

	incompleteItems() {
		const { completedItems } = this.state;
		const { children } = this.props;

		return Object.keys( children )
			.map( ( value ) => Math.abs( value ) )
			.filter( ( value ) => ! completedItems.includes( Math.abs( value ) ) );
	}

	render() {
		const {
			completedItems,
			closedItems,
		} = this.state;

		return (
			<ul className="publish-guide-popover__items">
				{ this.props.children.map( ( child, childIndex ) => {
					return cloneElement( child, {
						key: `publish-guide-item-${ childIndex }`,
						isComplete: completedItems.includes( childIndex ),
						isOpen: ! closedItems.includes( childIndex ),
						isHighlighted: this.incompleteItems().shift() === childIndex,
						toggleComplete: () => this.toggleComplete( childIndex ),
						toggleOpen: () => this.toggleOpen( childIndex ),
					} );
				} ) }
			</ul>
		);
	}
}

export default compose( [

	withSelect( () => {
		return JSON.parse( window.localStorage.getItem( 'nextgenPublishGuideList' ) ) || {};
	} ),

] )( PublishGuideList );
