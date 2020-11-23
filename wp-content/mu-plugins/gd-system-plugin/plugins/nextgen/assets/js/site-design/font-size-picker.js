/* global nextgenSiteDesign */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { VisuallyHidden, CustomSelectControl, RangeControl } from '@wordpress/components';
import { useMemo, useState, useEffect, useRef } from '@wordpress/element';

const DEFAULT_FONT_SIZE = 'normal';
const CUSTOM_FONT_SIZE = 'custom';

function getSelectValueFromFontSize( fontSizes, value ) {
	if ( value ) {
		const fontSizeValue = fontSizes.find(
			( font ) => font.style?.fontSize === `${ value.toFixed( 2 ) }rem`
		);
		return fontSizeValue ? fontSizeValue.key : CUSTOM_FONT_SIZE;
	}
	return DEFAULT_FONT_SIZE;
}

function getSelectOptions( baseFontSize ) {
	if ( ! baseFontSize ) {
		return [];
	}

	return [
		{
			key: 'small',
			name: __( 'Small', 'nextgen' ),
			style: { fontSize: `${ ( baseFontSize * 0.8 ).toFixed( 2 ) }rem` },
		},
		{
			key: 'normal',
			name: __( 'Normal', 'nextgen' ),
			style: { fontSize: `${ baseFontSize.toFixed( 2 ) }rem` },
		},
		{
			key: 'large',
			name: __( 'Large', 'nextgen' ),
			style: { fontSize: `${ ( baseFontSize * 1.3 ).toFixed( 2 ) }rem` },
		},
		{
			key: CUSTOM_FONT_SIZE,
			name: __( 'Custom' ),
		},
	];
}

function FontSizePicker( {
	fontSize,
	designFontSize,
	typeRatio,
	designTypeRatio,
	onChangeFontSize,
	onChangeTypeRatio,
} ) {
	const baseFontSize = Number( fontSize.replace( 'rem', '' ) );
	const designFontSizeNumber = Number( designFontSize.replace( 'rem', '' ) );
	const instanceId = useInstanceId( FontSizePicker );

	useEffect( () => {
		if ( ! baseFontSize ) {
			return;
		}
		document.getElementsByClassName( nextgenSiteDesign.editorClass )[ 0 ].style.setProperty( '--go--font-size', `${ baseFontSize }rem` );
	}, [ baseFontSize ] );

	useEffect( () => {
		if ( ! typeRatio ) {
			return;
		}
		document.getElementsByClassName( nextgenSiteDesign.editorClass )[ 0 ].style.setProperty( '--go--type-ratio', typeRatio );
	}, [ typeRatio ] );

	const options = useMemo(
		() => getSelectOptions( designFontSizeNumber ),
		[ designFontSizeNumber ]
	);

	if ( ! options ) {
		return null;
	}

	const selectedFontSizeSlug = getSelectValueFromFontSize( options, baseFontSize );

	const fontSizePickerNumberId = `components-font-size-picker__number#${ instanceId }`;

	return (
		<fieldset className="components-font-size-picker">
			<VisuallyHidden as="legend">{ __( 'Base size', 'nextgen' ) }</VisuallyHidden>
			<div className="components-font-size-picker__controls">
				{ baseFontSize && (
					<CustomSelectControl
						className="components-font-size-picker__select"
						label={ __( 'Font size', 'nextgen' ) }
						options={ options }
						value={ options.find(
							( option ) => option.key === selectedFontSizeSlug
						) }
						onChange={ ( { selectedItem } ) => {
							const selectedValue =
								selectedItem.style &&
								selectedItem.style.fontSize;

							if ( ! selectedValue ) {
								return;
							}

							onChangeFontSize( selectedValue );
						} }
					/>
				) }
				<div className="components-font-size-picker__number-container">
					<input
						id={ fontSizePickerNumberId }
						className="components-font-size-picker__number"
						type="number"
						min={ 0 }
						max={ 5 }
						step={ 0.01 }
						onChange={ ( event ) => {
							onChangeFontSize( `${ event.target.value }rem` );
						} }
						aria-label={ __( 'Custom' ) }
						value={ baseFontSize || '' }
					/>
				</div>
			</div>
			<div className="components-font-size-picker__heading-container">
				<RangeControl
					className="components-font-size-picker__heading-scale"
					label={ __( 'Heading Scale', 'nextgen' ) }
					initialPosition={ typeRatio }
					value={ typeRatio || '' }
					onChange={ ( newValue ) => {
						onChangeTypeRatio( newValue );
					} }
					showTooltip={ false }
					step={ 0.01 }
					withInputField={ false }
					min={ designTypeRatio * 0.9 }
					max={ designTypeRatio * 1.15 }
				/>
			</div>
		</fieldset>
	);
}

export default FontSizePicker;
