/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { SVG, Path } from '@wordpress/primitives';

const SuccessView = ( props ) => {
	const { callback } = props;

	return (
		<div className="feedback-modal__success">
			<SVG fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 49"><Path fillRule="evenodd" clipRule="evenodd" d="M48.7334 16.52H37.9067V9.13331C37.9067 7.23997 37.2667 5.42664 36.12 3.95997C34.6 2.03997 32.3867 0.946639 29.9334 0.999972C27.5067 1.05331 25.2934 2.19997 23.8267 4.17331L14.3067 17H0.333374V49H16.3334V45.8266L19.1867 49H47.4267L54.12 24.8666L48.7334 16.52ZM11 43.6666H5.66671V22.3333H11V43.6666ZM43.3734 43.6666H21.56L16.3334 37.8533V23.1333L16.3867 23.16L28.12 7.34664C28.7334 6.4933 29.56 6.3333 30.0134 6.3333C30.44 6.3333 31.2934 6.43997 31.9334 7.26664C32.3334 7.7733 32.5734 8.43997 32.5734 9.1333V21.88H45.8267L48.3334 25.7733L43.3734 43.6666Z" fill="#09757A" /></SVG>
			<h2 className="feedback-modal__title feedback-modal__success__msg">
				{ __( 'Thank you for sharing your feedback with us', 'nextgen' ) }
			</h2>
			<div>
				<Button
					isPrimary
					onClick={ () => callback() }>
					{ __( 'Close', 'nextgen' ) }
				</Button>
			</div>
		</div>
	);
};

export default SuccessView;
