/* global logoMenuData */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	Button,
	Popover,
	Icon,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { SVG, Path } from '@wordpress/primitives';
import { registerPlugin } from '@wordpress/plugins';
import { __experimentalMainDashboardButton as MainDashboardButton } from '@wordpress/interface';
import { useState, useEffect } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import {
	chevronDown,
	cog,
	help,
	home,
	reusableBlock,
	verse,
	wordpress,
} from '@wordpress/icons';

const LogoMenu = ( props ) => {
	const [ isVisible, setVisible ] = useState( false );

	const toggleVisible = () => setVisible( ! isVisible );

	const gritter = document.getElementsByClassName( 'gritter-item' );
	useEffect( () => {
		if ( !! gritter.length ) {
			createNotice( 'success', __( 'Cache cleared', 'nextgen' ), { type: 'snackbar' } );
		}
	}, [ gritter ] );

	const { adminUrl, overview, settings, flush, createNotice } = props;

	return (
		<MainDashboardButton>
			<div className="logo-menu__logo-wrapper">
				<Button
					className="logo-menu__logo"
					onClick={ () => toggleVisible() }
					icon={ (
						<SVG width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<Path d="M23.2882 1.09799C20.4824 -0.6532 16.7887 -0.237394 13.4989 1.83136C10.2102 -0.236251 6.51642 -0.652058 3.71177 1.09799C-0.721195 3.86242 -1.26015 10.986 2.50913 17.0072C5.2886 21.4462 9.63231 24.0473 13.5 23.9993C17.3677 24.0473 21.7125 21.4474 24.4909 17.0072C28.2602 10.986 27.7212 3.86242 23.2882 1.09799ZM4.54596 15.7358C3.75297 14.4689 3.16824 13.1313 2.80664 11.7593C2.46679 10.4673 2.33977 9.20622 2.43017 8.01135C2.59838 5.78724 3.5058 4.05433 4.98422 3.13133C6.46378 2.20833 8.42166 2.15464 10.4974 2.97826C10.8098 3.10277 11.1187 3.2467 11.4254 3.40549C10.3189 4.40616 9.30161 5.61018 8.43653 6.99125C6.14567 10.6501 5.44994 14.7145 6.24751 17.9622C5.62273 17.2905 5.05288 16.5445 4.54596 15.7358ZM24.1922 11.7593C23.8306 13.1313 23.2459 14.4689 22.4529 15.7358C21.946 16.5445 21.3761 17.2893 20.7502 17.9633C21.4642 15.0561 20.9813 11.4943 19.2283 8.15528C19.1047 7.91996 18.8198 7.84228 18.5955 7.98279L13.1373 11.3881C12.9279 11.5183 12.8649 11.7936 12.9954 12.0015L13.7952 13.2798C13.9257 13.4888 14.2014 13.5516 14.4097 13.4214L17.9478 11.2144C18.0668 11.5537 18.1721 11.8953 18.2637 12.2391C18.6035 13.5311 18.7305 14.7922 18.6401 15.9871C18.4719 18.2112 17.5645 19.9441 16.0861 20.8671C15.3469 21.3274 14.4887 21.5719 13.5561 21.5982C13.5366 21.5982 13.516 21.5982 13.4966 21.5982C13.4783 21.5982 13.46 21.5982 13.4428 21.5982C12.5102 21.5719 11.652 21.3274 10.9128 20.8671C9.43321 19.9441 8.52693 18.2112 8.35872 15.9871C8.26832 14.7922 8.39534 13.5311 8.73519 12.2391C9.09678 10.8672 9.68152 9.5295 10.4745 8.26266C11.2675 6.99582 12.215 5.88433 13.2917 4.95905C14.3056 4.08745 15.3858 3.42034 16.5015 2.97826C18.5783 2.1535 20.5362 2.20833 22.0146 3.13133C23.4942 4.05433 24.4005 5.78724 24.5687 8.01135C24.6602 9.20622 24.5332 10.4673 24.1922 11.7593Z" fill="#111111" />
						</SVG>
					) }
				>
					{ __( 'Site Editor', 'nextgen' ) } <span>{ __( 'Beta', 'nextgen' ) }</span>
					<Icon
						icon={ chevronDown }
						className={ classnames(
							'chevron', {
								'is-open': isVisible,
							}
						) }
					/>
				</Button>
				{ isVisible && (
					<Popover
						className="logo-menu__logo-popover"
						focusOnMount="container"
						onClose={ () => setVisible( false ) }
						noArrow="false"
					>
						<>
							{ ( adminUrl || overview || settings ) &&
							<MenuGroup label={ __( 'Navigation', 'nextgen' ) }>
								{ adminUrl &&
									<MenuItem href={ adminUrl } icon={ wordpress } className="wordpress">
										{ __( 'WordPress Admin', 'nextgen' ) }
									</MenuItem>
								}
								{ overview &&
									<MenuItem href={ overview } icon={ home }>
										{ __( 'Hosting Overview', 'nextgen' ) }
									</MenuItem>
								}
								{ settings &&
									<MenuItem href={ settings } icon={ cog }>
										{ __( 'Hosting Settings', 'nextgen' ) }
									</MenuItem>
								}
							</MenuGroup>
							}
							<MenuGroup label={ __( 'Tools', 'nextgen' ) } >
								{ flush &&
									<MenuItem
										href={ flush }
										icon={ <SVG fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><Path clipRule="evenodd" d="m3.00998 8.44755h1.55335 3.43667v-1.55336h-2.45029c1.36066-1.93908 3.82023-2.77396 6.08009-2.06385 2.2599.7101 3.8 2.80172 3.807 5.17056h1.5533c-.0088-2.95846-1.8791-5.59098-4.6698-6.57297-2.79076-.98199-5.89747-.10076-7.75697 2.20028l-.00003-2.62821h-1.55335zm8.92752 4.66005v-1.5534h5.0526v5.4146h-1.5533v-2.572c-1.8622 2.3044-4.9748 3.1845-7.76795 2.1964-2.79311-.9881-4.65994-3.6296-4.6589-6.5923h1.55335c.00704 2.3688 1.54704 4.4604 3.80695 5.1705 2.25995.7101 4.71945-.1248 6.08015-2.0638z" fill="currentColor" fillRule="evenodd" /></SVG> }>
										{ __( 'Flush Cache', 'nextgen' ) }
									</MenuItem>
								}
								<MenuItem icon={ reusableBlock }>
									{ __( 'Connection Management', 'nextgen' ) }
								</MenuItem>
							</MenuGroup>
							<MenuGroup label={ __( 'Support', 'nextgen' ) }>
								<MenuItem onClick={ toggleVisible } icon={ verse }>
									{ __( 'Give Feedback', 'nextgen' ) }
								</MenuItem>
								<MenuItem onClick={ toggleVisible } icon={ help } id="wp-admin-bar-wpaas-help-and-support">
									{ __( 'Help & Support', 'nextgen' ) }
								</MenuItem>
							</MenuGroup>
						</>
					</Popover>
				) }
			</div>
		</MainDashboardButton>

	);
};

registerPlugin( 'logo-menu', {
	render: compose( [

		withSelect( () => {
			return {
				adminUrl: logoMenuData?.admin || '',
				overview: logoMenuData?.overview || '',
				settings: logoMenuData?.settings || '',
				flush: logoMenuData?.flush || '',
			};
		} ),

		withDispatch( ( dispatch ) => {
			const { createNotice } = dispatch( 'core/notices' );

			return {
				createNotice,
			};
		} ),

	] )( LogoMenu ),
} );
