import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesUploadComponent } from './files-upload.component';

describe('FileuploadComponent', () => {
  let component: FilesUploadComponent;
  let fixture: ComponentFixture<FilesUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
