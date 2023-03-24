import Layout from '@/components/layout';
import UserForm from '@/components/user-form';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Profile: NextPageWithLayout = () => {
	return <UserForm isEditMode={true} />;
};

Profile.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Profile;
