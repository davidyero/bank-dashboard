import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA, Injectable} from '@angular/core';
import {CONSTANTS} from '../../shared/constants/constants';

@Injectable()
export class DummyProvider {
  constructor() {}
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: CONSTANTS.ROUTES.DASHBOARD, component: DummyProvider}
      ])],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  afterAll(() => {
    fixture = null;
    component = null;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('When validateLogin is invoked', () => {
    it('return true', () => {
      sessionStorage.setItem('username', 'Julian');

      const validation = component.validateLogin();

      expect(validation).toBeTruthy();
    });
  });
});
