import { Component } from './Component.js';

export class Tooltip extends Component {
  constructor(tooltipText, hostElementId, closeNotifierFunction) {
    super(hostElementId);
    this.text = tooltipText;
    this.closeNotifier = closeNotifierFunction;
    this.createTooltip();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  createTooltip() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.appendChild(tooltipBody);

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.offsetHeight;
    const parentElScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 15;
    const y = hostElPosTop + hostElHeight - parentElScrolling - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px';
    tooltipElement.style.top = y + 'px';

    tooltipElement.addEventListener('click', this.closeTooltip);
    this.element = tooltipElement;
  }
}
