import { CustomElement } from '../aurelia.js';
import { IArticleListState } from '../state.js';

export const ArticleList = CustomElement.define({
  name: 'article-list',
  template: `
    <div class="article-preview" if.bind="$articleList.items.length === 0">
      No articles are here... yet.
    </div>

    <div repeat.for="article of $articleList.items" class="article-preview" data-e2e="article-\${article.slug}">
      <let author.bind="article.author"></let>
      <div class="article-meta">
        <a href="/profile/\${author.username}"><img src.bind="author.image" /></a>
        <div class="info">
          <a href="/profile/\${author.username}" class="author">\${author.username}</a>
          <span class="date">\${article.createdAt | date}</span>
        </div>
        <button class="btn btn-sm pull-xs-right \${article.favorited ? 'btn-primary' : 'btn-outline-primary'}"
          click.delegate="toggleFavorite(article.slug)" data-e2e="toggleFavoriteBtn">
          <i class="ion-heart"></i>
          \${article.favoritesCount}
        </button>
      </div>

      <a href="/article/\${article.slug}" class="preview-link">
        <h1>\${article.title}</h1>
        <p>\${article.description}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          <li repeat.for="tag of article.tagList" class="tag-default tag-pill tag-outline">\${tag}</li>
        </ul>
      </a>
    </div>

    <nav if.bind="$articleList.pages.length > 1">
      <ul class="pagination">
        <li repeat.for="page of $articleList.pages" class="page-item" active.class="page === $articleList.currentPage"
          click.delegate="setPage(page)" data-e2e="page-\${page}Link">
          <a class="page-link">\${page}</a>
        </li>
      </ul>
    </nav>
  `,
}, class {
  static get inject() { return [IArticleListState]; }

  constructor($articleList) {
    this.$articleList = $articleList;
  }

  async toggleFavorite(slug) {
    await this.$articleList.toggleFavorite(slug);
  }

  async setPage(page) {
    const params = this.$articleList.params;
    await this.$articleList.load(params.clone({
      offset: params.limit * (page - 1),
    }));
  }
})
