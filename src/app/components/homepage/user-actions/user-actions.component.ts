import {Component, OnInit} from '@angular/core';
import {UserActionsService} from '@app/_services/api/user-actions.service';
import {AuthenticationService} from '@app/_services/api/authentication';
import {Action} from '@app/_models';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {
  userActions: Action[];

  constructor(private userActionService: UserActionsService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    const userId = this.authenticationService.currentUserValue?.id;
    this.userActionService
      .getUserActions(userId)
      ?.subscribe((actions) => {
        this.userActions = actions;
      });
  }

  formatTokenChange(tokenChange): string {
    return `${tokenChange > 0 ? '+' : ''}${tokenChange.toFixed(2)}`;
  }
}
