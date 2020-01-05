import moment from 'moment';
import { element } from './html-util';

export default class RankingView {
  createElement(topTenRepositories) {
    const repositoriesContainer = element`<div class="repositories" />`;
    topTenRepositories.forEach((repository) => {
      const article = element`
        <article class="repository repositories__repository">
          <h1 class="repositry__title">${repository.name}</h1>
          <p class="repositry__description">
            ${repository.description ? repository.description : 'No description'}
          </p>
          <div class="sub-content">
            <div class="info">
              <span class="info__language">
                ${repository.language !== null ? repository.language : ''}
              </span>
              <span class="info__star">
                <i class="fa fa-star"></i>
                ${repository.starCount}
              </span>
              <span class="info__fork">
                <i class="fa fa-code-branch"></i>
                ${repository.forksCount}
              </span>
              <span class="info__publish-date">
                ${moment(repository.createdAt).format('dddd, MMMM Do YYYY')}
              </span>
            </div>
            <a class="sub-content__link" href="${repository.url}" target="_blank">
              Githubで見る
            </a>
          </div>
        </article>
        `;
      repositoriesContainer.appendChild(article);
    });
    return repositoriesContainer;
  }

  closeMenu() {
    const langMenu = document.querySelector('#js-lang-menu');
    const frameMenu = document.querySelector('#js-frame-menu');
    langMenu.removeAttribute('open');
    frameMenu.removeAttribute('open');
  }

  changeLabel(property, value) {
    const otherProperty = property === 'language' ? 'topic' : 'language';
    const label = document.querySelector(`#js-${property}-label`);
    const otherLabel = document.querySelector(`#js-${otherProperty}-label`);
    label.textContent = value;
    otherLabel.textContent = 'Any';
  }
}
