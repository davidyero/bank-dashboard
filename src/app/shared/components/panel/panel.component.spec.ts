import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelComponent} from './panel.component';
import {RouterTestingModule} from '@angular/router/testing';
import Swal from 'sweetalert2';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PanelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    spyOn(Swal, 'fire');
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When showModal is invoked', () => {
    it('Should showModal', () => {
      component.showModal();

      expect(Swal.fire).toHaveBeenCalled();
    });
  });
});
