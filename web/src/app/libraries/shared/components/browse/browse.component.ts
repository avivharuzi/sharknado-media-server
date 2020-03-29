import { Component, OnInit } from '@angular/core';

import { Browse } from '../../browse';
import { BrowsePath } from '../../browse-path';
import { BrowseService } from '../../browse.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  path: string;

  browseRoot: Browse;
  browseCurrent: Browse;
  currentBrowseRootPath: BrowsePath;
  currentPath: BrowsePath;
  historyPaths: BrowsePath[];

  constructor(
    private browseService: BrowseService,
  ) {
    this.historyPaths = [];
    this.path = '';
  }

  ngOnInit(): void {
    this.browseService.getBrowseRoot().subscribe(browseRoot => {
      this.browseRoot = browseRoot;

      if (browseRoot.paths.length > 0) {
        this.updateBrowseCurrent(browseRoot.paths[0]);
      }
    });
  }

  updateBrowseCurrent(browsePath: BrowsePath, isBack: boolean = false): void {
    this.path = browsePath.path;
    this.currentPath = browsePath;

    if (this.isCurrentPathBelongToBrowseRoot()) {
      this.historyPaths = [browsePath];
      this.currentBrowseRootPath = browsePath;
    } else if (!isBack) {
      this.historyPaths.push(browsePath);
    }

    this.browseService.getBrowse(browsePath.key).subscribe(deeperBrowse => {
      this.browseCurrent = deeperBrowse;
    });
  }

  isCurrentPathBelongToBrowseRoot(): boolean {
    return this.browseRoot.paths.includes(this.currentPath);
  }

  back(): void {
    this.historyPaths.pop();
    const path = this.historyPaths[this.historyPaths.length - 1];
    this.updateBrowseCurrent(path, true);
  }
}
