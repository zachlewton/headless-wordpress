/**
 * External dependencies
 */
import { ChecklistIcon } from '@godaddy-wordpress/coblocks-icons';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { Fragment, Component, createPortal } from '@wordpress/element';

import {
	Button,
	Icon,
	Popover,
	DropdownMenu,
} from '@wordpress/components';
import { check, close, moreVertical, verse } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './store';
import PublishGuideList from './publish-guide-list';
import SiteDesignGuide from './publish-guide-items/site-design';
import SiteContentGuide from './publish-guide-items/site-content';
import { SiteInfoGuide } from './publish-guide-items/site-info';
import { AddDomainGuide } from './publish-guide-items/add-domain';

import './publish-guide-defaults';
import SuccessView from './success-view';

let parentElement;

class PublishGuide extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			confettis: false,
			homeUrl: 'www.coolexample.com',
			isCompleted: false,
			isOpen: true,
			isFeedbackModalOpen: false,
			title: '',
			tagline: '',
			selectedItem: 0,
		};

		this.prepareDOM();
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.isActive !== this.props.isActive ) {
			this.setState( { isOpen: true } );
		}
	}

	componentWillUnmount() {
		this.cleanDOM();
	}

	/**
	 * Prepares the DOM for the Publish Guide to be rendered.
	 */
	prepareDOM() {
		if ( ! parentElement ) {
			parentElement = document.createElement( 'div' );
			document.body.appendChild( parentElement );
		}
		this.node = document.createElement( 'div' );
		parentElement.appendChild( this.node );
	}

	/**
	 * Removes the specific mounting point for the Publish Guide from the DOM.
	 */
	cleanDOM() {
		parentElement.removeChild( this.node );
	}

	/**
	 * Toggle the success view and trigger the confettis animation on first display
	 */
	toggleSuccess() {
		this.setState(
			{
				confettis: false,
				isCompleted: true,
			},
			() => {
				// Confettis needs this delay to trigger
				setTimeout( () => this.setState( { confettis: true } ), 100 );
			} );
	}

	triggerClosePopover = () => this.setState( { isOpen: false } );

	triggerToggleFeedback = () => {
		this.props.toggleFeedbackModal();

		this.setState( { isOpen: false } );
	}

	render() {
		return null; //@todo remove this when we launch the publish guide.

		const {
			isActive,
			shiftedDisplay,
			togglePublishGuide,
		} = this.props;

		const {
			confettis,
			homeUrl,
			isCompleted,
			isOpen,
			isFeedbackModalOpen,
		} = this.state;

		return (
			<Fragment>
				<PluginMoreMenuItem
					icon={ isActive ? check : <svg /> }
					onClick={ togglePublishGuide }
				>
					{ __( 'Publish Guide', 'nextgen' ) }
				</PluginMoreMenuItem>

				{ isActive && createPortal(
					<div className={ classnames(
						'publish-guide-trigger',
						{ 'is-shifted': shiftedDisplay }
					) }>

						{ isOpen && (
							<Popover
								className="publish-guide-popover"
								position="top left"
								focusOnMount="container">
								<div className="publish-guide-popover__header components-modal__header">
									<h1 className="components-modal__header-heading">
										{ __( 'Getting Started Guide', 'nextgen' ) }
									</h1>
									<DropdownMenu
										icon={ moreVertical }
										className="publish-guide-popover__more-dropdown"
										controls={ [
											{
												title: __( 'Give Feedback', 'nextgen' ),
												icon: verse,
												onClick: () => this.triggerToggleFeedback(),
											},
											{
												title: __( 'Hide this guide', 'nextgen' ),
												icon: <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="m18.6548 6.46091-2.0811 2.08903-.5618.55391-7.32742 7.32745-.56973.5697-1.65381 1.6538-1.11573-1.1157 1.5272-1.5272c-1.08408-1.0129-2.03363-2.2869-2.70624-3.6637l-.16617-.3482.16617-.3482c1.40851-2.8803 4.45501-5.98218 7.83383-5.98218 1.274 0 2.6192.46686 3.8853 1.32938l1.6538-1.65382zm-7.826 4.33629c-.451.4511-.5855 1.0999-.4194 1.6776l2.0812-2.0811c-.5698-.1662-1.2266-.0396-1.6618.4035zm2.8487-1.59839c-.4986-.30861-1.0762-.4827-1.6776-.4827-.8704 0-1.6855.34026-2.30267.96539-1.06825 1.0762-1.2186 2.73-.48269 3.9881l-1.2186 1.2186c-.87043-.7992-1.6459-1.7962-2.22355-2.8882 1.28982-2.41346 3.76658-4.74779 6.22751-4.74779.8783 0 1.82.31652 2.7379.88626zm4.5896.00791c.6172.75965 1.1474 1.58258 1.5668 2.44508l.1662.3482-.1662.3482c-1.4085 2.8803-4.455 5.9822-7.8338 5.9822-.6964 0-1.4006-.1345-2.11281-.3957l-.34026-.1266 1.26607-1.2581c.4036.1187.8071.1978 1.1949.1978 2.4609 0 4.9456-2.3343 6.2354-4.7478-.3244-.6093-.7122-1.1869-1.1474-1.7329l1.1237-1.12368z" fill="currentColor" fillRule="evenodd" /></svg>,
												onClick: () => this.triggerClosePopover(),
											},
										] }
									/>
								</div>

								<PublishGuideList
									onListComplete={ () => this.toggleSuccess() }
								>
									<SiteInfoGuide />
									<SiteDesignGuide closePopover={ () => this.triggerClosePopover() } />
									<SiteContentGuide closePopover={ () => this.triggerClosePopover() } />
									<AddDomainGuide />
								</PublishGuideList>

								{ isCompleted && <SuccessView homeurl={ homeUrl } /> }
								{ isCompleted &&
									<SuccessView
										homeurl={ homeUrl }
										confettis={ confettis }
										onTriggerClosePopover={ () => this.triggerClosePopover() }
										onTriggerGiveFeedback={ () => this.triggerToggleFeedback() }
									/>
								}
							</Popover>
						) }

						<Button
							className={ classnames(
								'publish-guide-trigger__button',
								{ 'is-opened': isOpen }
							) }
							aria-label={ __( 'Publish Guide', 'nextgen' ) }
							isPrimary
							onClick={ () => this.setState( { isOpen: ! this.state.isOpen } ) }
						>
							<span className="publish-guide-trigger__button__icon-check">
								<Icon icon={ ChecklistIcon } />
							</span>
							<span className="publish-guide-trigger__button__icon-close">
								<Icon icon={ close } />
							</span>

							<div className="publish-guide-trigger__button__pulse">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</Button>

					</div>,
					this.node
				) }
			</Fragment>
		);
	}
}

registerPlugin( 'nextgen-publish-guide', {
	render: compose( [

		withSelect( ( select ) => {
			const { isPublishGuideActive } = select( 'nextgen/publish-guide' );
			const { isEditorSidebarOpened, isPluginSidebarOpened } = select( 'core/edit-post' );

			return {
				isActive: isPublishGuideActive(),
				shiftedDisplay: isEditorSidebarOpened() || isPluginSidebarOpened(),
			};
		} ),

		withDispatch( ( dispatch ) => {
			const { togglePublishGuide } = dispatch( 'nextgen/publish-guide' );
			const { toggleFeedbackModal } = dispatch( 'nextgen/feedback-modal' );

			return {
				togglePublishGuide,
				toggleFeedbackModal,
			};
		} ),

	] )( PublishGuide ),
} );
