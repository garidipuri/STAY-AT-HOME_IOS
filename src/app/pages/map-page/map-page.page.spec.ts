import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapPagePage } from './map-page.page';

describe('MapPagePage', () => {
  let component: MapPagePage;
  let fixture: ComponentFixture<MapPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
