import { Component, OnInit } from '@angular/core';
import { NodeorcRepoService } from '../nodeorc-repo-service/nodeorc-repo.service';
import { PaginationModel } from '../models/pagination.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  private pagination: PaginationModel;
  private files: any;
  private filesThisPage: any;
  constructor(private nodeorcRepoService: NodeorcRepoService) {
    this.files = new Array();
    this.filesThisPage = new Array();
    this.pagination = new PaginationModel(0);
  }
  async ngOnInit() {
    await this.getStatus();
  }
  async getStatus() {
    this.files = await this.nodeorcRepoService.getState();
    this.pagination.maximumItems = this.files.length;
    this.collateFilesThisPage();
  }
  collateFilesThisPage() {
    this.filesThisPage = new Array();
    let index = this.pagination.currentPage * this.pagination.itemsPerPage;
    while (index < this.files.length && this.filesThisPage.length < this.pagination.itemsPerPage) {
      this.filesThisPage.push(this.files[index]);
      index ++;
    }
  }
  onPaginationIndex(index) {
    this.pagination.currentPage = index;
    this.collateFilesThisPage();
  }
  onPaginationPrev() {
    this.pagination.previousPage();
    this.collateFilesThisPage();
  }
  onPaginationNext() {
    this.pagination.nextPage();
    this.collateFilesThisPage();
  }
}
