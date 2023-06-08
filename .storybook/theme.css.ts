import { createTheme } from '@vanilla-extract/css'
import { vars } from '../packages/theme/contract.css'

export const theme = createTheme(vars, {
	font: {
		family: 'Arial',
		size: {
			1: '10px',
			2: '12px',
			3: '14px',
			4: '16px',
			5: '18px',
			6: '20px',
			7: '26px',
			8: '36px'
		},
		weight: {
			normal: '400',
			medium: '500'
		}
	},
	radius: {
		0: '0',
		1: '2px',
		2: '4px',
		3: '6px',
		4: '8px'
	},
	spacing: {
		0: '0',
		1: '4px',
		2: '8px',
		3: '12px',
		4: '16px',
		5: '20px',
		6: '24px',
		7: '28px',
		8: '32px'
	},
	elevation: {
		0: 'none',
		1: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 2px 0px rgba(0,0,0,0.12)',
		2: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 4px 0px rgba(0,0,0,0.12)',
		3: '0px 3px 2px -2px rgba(0,0,0,0.2), 0px 3px 3px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
		4: '0px 3px 2px -2px rgba(0,0,0,0.2), 0px 4px 4px 0px rgba(0,0,0,0.14), 0px 1px 12px 0px rgba(0,0,0,0.12)'
	},
	transition: {
		easing: 'ease',
		duration: '400ms'
	},
	coloring: {
		common: {
			white: '#ffffff',
			black: '#000000'
		},
		surface: {
			primary: '#ffffff',
			secondary: '#f7f7f7'
		},
		palette: {
			primary: { main: '#1976d2', contrast: '#ffffff' },
			secondary: { main: '#9c27b0', contrast: '#ffffff' },
			info: { main: '#0288d1', contrast: '#ffffff' },
			error: { main: '#d32f2f', contrast: '#ffffff' },
			warning: { main: '#ed6c02', contrast: '#ffffff' },
			success: { main: '#2e7d32', contrast: '#ffffff' },
			neutral: { main: '#767676', contrast: '#ffffff' }
		}
	}
})
