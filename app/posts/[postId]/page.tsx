import React, { cache } from 'react'
import { notFound } from 'next/navigation';
import { getFormatedDate } from '@/lib/getFormatedDate';
import Link from 'next/link';
import { getPostByName, getPostsMeta } from '@/lib/posts';
import 'highlight.js/styles/github-dark.css'

export const revalidate = 86400;

type Props = {
	params: {
		postId: string,
	}
}

export const generateStaticParams = async () => {
	const posts = await getPostsMeta();

	if(!posts) return [];

	return posts.map(post => ({
		postId: post.id
	}));
}

export const generateMetadata = async ({params: { postId }}: Props) => {
	const post = await getPostByName(`${postId}.mdx`); 

	if(!post) {
		return {
			title: `Post not found`
		}
	}

	const { meta: { title } } = post;

	return {
		title: `${title}`,
		desription: `${title} page`
	}
}

const PostPage = cache( async ({params: { postId }}: Props) => {
	const post = await getPostByName(`${postId}.mdx`); //deduped by cache


	if(!post) {
		notFound();
	}

	const { meta: { date, id, tags, title }, content } = post;

	const pubDate = getFormatedDate(date);
	const tagsLinks = tags.map((tag, i) => (
		<Link key={i} href={`/tags/${tag}`}>{tag}</Link>
	))

	return (
		<>
			<h1 className="text-3xl mt-4 mb-0">{title}</h1>
			<p className="mt-0 text-sm">
				{pubDate}
			</p>
			<article>
				{content}
			</article>
			<section>
				<h3>Related: </h3>
				<div className="flex flex-row gap-4">
					{tagsLinks}
				</div>
			</section>
			<p className='mb-10'>
				<Link href="/">← Back to home</Link>
			</p>
		</>
	)
});

export default PostPage;