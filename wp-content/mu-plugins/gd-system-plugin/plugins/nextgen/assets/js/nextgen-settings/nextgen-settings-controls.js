const CheckboxControl = wp.components.CheckboxControl;
const Component = wp.element.Component;
const __ = wp.i18n.__;
const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;

class NextGenSettingsControls extends Component {
	updateAdminShortcutSetting( newSetting ) {
		const { updateSettings, setAdminShortcut } = this.props;

		const shortcut = document.querySelectorAll( '.interface-pinned-items .nextgen-shortcut' );
		Array.from( shortcut ).forEach( ( item ) => {
			item.style.display = ! newSetting ? 'inline-flex' : 'none';
		} );

		updateSettings( { disableCustomColors: newSetting } );
		setAdminShortcut();
	}

	render() {
		const { adminShortcut } = this.props;

		return (
			<CheckboxControl
				label={ __( 'WordPress Admin shortcut', 'gd-nextgen' ) }
				help={ __( 'Allow the admin header shortcut.', 'gd-nextgen' ) }
				onChange={ () => this.updateAdminShortcutSetting( !! adminShortcut ) }
				checked={ !! adminShortcut } />
		);
	}
}

const applyWithSelect = withSelect( ( select ) => {
	const { getAdminShortcut } = select( 'nextgen-settings' );

	return {
		adminShortcut: getAdminShortcut(),
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const { setAdminShortcut } = dispatch( 'nextgen-settings' );
	const { updateSettings } = dispatch( 'core/block-editor' );

	return {
		setAdminShortcut,
		updateSettings,
	};
} );

export default compose( [
	applyWithSelect,
	applyWithDispatch,
] )( NextGenSettingsControls );
