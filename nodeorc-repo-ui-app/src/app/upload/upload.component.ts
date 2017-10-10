import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NodeorcRepoService } from '../nodeorc-repo-service/nodeorc-repo.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {
  @ViewChild('imagefile') fileInput;
  public checkingFileName: boolean;
  public fileChosen: boolean;
  public chosenFileNameIsAvailable: boolean;
  constructor(private http: Http,
              private nodeorcRepoService: NodeorcRepoService,
              private route: ActivatedRoute,
              private router: Router) {
    this.checkingFileName = false;
    this.fileChosen = false;
    this.chosenFileNameIsAvailable = true;
  }
  ngOnInit() {
  }
  async fileChange(files) {
    this.fileChosen = true;
    this.checkingFileName = true;
    if (await this.nodeorcRepoService.checkFileExists(files[0].name) === true) {
      this.chosenFileNameIsAvailable = false;
    } else {
      this.chosenFileNameIsAvailable = true;
    }
    this.checkingFileName = false;
  }
  async uploadFile() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('imagefile', fileBrowser.files[0]);
      const headers = new Headers();
      const options = new RequestOptions({
        headers: headers,
      });
      if (await this.nodeorcRepoService.uploadFile(formData) === true) {
        this.chosenFileNameIsAvailable = false;
        this.router.navigate(['/dashboard']);
      } else {
        this.chosenFileNameIsAvailable = true;
      }
    }
  }
}
