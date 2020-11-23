/**
 * External dependencies
 */
import { TrashIcon, TrashConfirmIcon, DuplicateIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	DropdownMenu,
	MenuGroup,
	MenuItem,
	Icon,
} from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';

const PostMenuActions = ( props ) => {
	const [ isConfirming, setIsConfirming ] = useState( false );

	return (
		<DropdownMenu
			icon={ moreVertical }
			label={ __( 'Select an action', 'nextgen' ) }>

			{ ( { onClose } ) => (
				<MenuGroup className="content-management-dropdown">
					<MenuItem icon={ <Icon icon={ DuplicateIcon } /> } onClick={ () => {
						props.onDuplicatePost();
						setIsConfirming( false );
						onClose();
					} }>
						{ __( 'Duplicate', 'nextgen' ) }
					</MenuItem>
					{ isConfirming
						? (
							<MenuItem
								icon={ <Icon icon={ TrashConfirmIcon } /> }
								isDestructive
								onClick={ () => {
									props.onDeletePost();
									setIsConfirming( false );
									onClose();
								} }>
								{ __( 'Really delete?', 'nextgen' ) }
							</MenuItem>
						)
						: (
							<MenuItem icon={ <Icon icon={ TrashIcon } /> } onClick={ () => setIsConfirming( true ) }>
								{ __( 'Delete', 'nextgen' ) }
							</MenuItem>
						)
					}
				</MenuGroup>
			) }
		</DropdownMenu>
	);
};

export default PostMenuActions;
