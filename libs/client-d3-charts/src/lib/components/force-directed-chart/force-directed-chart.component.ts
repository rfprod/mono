import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import { WINDOW } from '@mono/client-util';

import { IDrawForceDirectedChartOptions, IForceDirectedChartData } from '../../interfaces/force-directed-chart.interface';
import { drawForceDirectedChart } from '../../util/force-directed-chart.util';

interface IInputChanges {
  data?: SimpleChange | null;
}

@Component({
  selector: 'app-force-directed-chart',
  templateUrl: './force-directed-chart.component.html',
  styleUrls: ['./force-directed-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppForceDirectedChartComponent implements AfterViewInit, OnChanges {
  @Input() public chartId = '0';

  @Input() public data: IForceDirectedChartData = {
    domains: [],
    entities: [],
    links: [],
    nodes: [],
  };

  /**
   * D3 chart view child reference.
   */
  @ViewChild('container') private readonly container?: ElementRef<HTMLDivElement>;

  constructor(@Inject(WINDOW) private readonly win: Window) {}

  private chartOptions() {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const minWidth = 600;
    const modifiers = {
      width: 10,
      height: 20,
    };
    const width = Math.min(minWidth, this.win.innerWidth - modifiers.width) - margin.left - margin.right;
    const height = Math.min(width, this.win.innerHeight - margin.top - margin.bottom - modifiers.height);
    const options: Partial<IDrawForceDirectedChartOptions> = {
      w: width,
      h: height,
      margin: margin,
    };
    return options;
  }

  private drawChart() {
    if (typeof this.container !== 'undefined') {
      const options = this.chartOptions();
      drawForceDirectedChart(this.container, this.data, options);
    }
  }

  /**
   * Draws chart.
   */
  public ngAfterViewInit(): void {
    this.drawChart();
  }

  /**
   * Redraws chart on changes.
   */
  public ngOnChanges(changes: IInputChanges): void {
    const prevData: IForceDirectedChartData | undefined = changes.data?.previousValue;
    const nextData: IForceDirectedChartData | undefined = changes.data?.currentValue;
    if (Boolean(changes.data?.currentValue) && (prevData?.nodes ?? []).length !== (nextData?.nodes ?? []).length) {
      this.drawChart();
    }
  }
}
