'use client'

import useScrollTop from '@/hooks/use-scroll-top'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import Logo from './logo'

import { ModeToggle } from '@/components/mode-toggle'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const Navbar = () => {
	const { isAuthenticated, isLoading } = useConvexAuth()
	const scrolled = useScrollTop()

	return (
		<div
			className={cn(
				'z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6',
				scrolled && 'border-b shadow-sm'
			)}
		>
			<Logo />
			<div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
				{isLoading && <Spinner />}
				{!isAuthenticated && (
					<>
						<SignInButton mode='modal'>
							<Button variant='ghost' size='sm'>
								Log in
							</Button>
						</SignInButton>
						<SignInButton mode='modal'>
							<Button size='sm'>Get Dotion free</Button>
						</SignInButton>
					</>
				)}
				{isAuthenticated && !isLoading && (
					<>
						<Button variant='ghost' asChild>
							<Link href='/documents'>Enter Dotion</Link>
						</Button>
						<UserButton afterSignOutUrl='/' />
					</>
				)}
				<ModeToggle />
			</div>
		</div>
	)
}

export default Navbar
