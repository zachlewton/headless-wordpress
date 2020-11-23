/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useSelect, dispatch } from '@wordpress/data';
import { chevronDown } from '@wordpress/icons';
import {
	Button,
	TextControl,
	Icon,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import PublishGuideItem from '../publish-guide-item';

export const SiteInfoGuide = ( props ) => {
	const {
		isOpen,
		toggleComplete,
		toggleOpen,
	} = props;

	const [ title, setTitle ] = useState( undefined );
	const [ description, setDescription ] = useState( undefined );

	// Retrieve the site settings and set the initial state.
	useSelect( ( select ) => {
		const { getEntityRecord } = select( 'core' );
		const settingsPost = getEntityRecord( 'root', 'site' );

		if ( typeof title === 'undefined' ) {
			setTitle( settingsPost?.title );
		}

		if ( typeof description === 'undefined' ) {
			setDescription( settingsPost?.description );
		}

		return settingsPost && settingsPost;
	}, [] );

	// Save the new settings.
	const saveSettings = () => {
		return dispatch( 'core' ).saveEntityRecord( 'root', 'site', {
			title,
			description,
		} );
	};

	return (
		<PublishGuideItem
			title={ __( 'Add your site info & brand', 'nextgen' ) }
			text={ __( 'What’s the name of your site and what’s it’s purpose? Add a logo if you have one.', 'nextgen' ) }
			{ ...props }
		>
			{ ! isOpen &&
				<Button
					isLink
					className="publish-guide-popover__link"
					onClick={ () => toggleOpen() }
				>
					{ __( 'Edit', 'nextgen' ) } <Icon icon={ chevronDown } size="20" />
				</Button>
			}

			{ isOpen && <div className="publish-guide-popover__item__inner-content">
				<TextControl
					label={ __( 'Site title', 'nextgen' ) }
					value={ title }
					onChange={ ( newTitle ) => setTitle( newTitle ) }
				/>
				<TextControl
					label={ __( 'Site description', 'nextgen' ) }
					value={ description }
					onChange={ ( newDescription ) => setDescription( newDescription ) }
				/>
				<Button
					className="publish-guide-popover__upload-button"
					aria-label={ __( 'Upload site logo', 'nextgen' ) }
				>
					{ __( 'Upload site logo', 'nextgen' ) }
				</Button>

				<Button
					isPrimary
					className="publish-guide-popover__button"
					onClick={ () => {
						saveSettings().then( () => toggleComplete() );
					} }
				>
					{ __( 'Save', 'nextgen' ) }
				</Button>
				<Button
					className="publish-guide-popover__do-this-later"
					onClick={ () => toggleOpen() }
				>
					{ __( 'Do this later', 'nextgen' ) }
				</Button>
			</div> }
		</PublishGuideItem>
	);
};
