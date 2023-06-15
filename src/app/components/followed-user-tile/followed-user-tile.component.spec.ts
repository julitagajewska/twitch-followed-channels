import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedUserTileComponent } from './followed-user-tile.component';

describe('FollowedUserTileComponent', () => {
  let component: FollowedUserTileComponent;
  let fixture: ComponentFixture<FollowedUserTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowedUserTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowedUserTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
