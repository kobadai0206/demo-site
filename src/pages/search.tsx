import React, {
	Children,
	ReactElement,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
	Configure,
	Hits,
	HitsProps,
	InstantSearch,
	SearchBox,
	SearchBoxProps,
	useInstantSearch,
} from 'react-instantsearch-hooks-web';
import { Post } from '../../types/post';
import { debounce } from 'debounce';
import Button from '@/components/button';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Pagination } from 'react-instantsearch-hooks-web';
import { format } from 'date-fns';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/client';
import { User } from '../../types/user';
import useSWR from 'swr/immutable';
import Link from 'next/link';
import { useUser } from '../../hooks/user';
import Layout from '@/components/layout';
import { NextPageWithLayout } from './_app';
import PostItemCard from '@/components/post-item-card';

const searchClient = algoliasearch(
	'IBVJ0L2CMJ',
	'5247ae5c3ad9eacba10e721e0313d32e'
);

const NoResultsBoundary = ({ children }: { children: ReactNode }) => {
	const { results } = useInstantSearch();

	if (!results.__isArtificial && results.nbHits === 0) {
		return <p>「{results.query}」の検索結果はありませんでした</p>;
	}

	return (
		<div>
			{results.query && (
				<p className='text-sm text-slate-500 my-4'>
					「{results.query}」の検索結果が{results.nbHits}件見つかりました
				</p>
			)}
			{children}
		</div>
	);
};

const Search: NextPageWithLayout = () => {
	const search: SearchBoxProps['queryHook'] = (query, hook) => {
		hook(query);
	};

	return (
		<div className='container'>
			<h1>検索</h1>

			<InstantSearch indexName='posts' searchClient={searchClient}>
				<SearchBox
					classNames={{
						root: 'relative inline-block',
						input: 'rounded-full border-slate-300 pr-10',
						submitIcon: 'hidden',
						resetIcon: 'hidden',
					}}
					submitIconComponent={() => (
						<span className='absolute right-0 p-2 w-10 top-1/2 -translate-y-1/2'>
							<MagnifyingGlassIcon className='w-5 h-5 text-slate-500' />
						</span>
					)}
					queryHook={debounce(search, 500)}
				/>
				<Configure />
				<NoResultsBoundary>
					<Hits<Post>
						classNames={{
							list: 'space-y-4 my-6',
						}}
						hitComponent={({ hit }) => <PostItemCard post={hit} />}
					/>
					<Pagination
						classNames={{
							list: 'flex space-x-3',
							link: 'py-1 px-3 block',
							disabledItem: 'opacity-40',
							selectedItem: 'text-blue-500',
						}}
					/>
				</NoResultsBoundary>
			</InstantSearch>
		</div>
	);
};

Search.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Search;
