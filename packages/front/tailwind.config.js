const { colors, fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
	theme: {
		colors: {
			...colors,
			primary: '#123', //exemplo de cor custom no tailwind, dai referencia la depois como, por ex: border-primary,
			'smoke-darkest': 'rgba(0, 0, 0, 0.9)',
			'smoke-darker': 'rgba(0, 0, 0, 0.75)',
			'smoke-dark': 'rgba(0, 0, 0, 0.6)',
			smoke: 'rgba(0, 0, 0, 0.5)',
			'smoke-light': 'rgba(0, 0, 0, 0.4)',
			'smoke-lighter': 'rgba(0, 0, 0, 0.25)',
			'smoke-lightest': 'rgba(0, 0, 0, 0.1)',
			fleury: '#BA0850',
			weinmann: '#005B6A',
			fm: '#8B0E04',
			'amais-site': '#009FDE',
			'labs-amais': '#008ED9',
			diagnoson: '#8FBDA9',
			irn: '#000000'
		},
		fontFamily: {
			...fontFamily,
			body: ['Raleway'] // fonte custom que foi adicionada no public/index.html
		}
	},
	variants: {},
	plugins: []
}
