import Layout from '@/components/layout';
import PostForm from '@/components/post-form';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const CreatePost: NextPageWithLayout = () => {
	return <PostForm isEditMode={false} />;
};

CreatePost.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default CreatePost;
