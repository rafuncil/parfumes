export const customSelectStyles = {
	control: (provided: any, state: any) => ({
		...provided,
		minHeight: '48px',
		border: state.isFocused
			? '1px solid #D4AF37'
			: '1px solid rgba(212, 175, 55, 0.3)',
		borderRadius: '50px',
		boxShadow: state.isFocused
			? '0 0 0 3px rgba(212, 175, 55, 0.15)'
			: 'none',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		fontSize: '16px',
		backdropFilter: 'blur(5px)',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		cursor: 'pointer',
		'&:hover': {
			borderColor: 'rgba(212, 175, 55, 0.6)',
			backgroundColor: 'rgba(0, 0, 0, 0.7)',
		}
	}),
	input: (provided: any) => ({
		...provided,
		color: '#F5F5F5',
		fontSize: '16px',
		fontFamily: 'inherit',
	}),
	option: (provided: any, state: any) => ({
		...provided,
		padding: '12px 20px',
		backgroundColor: state.isSelected
			? 'rgba(212, 175, 55, 0.3)'
			: state.isFocused
				? 'rgba(212, 175, 55, 0.15)'
				: 'transparent',
		color: state.isSelected ? '#D4AF37' : '#F5F5F5',
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		fontFamily: 'inherit',
		fontSize: '14px',
		letterSpacing: '0.3px',
		'&:active': {
			backgroundColor: 'rgba(212, 175, 55, 0.4)',
		},
	}),
	menu: (provided: any) => ({
		...provided,
		borderRadius: '16px',
		border: '1px solid rgba(212, 175, 55, 0.3)',
		boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 175, 55, 0.1) inset',
		fontSize: '16px',
		backgroundColor: 'rgba(10, 10, 10, 0.95)',
		backdropFilter: 'blur(10px)',
		overflow: 'hidden',
		zIndex: 1000,
		marginTop: '8px',
	}),
	menuList: (provided: any) => ({
		...provided,
		padding: '8px 0',
		'&::-webkit-scrollbar': {
			width: '6px',
		},
		'&::-webkit-scrollbar-track': {
			background: 'rgba(212, 175, 55, 0.1)',
			borderRadius: '3px',
		},
		'&::-webkit-scrollbar-thumb': {
			background: 'rgba(212, 175, 55, 0.4)',
			borderRadius: '3px',
			'&:hover': {
				background: 'rgba(212, 175, 55, 0.6)',
			},
		},
	}),
	groupHeading: (provided: any) => ({
		...provided,
		padding: '12px 20px 6px 20px',
		fontSize: '11px',
		color: '#D4AF37',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		fontWeight: 'bold',
		textTransform: 'uppercase' as const,
		letterSpacing: '1.5px',
		marginBottom: '4px',
		fontFamily: 'inherit',
	}),
	dropdownIndicator: (provided: any, state: any) => ({
		...provided,
		color: state.isFocused ? '#D4AF37' : 'rgba(245, 245, 245, 0.5)',
		transition: 'all 0.2s ease',
		padding: '0 12px',
		'&:hover': {
			color: '#D4AF37',
		},
	}),
	indicatorSeparator: () => ({
		display: 'none',
	}),
	placeholder: (provided: any) => ({
		...provided,
		color: 'rgba(245, 245, 245, 0.5)',
		fontFamily: 'inherit',
	}),
	singleValue: (provided: any) => ({
		...provided,
		color: '#F5F5F5',
		fontFamily: 'inherit',
	}),
	clearIndicator: (provided: any) => ({
		...provided,
		color: 'rgba(245, 245, 245, 0.5)',
		transition: 'all 0.2s ease',
		'&:hover': {
			color: '#e8a0a0',
		},
	}),
	loadingIndicator: (provided: any) => ({
		...provided,
		color: '#D4AF37',
	}),
	loadingMessage: (provided: any) => ({
		...provided,
		color: '#F5F5F5',
		fontFamily: 'inherit',
	}),
	noOptionsMessage: (provided: any) => ({
		...provided,
		color: 'rgba(245, 245, 245, 0.6)',
		fontFamily: 'inherit',
		fontSize: '14px',
	}),
};