export class PaginationModel {
  public readonly itemsPerPage: number;
  public _maxItems: number;
  private _maxPages: number;
  private _currentPage: number;
  private _previousButtonDisabled: boolean;
  private _nextButtonDisabled: boolean;
  private _pageIndexes: number[];
  private readonly _maxIndexes: number;
  constructor(maximumItems: number) {
    this._currentPage = 0;
    this._maxItems = maximumItems;
    this.itemsPerPage = 5;
    this._maxIndexes = 8;

    this.maximumItems = maximumItems;
    this.configureButtons();
  }
  get maxPages(): number {
    return this._maxPages;
  }
  get currentPage(): number {
    return this._currentPage;
  }
  set currentPage(index: number) {
    this._currentPage = index;
    this.configureButtons();
  }
  get previousButtonDisabled(): boolean {
    return this._previousButtonDisabled;
  }
  get nextButtonDisabled(): boolean {
    return this._nextButtonDisabled;
  }
  get pageIndexes(): number[] {
    return this._pageIndexes;
  }
  set maximumItems(maxItems: number) {
    this._maxItems = maxItems;

    const d = this._maxItems / this.itemsPerPage;
    this._maxPages = Math.floor(d);
    if (d % this.itemsPerPage > 0) {
      this._maxPages ++;
    }

    this.configureButtons();
  }
  private configureButtons() {
    this._previousButtonDisabled = this._currentPage === 0;
    this._nextButtonDisabled = this._currentPage + 1 >= this.maxPages;

    this._pageIndexes = [];
    this._pageIndexes.push(this.currentPage);

    if (this._maxItems > 0) {
      let max = 1;
      let min = 1;
      let done = false;
      while (!done ) {
        let limits = 0;
        if (this.currentPage + max < this.maxPages &&
          this._pageIndexes.length < this._maxIndexes) {
          this._pageIndexes.push(this.currentPage + max);
          max ++;
        } else {
          limits ++;
        }

        if (this.currentPage - min >= 0 &&
          this._pageIndexes.length < this._maxIndexes) {
          this._pageIndexes.unshift(this.currentPage - min);
          min ++;
        } else {
          limits ++;
        }

        if (this._pageIndexes.length >= this._maxIndexes ||
          limits === 2) {
          done = true;
        }
      }
    }
  }
  public nextPage() {
    if (this._currentPage + 1 < this.maxPages) {
      this._currentPage ++;
    }
  }
  public previousPage() {
    if (this._currentPage > 0) {
      this._currentPage --;
    }
  }
}
