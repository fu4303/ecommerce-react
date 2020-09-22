import React from 'react'

import Button from '../Form/Button'

const LoadMore = ({ onLoadMoreEvt = () => {} }) => {
	return <Button onClick={() => onLoadMoreEvt()}>LoadMore</Button>
}

export default LoadMore
