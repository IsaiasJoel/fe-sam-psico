import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApexOptions } from 'ng-apexcharts';
import { Subject } from 'rxjs';
import { DASHBOARD_DATA } from './dashboard.data';
import { DTODataDashboard } from './dashboard.models';
import { configPuntos, configTorta } from './dashboard.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  chartCasosAtendidos: ApexOptions | any = {};
  chartRangoEdades: ApexOptions | any = {};
  chartMayoriaEdad: ApexOptions | any = {};
  chartDiagnosticoPreventivo: ApexOptions | any = {};
  chartNacionalidad: ApexOptions | any = {};

  data: DTODataDashboard;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    // private _dashboardService: DashboardService,
    private _router: Router
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the data
    this.data = DASHBOARD_DATA;
    this._prepareChartData();
    // this._dashboardService.data$
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((data) => {

    //     // Store the data

    //     // Prepare the chart data
    //   });

    // Attach SVG fill fixer to all ApexCharts
    window['Apex'] = {
      chart: {
        events: {
          mounted: (chart: any, options?: any): void => {
            this._fixSvgFill(chart.el);
          },
          updated: (chart: any, options?: any): void => {
            this._fixSvgFill(chart.el);
          }
        }
      }
    };
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Fix the SVG fill references. This fix must be applied to all ApexCharts
   * charts in order to fix 'black color on gradient fills on certain browsers'
   * issue caused by the '<base>' tag.
   *
   * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
   *
   * @param element
   * @private
   */
  private _fixSvgFill(element: Element): void {
    // Current URL
    const currentURL = this._router.url;

    // 1. Find all elements with 'fill' attribute within the element
    // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
    // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
    Array.from(element.querySelectorAll('*[fill]'))
      .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
      .forEach((el) => {
        const attrVal = el.getAttribute('fill');
        el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
      });
  }

  /**
   * Prepare the chart data from the data
   *
   * @private
   */
  private _prepareChartData(): void {
    this.chartCasosAtendidos = configPuntos(this.data.casosAtendidos.labels, this.data.casosAtendidos.series);
    this.chartRangoEdades = configTorta(this.data.rangoEdades.labels, this.data.rangoEdades.series);
    this.chartMayoriaEdad = configTorta(this.data.comparacionMayoriaEdad.labels, this.data.comparacionMayoriaEdad.series);
    this.chartDiagnosticoPreventivo = configTorta(this.data.comparacionDiagnosticoPreventivo.labels, this.data.comparacionDiagnosticoPreventivo.series);
    this.chartNacionalidad = configTorta(this.data.comparacionNacionalidad.labels, this.data.comparacionNacionalidad.series);
  }
}
