import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoesCardComponent } from './components/shoes-card/shoes-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarMenuComponent } from './components/navbar-menu/navbar-menu.component';
import { BannerComponent } from './components/banner/banner.component';
import { AllNewComponent } from './pages/all-new/all-new.component';
import { BestSellerComponent } from './pages/best-seller/best-seller.component';
import { CategoryComponent } from './pages/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './pages/search/search.component';
import { AllProductComponent } from './pages/all-product/all-product.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ShoesPageComponent } from './pages/shoes-page/shoes-page.component';
import { CartCardComponent } from './components/cart-card/cart-card.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { CardOrderProductComponent } from './components/card-order-product/card-order-product.component';
import { ConfermaOrdineComponent } from './pages/conferma-ordine/conferma-ordine.component';
import { NavbarPaymentComponent } from './components/navbar-payment/navbar-payment.component';
import { SliderComponent } from './components/slider/slider.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfiniteScrollComponent } from './pages/infinite-scroll/infinite-scroll.component';
import { DeliveryPipePipe } from './pipes/delivery-pipe.pipe';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { OrdiniComponent } from './pages/ordini/ordini.component';
import { ManageShoesComponent } from './pages/manage-shoes/manage-shoes.component';
import { RegisterDbFormComponent } from './components/register-db-form/register-db-form.component';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ShoesCardComponent,
    NavbarComponent,
    NavbarMenuComponent,
    BannerComponent,
    AllNewComponent,
    BestSellerComponent,
    CategoryComponent,
    SearchComponent,
    AllProductComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    ShoesPageComponent,
    CartCardComponent,
    CartPageComponent,
    PagamentoComponent,
    CardOrderProductComponent,
    ConfermaOrdineComponent,
    NavbarPaymentComponent,
    SliderComponent,
    FooterComponent,
    InfiniteScrollComponent,
    DeliveryPipePipe,
    AuthComponent,
    AuthFormComponent,
    RegisterFormComponent,
    OrdiniComponent,
    ManageShoesComponent,
    RegisterDbFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
