import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WelcomeSelectionPagePage } from './welcome-selection-page.page';

describe('WelcomeSelectionPagePage', () => {
  let component: WelcomeSelectionPagePage;
  let fixture: ComponentFixture<WelcomeSelectionPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeSelectionPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeSelectionPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
