/**
 * External dependencies
 */
import classnames from 'classnames';

const renderRating = ( position, selectedRating, callback ) => {
	return (
		<li className="feedback-modal__rating" key={ `feedback-modal__rating-${ position }` }>
			<button
				className={ classnames(
					'feedback-modal__rating__button',
					{ 'is-selected': selectedRating === position }
				) }
				onClick={ () => callback( position ) }>
				<span className="feedback-modal__rating__value">{ position }</span>
				<div className={ `feedback-modal__rating__smile feedback-modal__rating__smile--${ position }` }></div>
			</button>
		</li>
	);
};

const RatingsView = ( props ) => {
	const { callback, limit, selectedRating } = props;
	const ratings = [];

	for ( let i = 1; i <= limit; i++ ) {
		ratings.push( renderRating( i, selectedRating, callback ) );
	}

	return (
		<ul className="feedback-modal__ratings">
			{ ratings }
		</ul>
	);
};

export default RatingsView;
