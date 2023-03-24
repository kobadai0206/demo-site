import Button from '@/components/button';
import Layout from '@/components/layout';
import React, { ReactElement } from 'react';
import { login, logout } from '../../lib/auth';
import { NextPageWithLayout } from './_app';

const LoginPage: NextPageWithLayout = () => {
	return (
		<div className='mt-6 items-center justify-center flex'>
			<Button type='button' onClick={login}>
				ログインする
			</Button>
		</div>
	);
};
LoginPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default LoginPage;
