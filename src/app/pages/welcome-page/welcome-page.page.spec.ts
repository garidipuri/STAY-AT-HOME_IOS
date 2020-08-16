import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WelcomePagePage } from './welcome-page.page';

describe('WelcomePagePage', () => {
  let component: WelcomePagePage;
  let fixture: ComponentFixture<WelcomePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomePagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
