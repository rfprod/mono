import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IGithubUserOrganization } from '@mono/client-store';

/**
 * Application organizations component.
 */
@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPortfolioOrganizationsComponent {
  @Input() public githubOrgs: IGithubUserOrganization[] | null = null;
}
