import RankingModel from './model/RankingModel';
import { render } from './view/html-util';
import RankingView from './view/RankingView';

export default class App {
  constructor(firstDateOfWeek, repositoryWrapper, closeButtons, langButtons, frameworkButtons) {
    this.repositoryWrapper = repositoryWrapper;
    this.closeButtons = closeButtons;
    this.langButtons = langButtons;
    this.frameworkButtons = frameworkButtons;

    this.rankingModel = new RankingModel(firstDateOfWeek);
    this.rankingView = new RankingView();

    this.handleRepository = this.handleRepository.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleSetAdditionalProperty = this.handleSetAdditionalProperty.bind(this);
  }

  handleMenu() {
    this.rankingView.closeMenu();
  }

  handleSetAdditionalProperty(property, value) {
    this.rankingModel.setAdditionalProperty(property, value);
    this.rankingView.changeLabel(property, value);
  }

  handleRepository() {
    this.handleMenu();
    this.rankingModel.getRepositories().then((topTenRepositories) => {
      const repositoryElement = this.rankingView.createElement(topTenRepositories);
      render(this.repositoryWrapper, repositoryElement);
    });
  }

  mount() {
    // ページがロードされると同時にレポジトリを取得(topicもlanguageも未指定)
    this.handleRepository();

    this.rankingModel.onChange(this.handleRepository);

    this.closeButtons.forEach((closeButton) => {
      closeButton.addEventListener('click', this.handleMenu);
    });

    this.langButtons.forEach((langButton) => {
      langButton.addEventListener('click', () => {
        this.handleSetAdditionalProperty('language', langButton.textContent);
      });
    });

    this.frameworkButtons.forEach((frameworkButton) => {
      frameworkButton.addEventListener('click', () => {
        this.handleSetAdditionalProperty('topic', frameworkButton.textContent);
      });
    });
  }
}
