import { useState } from 'react';
import GenericList from '../../components/genericList';

interface Article {
  id: number;
  title: string;
  description: string;
}

export default function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);

  const handleAdd = (article: Omit<Article, 'id'>) => {
    const newArticle = { ...article, id: Date.now() };
    setArticles([...articles, newArticle]);
  };

  const handleUpdate = (id: number, updatedArticle: Omit<Article, 'id'>) => {
    setArticles(articles.map(article => article.id === id ? { ...updatedArticle, id } : article));
  };

  const handleDelete = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <GenericList
      items={articles}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      itemType="Artigo"
    />
  );
}

