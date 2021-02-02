import { HostListener } from '@angular/core';
import { Directive, EventEmitter, Output, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  constructor() { }

  @Output() fileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') private background = '#ffffff';

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#e2eefd';
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#ffffff'
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#ffffff';
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
