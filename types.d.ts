type Meta = {
	id: string,
	date: string,
	title: string,
	tags: string[],
}

type BlogPost = {
	meta: Meta,
	content: ReactElement<any, string | JSXElementConstructor<any>>,
}