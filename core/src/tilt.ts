export interface TiltOptions {
    max?: number;      // max tilt rotation (deg)
    perspective?: number; // transform perspective (px)
    scale?: number;    // zoom on hover
    glare?: boolean;   // enable glare effect
    glareMaxOpacity?: number;
}

export class Tilto {
    private element: HTMLElement;
    private options: TiltOptions;
    private glareElement: HTMLElement | null = null;
    private bounds: DOMRect | null = null;

    constructor(target: string | HTMLElement, options: TiltOptions = {}) {
        this.element = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target;
        this.options = {
            max: 15,
            perspective: 1000,
            scale: 1.05,
            glare: false,
            glareMaxOpacity: 0.5,
            ...options
        };

        if (this.element) {
            this.init();
        }
    }

    private init() {
        this.element.style.transformStyle = 'preserve-3d';
        this.element.style.transform = `perspective(${this.options.perspective}px)`;

        if (this.options.glare) {
            this.addGlare();
        }

        this.element.addEventListener('mouseenter', this.onMouseEnter);
        this.element.addEventListener('mousemove', this.onMouseMove);
        this.element.addEventListener('mouseleave', this.onMouseLeave);
    }

    private addGlare() {
        this.glareElement = document.createElement('div');
        this.glareElement.style.position = 'absolute';
        this.glareElement.style.top = '0';
        this.glareElement.style.left = '0';
        this.glareElement.style.width = '100%';
        this.glareElement.style.height = '100%';
        this.glareElement.style.overflow = 'hidden';
        this.glareElement.style.pointerEvents = 'none';
        this.glareElement.style.borderRadius = getComputedStyle(this.element).borderRadius;

        const glareInner = document.createElement('div');
        glareInner.style.position = 'absolute';
        glareInner.style.top = '50%';
        glareInner.style.left = '50%';
        glareInner.style.pointerEvents = 'none';
        glareInner.style.backgroundImage = 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)';
        glareInner.style.width = '200%';
        glareInner.style.height = '200%';
        glareInner.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        glareInner.style.opacity = '0';
        glareInner.style.transition = 'opacity 300ms';

        this.glareElement.appendChild(glareInner);
        this.element.appendChild(this.glareElement);
    }

    private onMouseEnter = () => {
        this.bounds = this.element.getBoundingClientRect();
        this.element.style.transition = 'none';
        if (this.glareElement?.firstChild) {
            (this.glareElement.firstChild as HTMLElement).style.transition = 'opacity 100ms';
        }
    };

    private onMouseMove = (e: MouseEvent) => {
        if (!this.bounds) return;

        const x = e.clientX - this.bounds.left;
        const y = e.clientY - this.bounds.top;

        const xPct = x / this.bounds.width;
        const yPct = y / this.bounds.height;

        const max = this.options.max || 15;

        // Calculate rotation
        // center is (0.5, 0.5). range is -0.5 to 0.5
        const rX = (0.5 - yPct) * max * 2; // Tilt X is based on Y position
        const rY = (xPct - 0.5) * max * 2; // Tilt Y is based on X position

        this.element.style.transform = `
      perspective(${this.options.perspective}px)
      rotateX(${rX}deg)
      rotateY(${rY}deg)
      scale3d(${this.options.scale}, ${this.options.scale}, ${this.options.scale})
    `;

        if (this.options.glare && this.glareElement?.firstChild) {
            const glare = this.glareElement.firstChild as HTMLElement;
            const angle = Math.atan2(e.clientX - (this.bounds.left + this.bounds.width / 2), -(e.clientY - (this.bounds.top + this.bounds.height / 2))) * (180 / Math.PI);

            const dist = Math.sqrt(Math.pow((xPct - 0.5), 2) + Math.pow((yPct - 0.5), 2)) * 2; // 0 to 1 roughly

            glare.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
            glare.style.opacity = (dist * (this.options.glareMaxOpacity || 0.5)).toString();
        }
    };

    private onMouseLeave = () => {
        this.element.style.transition = 'transform 300ms ease-out';
        this.element.style.transform = `perspective(${this.options.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

        if (this.options.glare && this.glareElement?.firstChild) {
            const glare = this.glareElement.firstChild as HTMLElement;
            glare.style.opacity = '0';
            glare.style.transition = 'opacity 300ms';
        }
    };

    public destroy() {
        this.element.removeEventListener('mouseenter', this.onMouseEnter);
        this.element.removeEventListener('mousemove', this.onMouseMove);
        this.element.removeEventListener('mouseleave', this.onMouseLeave);
        if (this.glareElement) this.glareElement.remove();
    }
}
