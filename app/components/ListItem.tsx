import { getFormatedDate } from '@/lib/getFormatedDate';
import Link from 'next/link';
import React from 'react'

type Props = {
	post: Meta
}

export default function ListItem({post}: Props) {
	const { id, title, date } = post;

	const formattedDate = getFormatedDate(date);

	return (
		<li className='mt4 text-2xl dark:text-white/90'>
			<Link 
				className="underline hover:text-black-70 dark:hover:text-white"
				href={`/posts/${id}`}
			>
				{title}
			</Link>
			<p className="text-sm mt-1">{formattedDate }</p>
		</li>
	)
}