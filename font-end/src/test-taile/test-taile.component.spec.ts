import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTaileComponent } from './test-taile.component';

describe('TestTaileComponent', () => {
  let component: TestTaileComponent;
  let fixture: ComponentFixture<TestTaileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTaileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
