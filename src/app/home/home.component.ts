import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Modules } from '../shared/appTypes';
import { Router } from '@angular/router';
import { AppAssetsService } from '../core/services/app-assets.service';
import { AppAsset } from '../core/models/app-asset';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.provider = AuthProvider.EmailAndPassword;
    // using destructuring to get the element from an array
    // let [firstElem] = array
    this.assetService
      .getAppAsset('room-module-pic')
      .valueChanges()
      .subscribe((data) => {
        const [firstElem] = data;
        this.asset = firstElem as AppAsset;

      });
  }

  login(event) {
    this.auth.user = {
      uid: event.uid,
      displayName: event.displayName,
      email: event.email,
    };
  }

  redirectToModule(module: Modules) {
    this.router.navigate([module]);
  }
}
