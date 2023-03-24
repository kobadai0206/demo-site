import Layout from '@/components/layout';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Settings: NextPageWithLayout = () => {
	return (
		<div className='mt-6 items-center justify-center'>
			<h1>設定画面</h1>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolorum
				quibusdam, magni voluptates provident, laborum temporibus deserunt
				tempore id accusamus quasi? Fugit, obcaecati velit aspernatur corrupti
				unde cupiditate dolore commodi.
			</p>
		</div>
	);
};
Settings.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Settings;
