import { DomHelper } from '../Utilities/DomHelper.js';
// !! Static Import
// import { Tooltip } from './Tooltip.js';

export class ProjectItem {
  hasActiveTooltip = false;

  constructor(projectId, updateProjectListsFunction, type) {
    this.id = projectId;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectDrag();
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  async showMoreInfoHandler() {
    if (this.hasActiveTooltip) return;
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;

    // !! Dynamic Import
    const module = await import('./Tooltip.js');

    const tooltip = new module.Tooltip(tooltipText, this.id, () => {
      this.hasActiveTooltip = false;
    });
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectDrag() {
    const item = document.getElementById(this.id);

    item.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });

    item.addEventListener('dragend', (event) => {
      console.log(event);
    });
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      'button:first-of-type'
    );
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
    switchBtn = DomHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFunction, type) {
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectSwitchButton(type);
  }
}
