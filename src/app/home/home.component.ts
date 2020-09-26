import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Modules } from '../shared/appTypes';
import { Router } from '@angular/router';
import { AppAssetsService } from '../core/services/app-assets.service';
import { AppAsset } from '../core/models/app-asset';
import { ErrorLogService } from '../core/services/error-log.service';
import { ErrorLog } from '../core/models/error-log';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  provider: AuthProvider;
  appearance: MatFormFieldAppearance = 'outline';
  orLabelText = '';
  titleText = 'Please Login';
  asset: AppAsset;

  constructor(
    public auth: AuthService,
    private assetService: AppAssetsService,
    private router: Router,
    private errorLogService?: ErrorLogService
  ) {}

  ngOnInit() {
    this.provider = AuthProvider.EmailAndPassword;
    try {
      // using destructuring to get the element from an array
      // let [firstElem] = array
      this.assetService
        .getAppAsset('room-module-pic')
        .valueChanges()
        .subscribe(
          (data) => {
            const [firstElem] = data;
            this.asset = firstElem as AppAsset;
          },
          (error) => { this.handleError(error);}
        );
    } catch (error) {
      this.handleError(error);
    }
  }

  onLoggedIn(event) {
    this.auth.user = {
      uid: event.uid,
      displayName: event.displayName,
      email: event.email,
    };
  }

  redirectToModule(module: Modules) {
    this.router.navigate([module]);
  }

  private handleError(error: any) {
    const errlog: ErrorLog = {
      name: 'HomeComponent',
      dateCreated: new Date().toString(),
      fileName: error.fileName,
      lineNumber: error.lineNumber,
      message: error.message,
    };

    if (this.errorLogService) {
      this.errorLogService.logError(errlog);
    }
  }
}
