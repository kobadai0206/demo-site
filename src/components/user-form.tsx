import Button from '@/components/button';
import classNames from 'classnames';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/auth';
import { db, storage } from '../../firebase/client';
import { User } from '../../types/user';
import { useDropzone } from 'react-dropzone';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import AvatarEditor from 'react-avatar-editor';
import ImageSelecter from './image-selecter';
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadString,
} from 'firebase/storage';

const UserForm = ({ isEditMode }: { isEditMode: boolean }): any => {
	const { isLoading, fbUser, user } = useAuth();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		control,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<User>();

	useEffect(() => {
		if (isEditMode && user) {
			reset(user);
		}
	}, [isEditMode, user, reset]);

	if (isLoading) {
		return true;
	}

	if (!fbUser) {
		router.push('/login');
		return null;
	}

	const submit = async (data: User) => {
		if (data.avatarURL?.match(/^data:/)) {
			const imageRef = ref(storage, `users/${fbUser.uid}/avatar`);
			await uploadString(imageRef, data.avatarURL, 'data_url');
			data.avatarURL = await getDownloadURL(imageRef);
		}

		if (!data.avatarURL && user?.avatarURL) {
			const imageRef = ref(storage, `users/${fbUser.uid}/avatar`);
			await deleteObject(imageRef);
		}

		const documentRef = doc(db, `users/${fbUser.uid}`);
		return setDoc(documentRef, data).then(() => {
			alert(isEditMode ? '更新しました' : 'ユーザー作成しました');
			if (!isEditMode) {
				router.push('/');
			}
		});
	};

	return (
		<div className='container'>
			{isEditMode ? 'プロフィール編集' : 'アカウント作成'}

			<form onSubmit={handleSubmit(submit)} className='space-y-6'>
				<div>
					<h2>プロフィール画像</h2>
					<ImageSelecter name='avatarURL' control={control} />
				</div>
				<div>
					<label className='block mb-0.5' htmlFor='name'>
						名前*
					</label>
					<input
						className={classNames(
							'rounded border',
							errors.name ? 'border-red-500' : 'border-slate-300'
						)}
						{...register('name', {
							required: '必須入力です',
							maxLength: {
								value: 50,
								message: '最大50文字です',
							},
						})}
						id='name'
						name='name'
						type='text'
					/>
					{errors.name && (
						<p className='text-red-500 mt-0.5'>{errors.name?.message}</p>
					)}
				</div>

				<div>
					<label className='block mb-0.5' htmlFor='nickname'>
						ニックネーム*
					</label>
					<input
						autoComplete='off'
						className={classNames(
							'rounded border',
							errors.nickname ? 'border-red-500' : 'border-slate-300'
						)}
						{...register('nickname', {
							required: '入力必須です',
							maxLength: {
								value: 50,
								message: '最大50文字です',
							},
						})}
						id='nickname'
						name='nickname'
						type='text'
					/>
					{errors.nickname && (
						<p className='text-red-500 mt-0.5'>{errors.nickname?.message}</p>
					)}
				</div>

				<div>
					<label className='block mb-0.5' htmlFor='profile'>
						プロフィール*
					</label>
					<textarea
						className={classNames(
							'rounded border',
							errors.profile ? 'border-red-500' : 'border-slate-300'
						)}
						{...register('profile', {
							required: '入力必須です',
							maxLength: {
								value: 255,
								message: '最大255文字です',
							},
						})}
						name='profile'
						id='profile'
					/>
					<p className='text-sm text-slate-400 leading-none'>
						{watch('profile')?.length || 0}/255
					</p>
					{errors.profile && (
						<p className='text-red-500 mt-0.5'>{errors.profile?.message}</p>
					)}
				</div>

				<Button disabled={isSubmitting}>
					{isEditMode ? '更新' : 'アカウント作成'}
				</Button>
			</form>
		</div>
	);
};

export default UserForm;
