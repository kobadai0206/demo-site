import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

const links = [
	{
		label: 'ホーム',
		href: '/',
	},
	{
		label: '検索',
		href: '/search',
	},
	{
		label: 'このサイトについて',
		href: '/about',
	},
];

const subItems = [
	{
		label: '会社概要',
		href: '/cpmpany',
	},
	{
		label: '利用規約',
		href: '/terms',
	},
	{
		label: 'プライバシーポリシー',
		href: '/privacy',
	},
	{
		label: 'サポート',
		href: '/support',
	},
	{
		label: 'お問い合わせ',
		href: '/contact',
	},
	{
		label: 'ヘルプ',
		href: '/help',
	},
];

const Sidebar = ({
	isOpen,
	closeModal,
}: {
	isOpen: boolean;
	closeModal: VoidFunction;
}) => {
	const router = useRouter();

	useEffect(() => {
		router.events.on('routeChangeStart', closeModal);
		return () => router.events.off('routeChangeStart', closeModal);
	});

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='fixex z-10 inset-0' onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed left-0 inset-y-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 -translate-x-full'
								enterTo='opacity-100 translate-x-0'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 translate-x-0'
								leaveTo='opacity-0 -translate-x-full'>
								<Dialog.Panel className='w-80 fixed left-0 inset-y-0 bg-white p-6 z-20 overflow-y-auto'>
									<Link href='/' className='mb-6 items-center block'>
										<Image
											src='/logo.svg'
											width={160}
											height={32}
											alt='Logoipsum'
										/>
									</Link>
									<ul className='space-y-3'>
										{links.map((link) => (
											<li key={link.label}>
												<Link
													href={link.href}
													className='py-1 inline-block hover:text-blue-500'>
													{link.label}
												</Link>
											</li>
										))}
									</ul>
									<hr className='my-6' />
									<ul className='space-y-4'>
										{subItems.map((item) => (
											<li key={item.label}>
												<Link href={item.href}>{item.label}</Link>
											</li>
										))}
									</ul>
									<p className='text-slate-400 mt-6'>© kobadai .</p>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Sidebar;
