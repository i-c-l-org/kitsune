import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostMetadata } from '@/tipos/blog';

// Re-export para manter compatibilidade
export type { Post, PostMetadata };

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Retorna a lista de arquivos .mdx no diretório de posts
 * @returns Array com nomes dos arquivos de posts
 */
async function getPostFiles(): Promise<string[]> {
  try {
    const entries = await fs.promises.readdir(postsDirectory);
    return entries.filter((file) => file.endsWith('.mdx'));
  } catch (err) {
    // Se o diretório não existir ou houver erro de leitura, retornamos
    // lista vazia em vez de propagar exceção.
    return [];
  }
}

/**
 * Faz o parsing de um arquivo de post MDX
 * @param filename - Nome do arquivo a ser parseado
 * @returns Objeto Post com metadados e conteúdo
 */
async function parsePostFile(filename: string): Promise<Post> {
  const slug = filename.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, filename);
  const fileContents = await fs.promises.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: (data['title'] as string) ?? '',
    description: (data['description'] as string) ?? '',
    date: (data['date'] as string) ?? '',
    author: (data['author'] as string) ?? 'I.C.L',
    category: (data['category'] as string) ?? 'Geral',
    tags: (data['tags'] as string[]) ?? [],
    image: data['image'] as string | undefined,
    videoUrl: data['videoUrl'] as string | undefined,
    published: data['published'] !== false,
    content,
    readingTime: calculateReadingTime(content),
  };
}

/**
 * Retorna todos os posts publicados, ordenados por data (mais recentes primeiro)
 * @returns Array de metadados dos posts
 */
export async function getAllPosts(): Promise<PostMetadata[]> {
  const files = await getPostFiles();
  const posts = await Promise.all(
    files.map((filename) => parsePostFile(filename)),
  );
  const published = posts
    .filter((post) => post.published === true)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return published.map(({ ...metadata }) => metadata);
}

/**
 * Busca um post específico pelo slug
 * @param slug - Identificador único do post (nome do arquivo sem extensão)
 * @returns Post completo com conteúdo, ou null se não encontrado
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filename = `${slug}.mdx`;
    const post = await parsePostFile(filename);
    return post.published === true ? post : null;
  } catch {
    return null;
  }
}

/**
 * Retorna o conteúdo completo de um post (alias para getPostBySlug)
 * @param slug - Identificador único do post
 * @returns Post completo com conteúdo, ou null se não encontrado
 * @deprecated Use getPostBySlug diretamente
 */
export async function getPostContent(slug: string): Promise<Post | null> {
  return getPostBySlug(slug);
}

/**
 * Filtra posts por categoria
 * @param category - Nome da categoria
 * @returns Array de posts da categoria especificada
 */
export async function getPostsByCategory(
  category: string,
): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

/**
 * Filtra posts por tag
 * @param tag - Nome da tag
 * @returns Array de posts que contêm a tag especificada
 */
export async function getPostsByTag(tag: string): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

/**
 * Retorna lista única de todas as categorias usadas nos posts
 * @returns Array de categorias em ordem alfabética
 */
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const categories = new Set(allPosts.map((post) => post.category));
  return Array.from(categories).sort();
}

/**
 * Retorna lista única de todas as tags usadas nos posts
 * @returns Array de tags em ordem alfabética
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tags = new Set(allPosts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

/**
 * Calcula o tempo estimado de leitura baseado na contagem de palavras
 * @param content - Conteúdo do post em texto
 * @returns Texto formatado com tempo de leitura (ex: "5 min de leitura")
 */
function calculateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min de leitura`;
}
