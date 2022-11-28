import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfesorAsistenciaNfcPage } from './profesor-asistencia-nfc.page';

describe('ProfesorAsistenciaNfcPage', () => {
  let component: ProfesorAsistenciaNfcPage;
  let fixture: ComponentFixture<ProfesorAsistenciaNfcPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesorAsistenciaNfcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorAsistenciaNfcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
