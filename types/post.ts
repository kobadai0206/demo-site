export type Post = {
	id: string;
	title: string;
	body: string;
	cretedAt: number;
	updatedAt: number | null;
	authorId: string;
};
