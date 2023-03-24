import UserForm from '../components/user-form';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';
import Layout from '@/components/layout';

const CreateAccount: NextPageWithLayout = () => {
	return <UserForm isEditMode={false} />;
};

CreateAccount.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default CreateAccount;
