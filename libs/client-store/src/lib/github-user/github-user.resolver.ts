import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { IGithubUserOrganization, IGithubUserPublicEvent, IGithubUserRepo, IGuthubUser } from './github-api.interface';
import { IUserConfig } from './github-user.config';
import { AppGithubUserService } from './github-user.service';

interface ICombinedGithubData {
  userConfig: IUserConfig;
  github: IGuthubUser;
  githubOrgs: IGithubUserOrganization[];
  publicEvents: IGithubUserPublicEvent<unknown>[];
  githubRepos: IGithubUserRepo[];
}

@Injectable({
  providedIn: 'root',
})
export class AppGithubUserResolver implements Resolve<Observable<ICombinedGithubData>> {
  constructor(private readonly github: AppGithubUserService) {}

  public resolve() {
    return this.github.getUserData();
  }
}
