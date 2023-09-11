import { Directive, ElementRef, HostBinding, HostListener, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{

    @HostBinding('class.open') isOpen= false;

    @HostListener('document:click', ['$event']) toggleOpen(){
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    // code was updated to allow dropdown to be closed if user clicks anywhere else in the page.
    
    constructor(private elRef: ElementRef){}
}