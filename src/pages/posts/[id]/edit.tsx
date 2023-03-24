import Layout from '@/components/layout';
import PostForm from '@/components/post-form';
import { NextPageWithLayout } from '@/pages/_app';
import React, { ReactElement } from 'react';

const EditPage: NextPageWithLayout = () => {
	return (
		<div className='container'>
			<PostForm isEditMode />
		</div>
	);
};

EditPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default EditPage;
