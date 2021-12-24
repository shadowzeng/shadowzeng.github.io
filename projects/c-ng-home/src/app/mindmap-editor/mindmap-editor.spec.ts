import {ComponentFixture, TestBed} from '@angular/core/testing'

import {MindmapEditorComponent} from './mindmap-editor'

describe('MindmapEditorComponent', () => {
  let component: MindmapEditorComponent
  let fixture: ComponentFixture<MindmapEditorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MindmapEditorComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MindmapEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
