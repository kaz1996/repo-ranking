import { EventEmitter } from 'events';

export default class RankingModel extends EventEmitter {
  constructor(firstDateOfWeek) {
    super();
    this.firstDateOfWeek = firstDateOfWeek;
    this.additionalProperty = '';
  }

  async getRepositories() {
    const topTenRepositories = [];
    try {
      const repositories = await this.fetchRepository();
      for (let i = 0; i < 10; i += 1) {
        if (repositories.items[i] === undefined) break;
        const repositoryInfo = {
          name: repositories.items[i].full_name,
          description: repositories.items[i].description,
          language: repositories.items[i].language,
          starCount: repositories.items[i].stargazers_count,
          forksCount: repositories.items[i].forks,
          createdAt: repositories.items[i].created_at,
          url: repositories.items[i].html_url,
        };
        topTenRepositories.push(repositoryInfo);
      }
    } catch (error) {
      console.error(error);
    }
    return topTenRepositories;
  }

  fetchRepository() {
    const url = `https://api.github.com/search/repositories?q=+created:>=${this.firstDateOfWeek}${this.additionalProperty}&sort=stars&order=desk`;
    return fetch(url).then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
      }
      return response.json();
    });
  }

  setAdditionalProperty(property, value) {
    this.additionalProperty = `+${property}:${value}`;
    this.emitChange();
  }

  onChange(listener) {
    this.addListener('change', listener);
  }

  offChange(listener) {
    this.removeListener('change', listener);
  }

  emitChange() {
    this.emit('change');
  }
}
