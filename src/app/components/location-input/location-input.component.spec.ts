import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationInputComponent } from './location-input.component';

describe('LocationInputComponent', () => {
  let component: LocationInputComponent;
  let fixture: ComponentFixture<LocationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationInputComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
