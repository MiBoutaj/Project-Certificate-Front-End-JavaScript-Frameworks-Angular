import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { DishService } from './service/dish.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; 
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';
import { PromotionService } from './service/promotion.service';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import{ MatSelectModule} from '@angular/material/select';
import{ MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule} from '@angular/common/http'
import { baseURL } from './shared/baseurl';
import { LeaderService } from './service/leader.service';
import { ProsessHTTPMsgService } from './service/prosess-httpmsg.service';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    EmployeeDetailsComponent,
    HighlightDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    NgbModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
   FormsModule,
   ReactiveFormsModule,
   MatSelectModule,
   MatSlideToggleModule,
   MatProgressSpinnerModule,
   MatSliderModule,
   HttpClientModule
  ],
  providers: [
    DishService,
    PromotionService,
    LeaderService,
    PromotionService,
    ProsessHTTPMsgService,
    
    {provide:'BaseURL',useValue:baseURL}
  ],
  entryComponents: [
    LoginComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
