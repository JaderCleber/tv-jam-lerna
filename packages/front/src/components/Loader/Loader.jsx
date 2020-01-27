import React from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie'
import defaultLoader from './defaultLoader.json'

const Container = styled.div`
	background: rgba(255, 255, 255, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: calc(100vh + 90px);
	position: fixed;
	top: -90px;
	left: 0;
	z-index: 999;
`

const Loader = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: defaultLoader,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}
	return (
		<Container>
			<Lottie options={defaultOptions} height={100} width={100} />
		</Container>
	)
}

export default Loader
