'use client'

import { useState } from 'react'

const InactivityDetector: React.FC = () => {
	const [isInactive] = useState(false)

	return (<>
		<div>Is active: {!isInactive ? 'Yes' : 'No'}</div>
	</>)
}

export default InactivityDetector