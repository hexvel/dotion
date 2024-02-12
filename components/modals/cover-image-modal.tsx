'use client'

import { useCoverImage } from '@/hooks/use-cover-image'
import { useEdgeStore } from '@/lib/edgestore'
import { useMutation } from 'convex/react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

import { SingleImageDropzone } from '@/components/single-image-dropzone'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'

export const CoverImageModal = () => {
	const params = useParams()
	const update = useMutation(api.documents.update)
	const coverImage = useCoverImage()
	const { edgestore } = useEdgeStore()

	const [file, setFile] = useState<File>()
	const [isSubmiting, setIsSubmiting] = useState(false)

	const onClose = () => {
		setFile(undefined)
		setIsSubmiting(false)
		coverImage.onClose()
	}

	const onChange = async (file?: File) => {
		if (file) {
			setIsSubmiting(true)
			setFile(file)

			const res = await edgestore.publicFiles.upload({
				file,
				options: {
					replaceTargetUrl: coverImage.url,
				},
			})

			await update({
				id: params.documentId as Id<'documents'>,
				coverImage: res.url,
			})

			onClose()
		}
	}

	return (
		<Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
			<DialogContent>
				<DialogHeader>
					<h2 className='text-center text-lg font-semibold'>Cover image</h2>
				</DialogHeader>
				<SingleImageDropzone
					className='w-full outline-none'
					disabled={isSubmiting}
					value={file}
					onChange={onChange}
				/>
			</DialogContent>
		</Dialog>
	)
}
