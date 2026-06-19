export interface PostModel {
    _id: string
    title: string
    slug: string
    excerpt: string
    content: string
    coverImage: string
    images: string[]
    author: Author
    published: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export interface Author {
    _id: string
    email: string
}
