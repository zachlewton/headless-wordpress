/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

const CommentView = ( props ) => {
	const { callback, selectedRating } = props;

	const [ comment, setComment ] = useState( '' );

	return (
		<div className={ classnames(
			'feedback-modal__comment',
			`feedback-modal__comment--${ selectedRating }`
		) }>
			<textarea
				className="feedback-modal__comment__textarea"
				placeholder={ __( 'Tell us about your experience… (optional)', 'nextgen' ) }
				onChange={ ( event ) => setComment( event.target.value ) }
				value={ comment } />
			<div>
				<Button
					isPrimary
					onClick={ () => callback( comment ) }>
					{ __( 'Send', 'nextgen' ) }
				</Button>
			</div>
		</div>
	);
};

export default CommentView;
