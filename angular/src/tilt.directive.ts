import { Directive, ElementRef, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Tiltō, type TiltOptions } from '@jojovms/tilt-card-core';

@Directive({
    selector: '[tilt]'
})
export class TiltDirective implements OnInit, OnDestroy, OnChanges {
    @Input('tilt') options: TiltOptions = {};
    private tiltInstance: Tiltō | null = null;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        this.initTilt();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.tiltInstance) {
            this.tiltInstance.destroy();
            this.initTilt();
        }
    }

    private initTilt() {
        this.tiltInstance = new Tiltō(this.el.nativeElement, this.options);
    }

    ngOnDestroy() {
        if (this.tiltInstance) {
            this.tiltInstance.destroy();
        }
    }
}
