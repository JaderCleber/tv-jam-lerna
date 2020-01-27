import React, { useState, useCallback } from 'react'
import { logout } from '../services/auth'

export default function Header({ props }) {
	const [menuStatus, setMenuStatus] = useState('CLOSED')

	const toggleMenu = useCallback(() => {
		menuStatus === 'CLOSED' ? setMenuStatus('OPEN') : setMenuStatus('CLOSED')
	}, [menuStatus])

	const handleLogout = useCallback(() => {
		logout()
		// props.history.push('/') //nao precisa a rota ja cuida disso
	})

	return (
		<nav className='flex items-center justify-between flex-wrap bg-white p-6 border-b border-primary'>
			<div className='flex items-center flex-shrink-0 text-white mr-6'>
				<div className='mr-5'>
					<span class='font-semibold text-xl tracking-tight text-primary'>Backoffice Sites Grupo Fleury</span>
				</div>
			</div>
			<div className='block lg:hidden'>
				<button
					className='flex items-center px-3 py-2 border rounded text-primary border-primary hover:text-blue-800 hover:border-blue-800'
					onClick={() => toggleMenu()}
				>
					<svg className='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
						<title>Menu</title>
						<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
					</svg>
				</button>
			</div>
			<div
				// TODO: Será esse o melhor jeito de colocar uma classe condicional?
				// primeiro ele mostra/esconde baseado no menuStatus,
				// depois força mostrar quando lg
				className={`w-full 
					${menuStatus === 'OPEN' ? 'block' : 'hidden'} 
					flex-grow lg:flex lg:items-center lg:justify-end lg:w-auto lg:block`}
			>
				<a
					onClick={handleLogout}
					href='#'
					className='inline-block text-lg px-4 py-2 leading-none border rounded text-primary border-primary hover:border-gray-700 hover:text-gray-700 hover:bg-third mt-4 lg:mt-0'
				>
					Logout
				</a>
			</div>
		</nav>
	)
}
