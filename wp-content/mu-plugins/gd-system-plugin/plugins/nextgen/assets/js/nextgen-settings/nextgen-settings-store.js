const apiFetch = wp.apiFetch;

export default function createNextGenStore() {
	let storeChanged = () => {};
	const settings = {
		adminShortcut: false,
	};

	apiFetch( {
		path: '/wp/v2/settings/',
		method: 'GET',
		headers: {
		} } ).then( ( res ) => {
		settings.adminShortcut = res.nextgen_admin_dashboard_shortcut_enabled || false;
		storeChanged();
	} );

	const selectors = {
		getAdminShortcut( ) {
			return settings.adminShortcut;
		},
	};

	const actions = {
		setAdminShortcut( ) {
			const toggle = ! settings.adminShortcut;
			settings.adminShortcut = toggle;
			storeChanged();
			apiFetch( {
				path: '/wp/v2/settings/',
				method: 'POST',
				data: {
					nextgen_admin_dashboard_shortcut_enabled: toggle,
				},
			} );
		},
	};

	return {
		getSelectors() {
			return selectors;
		},
		getActions() {
			return actions;
		},
		subscribe( listener ) {
			storeChanged = listener;
		},
	};
}
