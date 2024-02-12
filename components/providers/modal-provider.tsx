'use client'

import { CoverImageModal } from '@/components/modals/cover-image-modal'
import SettingsModal from '@/components/modals/settings-modal'

import { useEffect, useState } from 'react'

export const ModalProvider = () => {
	const [isMounted, setisMounted] = useState(false)

	useEffect(() => {
		setisMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		<div>
			<>
				<SettingsModal />
				<CoverImageModal />
			</>
		</div>
	)
}
