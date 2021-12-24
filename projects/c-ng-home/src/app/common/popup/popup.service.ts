import {
    FlexibleConnectedPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayRef,
} from '@angular/cdk/overlay'
import {
    ComponentPortal,
    ComponentType,
} from '@angular/cdk/portal'
import {Injectable, InjectionToken, StaticProvider, Injector, OnDestroy} from '@angular/core'
import {Subscription} from 'rxjs'

export interface PopupConfig<T, D> {
    readonly target: Element
    readonly component: ComponentType<T>
    readonly token: InjectionToken<string>
    readonly data: D
}

@Injectable()
export class PopupService<T> implements OnDestroy {
    public constructor(
        private readonly _overlay: Overlay,
        private readonly _injector: Injector,
    ) {}

    public ngOnDestroy(): void {
        this._subs.unsubscribe()
        this._destroyPanel()
    }

    public show<D>(config: PopupConfig<T, D>): OverlayRef {
        this._targetElement = config.target
        this._attachOverlay<D>(config)
        return this._overlayRef!
    }

    public updatePosition(): void {
      if (!this._overlayRef)
        return
      this._overlayRef.updatePosition()
    }

    public hide(): void {
        this._overlayRef?.detach()
        this._subs.unsubscribe()
    }

    private _subs = new Subscription()
    private _targetElement!: Element
    private _overlayRef?: OverlayRef | null
    private _positionStrategy?: FlexibleConnectedPositionStrategy

    private _attachOverlay<D>(config: PopupConfig<T, D>): void {
        if (!this._overlayRef) {
            this._overlayRef = this._createOverlayRef()
            this._overlayRef.backdropClick().subscribe(() => {
                this.hide()
            })
        } else
            this._positionStrategy?.setOrigin(config.target)

        if (!this._overlayRef || this._overlayRef.hasAttached())
            return

        const component = config.component
        const providers: StaticProvider[] =[
          {provide: OverlayRef, useValue: this._overlayRef},
          {provide: config.token, useValue: config.data},
        ]

        const injector = Injector.create({
          parent: this._injector,
          providers,
        })
        const portal = new ComponentPortal(component, undefined, injector)
        this._overlayRef.attach(portal)
    }

    private _createOverlayRef(): OverlayRef {
        const config = new OverlayConfig()
        this._positionStrategy = config.positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(this._targetElement)
            .withFlexibleDimensions(false)
            .withPush(false)
            .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                },
            ])
        config.scrollStrategy = this._overlay.scrollStrategies.reposition()
        return this._overlay.create(config)
    }

    private _destroyPanel(): void {
        if (this._overlayRef) {
            this.hide()
            this._overlayRef.dispose()
            // tslint:disable-next-line: no-null-keyword
            this._overlayRef = null
        }
    }
}
