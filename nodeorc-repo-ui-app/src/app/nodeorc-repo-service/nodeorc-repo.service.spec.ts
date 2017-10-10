import { TestBed, inject } from '@angular/core/testing';

import { NodeorcRepoService } from './nodeorc-repo.service';

describe('NodeorcRepoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeorcRepoService]
    });
  });

  it('should be created', inject([NodeorcRepoService], (service: NodeorcRepoService) => {
    expect(service).toBeTruthy();
  }));
  it('should be able to check file names on the server', inject([NodeorcRepoService], async (service: NodeorcRepoService) => {
    const available = await service.checkFileExists('example.aci');
    expect(available).toEqual(true);
  }));
});
