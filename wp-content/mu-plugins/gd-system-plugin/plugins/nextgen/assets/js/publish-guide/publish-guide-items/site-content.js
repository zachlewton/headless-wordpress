/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Icon } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { chevronRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import PublishGuideItem from '../publish-guide-item';

const SiteDesignGuide = ( props ) => {
	const {
		closePopover,
		openContentSidebar,
	} = props;

	return (
		<PublishGuideItem
			title={ __( 'Review and add pages', 'nextgen' ) }
			text={ __( 'We got you started with a few. Add more pages and content.', 'nextgen' ) }
			{ ...props }
		>
			<Button
				isLink
				className="publish-guide-popover__link"
				onClick={ () => {
					closePopover();
					openContentSidebar();
				} }
			>
				{ __( 'Manage pages', 'nextgen' ) } <Icon icon={ chevronRight } size="20" />
			</Button>
		</PublishGuideItem>
	);
};

export default compose( [
	withDispatch( ( dispatch ) => {
		const { openGeneralSidebar } = dispatch( 'core/edit-post' );

		return {
			openContentSidebar: () => openGeneralSidebar( 'nextgen-site-content/nextgen-site-content' ),
		};
	} ),
] )( SiteDesignGuide );
