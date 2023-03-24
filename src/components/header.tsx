import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '../../context/auth';
import Sidebar from './sidebar';
import UserMenu from './user-menu';
import { Bars3Icon } from '@heroicons/react/24/solid';

const Header = () => {
	const { user, isLoading } = useAuth();
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

	if (isLoading) {
		return null;
	}

	const closeModal = () => {
		setIsSidebarOpen(false);
	};

	const openModal = () => {
		setIsSidebarOpen(true);
	};

	return (
		<>
			<header className='relative z-10'>
				<div className='flex items-center h-14 border-b container'>
					<button className='p-2 mr-2' onClick={openModal}>
						<Bars3Icon className='w-6 h-6' />
					</button>
					<Link href='/'>
						<Image src='/logo.svg' width={160} height={32} alt='Logoipsum' />
					</Link>
					<span className='flex-1' />
					{user && (
						<Link href='/create-post' className='mr-4'>
							投稿
						</Link>
					)}
					{user ? <UserMenu /> : <Link href='/login'>ログイン</Link>}
				</div>
			</header>
			<Sidebar isOpen={isSidebarOpen} closeModal={closeModal} />
		</>
	);
};

export default Header;
