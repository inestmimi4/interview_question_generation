import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseComponent } from './Response.component';

describe('AnswerComponent', () => {
  let component: ResponseComponent;
  let fixture: ComponentFixture<ResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
