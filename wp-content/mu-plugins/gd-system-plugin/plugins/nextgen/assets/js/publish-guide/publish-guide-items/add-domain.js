/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Icon, ExternalLink } from '@wordpress/components';
import { chevronRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import PublishGuideItem from '../publish-guide-item';

export const AddDomainGuide = ( props ) => {
	const {
		isComplete,
		toggleComplete,
	} = props;

	return (
		<PublishGuideItem
			title={ __( 'Add your domain', 'nextgen' ) }
			text={ __( 'Look more professional and make it easier for customers to find your website.', 'nextgen' ) }
			{ ...props }
		>
			{ isComplete &&
				<Button
					isLink
					className="publish-guide-popover__link"
					onClick={ () => toggleComplete() }
				>
					Change <Icon icon={ chevronRight } size="20" />
				</Button>
			}
			{ ! isComplete &&
				<ExternalLink
					className="publish-guide-popover__link components-button is-link"
					href={ '' }
				>
					{ __( 'Add domain', 'nextgen' ) }
				</ExternalLink>
			}
		</PublishGuideItem>
	);
};
