/* global nextgenSiteDesign */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import FontSizePicker from './font-size-picker';
import { useEffect } from '@wordpress/element';

function FontPreviews( {
	onChangeFont,
	fonts,
	selected,
	...props
} ) {
	const instanceId = useInstanceId( FontPreviews );
	const id = `font-preview-${ instanceId }`;

	useEffect( () => {
		document.getElementsByClassName( nextgenSiteDesign.editorClass )[ 0 ].style.setProperty( '--go-heading--font-family', fonts[ selected ][ 0 ][ 0 ] );
		document.getElementsByClassName( nextgenSiteDesign.editorClass )[ 0 ].style.setProperty( '--go--font-family', fonts[ selected ][ 1 ][ 0 ] );
	}, [ selected ] );

	return (
		<ul className="components-site-design-fonts__options">
			{ fonts.map( ( font, index ) => (
				<li
					key={ `${ id }-${ index }` }
					className={ classnames(
						'components-site-design-fonts__option',
						`is-${ font[ 0 ][ 0 ].toLowerCase() }`,
						{ 'is-selected': index === selected }
					) }
					onClick={ () => onChangeFont( index ) }
				>
					<div className="components-site-design-fonts__option__section">
						<p
							className="components-site-design-fonts__option__primary"
							style={ { fontFamily: font[ 0 ][ 0 ] } }>
							{ font[ 0 ][ 0 ] }
						</p>
						<p
							className="components-site-design-fonts__option__secondary"
							style={ { fontFamily: font[ 1 ][ 0 ] } }>
							{ __( 'The quick brown fox jump over the lazy dog.', 'nextgen' ) }
						</p>
					</div>
					{
						index === selected &&
						<div className="components-site-design-fonts__option__settings components-site-design-fonts__option__section">
							<FontSizePicker { ...props } />
						</div>
					}
				</li>
			) ) }
		</ul>
	);
}

export default FontPreviews;

