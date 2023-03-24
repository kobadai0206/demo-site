import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const links = [
	{
		label: 'ホーム',
		path: '/',
	},
	{
		label: '記事検索',
		path: '/search',
	},
	{
		label: '設定',
		path: '/settings',
	},
];

const Footer = () => {
	return (
		<footer className='bg-slate-100 py-10 border-t mt-10'>
			<div className='container'>
				<div className='mb-6'>
					<Link href='/'>
						<Image src='/logo.svg' width={160} height={32} alt='Logoipsum' />
					</Link>
				</div>
				<div className='mb-6'>
					<ul className='space-y-2'>
						{links.map((link) => (
							<li key={link.label}>
								<Link className='hover:text-blue-500' href={link.path}>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<p className='text-slate-500'>© 2023 kobadai.</p>
			</div>
		</footer>
	);
};

export default Footer;
