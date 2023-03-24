import Layout from '@/components/layout';
import { NextPageWithLayout } from '@/pages/_app';
import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useAuth } from '../../../../context/auth';
import { adminDB } from '../../../../firebase/sever';
import { useUser } from '../../../../hooks/user';
import { Post } from '../../../../types/post';

export const getStaticProps: GetStaticProps<{ post: Post }> = async (
	context
) => {
	const snap = await adminDB.doc(`posts/${context.params?.id}`).get();
	const post = snap.data() as Post;
	return {
		props: {
			post,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

const PostDetailPage: NextPageWithLayout<
	InferGetStaticPropsType<typeof getStaticProps>
> = ({ post }) => {
	const user = useUser(post?.authorId);
	const { fbUser } = useAuth();
	const isAuthor = fbUser?.uid === post?.authorId;

	if (!post) {
		return <p>記事が存在しません</p>;
	}

	return (
		<div className='container'>
			<Link href='/search'>Search</Link>
			<div className='aspect-video bg-slate-200 mb-4 rounded-md'></div>
			<h1 className='font-bold mb-2 text-lg'>{post.title}</h1>
			{user && (
				<div className='flex mb-4'>
					<div className='w-10 h-10 mr-2 bg-slate-400 rounded-full'></div>
					<div className='flex-1'>
						<p>{user.name}</p>
						<p className='text-slate-500'>
							{format(post.cretedAt, 'yyyy/MM/dd')}
						</p>
					</div>
				</div>
			)}
			<p>{post.body}</p>
			{isAuthor && (
				<Link className='text-slate-500' href={`/posts/${post.id}/edit`}>
					編集
				</Link>
			)}
		</div>
	);
};

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default PostDetailPage;
