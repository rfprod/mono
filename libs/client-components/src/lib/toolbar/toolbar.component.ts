import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { chatbotActions } from '@mono/client-chatbot-store';
import { AppSidebarState, sidebarUiActions } from '@mono/client-store';
import { IToolbarButton } from '@mono/client-util';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppToolbarComponent {
  @Input() public buttons: IToolbarButton[] = [
    {
      routerLink: [''],
      icon: 'home',
      title: 'Home',
    },
    {
      routerLink: ['info'],
      icon: 'touch_app',
      title: 'API info',
    },
    {
      routerLink: ['chatbot'],
      icon: 'chat',
      title: 'Chat',
    },
  ];

  public readonly sidebarOpened$ = this.store.select(AppSidebarState.getState).pipe(map(state => state.sidebarOpened));

  constructor(public readonly store: Store) {}

  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarUiActions.closeSidebar());
  }

  public sidebarOpenHandler(): void {
    void this.store.dispatch(new sidebarUiActions.openSidebar());
  }

  public toggleChatbot(): void {
    void this.store.dispatch(new chatbotActions.toggle());
  }
}
