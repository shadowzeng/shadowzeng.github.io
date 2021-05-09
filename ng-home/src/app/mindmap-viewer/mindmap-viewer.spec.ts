import {ComponentFixture, TestBed} from '@angular/core/testing'

import {MindmapViewerComponent} from './mindmap-viewer'

describe('MindmapViewerComponent', () => {
  let component: MindmapViewerComponent
  let fixture: ComponentFixture<MindmapViewerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MindmapViewerComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MindmapViewerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
