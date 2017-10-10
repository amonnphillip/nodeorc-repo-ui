import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class NodeorcRepoService {
  private hostUrl: string;
  constructor(private http: Http) {
    this.hostUrl = 'http://localhost:4001'; // TODO: THIS SHOULD COME FROM A CONFIG
  }
  async uploadFile(body): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.http.post(this.hostUrl + '/uploadfile', body).subscribe((data) => {
        if (data && data.status === 200) {
          resolve(true);
        } else {
          reject(new Error('Unexpected status from call to /upload'));
        }
      }, (err) => {
        if (err && err.status === 404) {
          resolve(false);
        } else {
          reject(err);
        }
      });
    });
  }
  async getState(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.http.post(this.hostUrl + '/state', {
      }).subscribe((data) => {
        if (data && data.status === 200) {
          resolve(data.json());
        } else {
          reject(new Error('Unexpected status from call to /state'));
        }
      }, (err) => {
        if (err && err.status === 404) {
          resolve(new Error('Back end service is not available'));
        } else {
          reject(err);
        }
      });
    });
  }
  async checkFileExists(fileName: string): Promise<boolean|any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.hostUrl + '/fileexists', {
        fileName: fileName
      }).subscribe((data) => {
        if (data && data.status === 200) {
          resolve(true);
        } else {
          reject(new Error('Unexpected status from call to /checkfilenameavailable'));
        }
      }, (err) => {
        if (err && err.status === 404) {
          resolve(false);
        } else {
          reject(err);
        }
      });
    });
  }
}
