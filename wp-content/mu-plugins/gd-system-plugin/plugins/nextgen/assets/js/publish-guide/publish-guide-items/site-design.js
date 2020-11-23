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
		openDesignSidebar,
	} = props;

	return (
		<PublishGuideItem
			title={ __( 'Make the design your own', 'nextgen' ) }
			text={ __( 'Update the colors, fonts and change the look and feel of your site.', 'nextgen' ) }
			{ ...props }
		>
			<Button
				isLink
				className="publish-guide-popover__link"
				onClick={ () => {
					closePopover();
					openDesignSidebar();
				} }
			>
				{ __( 'Customize', 'nextgen' ) } <Icon icon={ chevronRight } size="20" />
			</Button>
		</PublishGuideItem>
	);
};

export default compose( [
	withDispatch( ( dispatch ) => {
		const { openGeneralSidebar } = dispatch( 'core/edit-post' );

		return {
			openDesignSidebar: () => openGeneralSidebar( 'nextgen-site-design/components-site-design-design-sidebar' ),
		};
	} ),
] )( SiteDesignGuide );
