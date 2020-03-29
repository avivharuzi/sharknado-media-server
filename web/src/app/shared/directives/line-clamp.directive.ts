import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appLineClamp]',
})
export class LineClampDirective implements AfterViewInit {
  @Input() private readonly ellipsis: string;
  @Input() private readonly lines: number;

  private htmlElement: HTMLElement;
  private text: string;

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: InjectionToken<object>,
  ) {
    this.lines = 1;
    this.ellipsis = '...';
  }

  private static truncateTextNodeByCharacter(textNode: ChildNode, rootElement: HTMLElement,
                                             maxHeight: number, ellipsisCharacter: string,
  ): boolean {
    let textContent = textNode.textContent;
    let length = textContent.length;

    while (length > 1) {
      textContent = textContent.substring(0, length - 1).replace(/[ .,;!?'‘’“”\-–—]+$/, '');

      length = textContent.length;
      textNode.textContent = textContent + ellipsisCharacter;

      if (rootElement.scrollHeight <= maxHeight) {
        return true;
      }
    }

    return false;
  }

  private static truncateTextNode(textNode: ChildNode, rootElement: HTMLElement,
                                  maximumHeight: number, ellipsisCharacter: string,
  ): boolean {
    let lastIndexOfWhitespace: number;
    let textContent = textNode.textContent;

    while (textContent.length > 1) {
      lastIndexOfWhitespace = textContent.lastIndexOf(' ');

      if (lastIndexOfWhitespace === -1) {
        break;
      }

      textNode.textContent = textContent.substring(0, lastIndexOfWhitespace);

      if (rootElement.scrollHeight <= maximumHeight) {
        textNode.textContent = textContent;
        break;
      }

      textContent = textNode.textContent;
    }

    return LineClampDirective.truncateTextNodeByCharacter(textNode, rootElement, maximumHeight, ellipsisCharacter);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.htmlElement = this.elementRef.nativeElement;
      this.text = (this.htmlElement.textContent || '').trim();
      this.clamp();
    }
  }

  truncateElementNode(element: ChildNode, rootElement: HTMLElement, maxHeight: number, ellipsisCharacter: string): boolean {
    const childNodes: NodeListOf<ChildNode> = element.childNodes;
    let i = childNodes.length - 1;

    while (i > -1) {
      const childNode: ChildNode = childNodes[i--];

      if ((childNode.nodeType === 1 && this.truncateElementNode(childNode, rootElement, maxHeight, ellipsisCharacter)) ||
        (childNode.nodeType === 3 &&
          LineClampDirective.truncateTextNode(
            childNode,
            rootElement,
            maxHeight,
            ellipsisCharacter,
          ))
      ) {
        return true;
      }

      element.removeChild(childNode);
    }

    return false;
  }

  private clamp(): void {
    this.htmlElement.style.cssText = 'overflow:hidden;overflow-wrap:break-word;word-wrap:break-word';

    const maxHeight = (this.lines || 1) * parseInt(window.getComputedStyle(this.htmlElement).lineHeight, 10);

    if (this.htmlElement.scrollHeight <= maxHeight) {
      return;
    }

    this.truncateElementNode(this.htmlElement, this.htmlElement, maxHeight, this.ellipsis);
  }
}
