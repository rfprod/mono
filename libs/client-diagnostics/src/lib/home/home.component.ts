import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppMarkdownService } from '@mono/client-services';
import { TIMEOUT } from '@mono/client-util';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of, timer } from 'rxjs';
import { first, map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-diagnostics-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomeComponent {
  public readonly timer$ = timer(TIMEOUT.INSTANT, TIMEOUT.MEDIUM).pipe(
    map(num => `Until destroyed ${num}`),
    untilDestroyed(this),
  );

  public readonly markedInstructions$ = of('').pipe(
    first(),
    map(() => {
      const sidenavInstruction =
        'Open **sidenav** by clicking the **icon** button in the left corner of the browser window, and select an item.';
      const markdownInstructions = '# You can use Markdown \n\n via AppMarkdownService, just like in this example.';
      return this.markdown.process(`${sidenavInstruction}\n${markdownInstructions}`);
    }),
  );

  constructor(private readonly markdown: AppMarkdownService) {}
}
