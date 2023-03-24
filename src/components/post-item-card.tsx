import { format } from 'date-fns';
import Link from 'next/link';
import { useUser } from '../../hooks/user';
import { Post } from '../../types/post';

const PostItemCard = ({ post }: { post: Post }) => {
	const user = useUser(post.authorId);

	return (
		<div className='rounded-md shadow p-4'>
			<h2 className='line-clamp-2'>
				<Link href={`posts/${post.id}`}>{post.title}</Link>
			</h2>
			{user && (
				<div className='flex items-center'>
					<img
						src={user?.avatarURL}
						alt='avatarImage'
						className='w-8 h-8 rounded-full block mr-2'
					/>

					<div>
						{user && <p className='trancate'>{user.name}</p>}
						<p className='text-slate-500 text-am'>
							{format(post.cretedAt, 'yyyy/MM/dd')}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostItemCard;
