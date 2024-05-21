import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AllNewComponent } from './pages/all-new/all-new.component';
import { BestSellerComponent } from './pages/best-seller/best-seller.component';
import { CategoryComponent } from './pages/category/category.component';
import { SearchComponent } from './pages/search/search.component';
import { AllProductComponent } from './pages/all-product/all-product.component';
import { ShoesPageComponent } from './pages/shoes-page/shoes-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { ConfermaOrdineComponent } from './pages/conferma-ordine/conferma-ordine.component';
import { InfiniteScrollComponent } from './pages/infinite-scroll/infinite-scroll.component';
import { AuthComponent } from './pages/auth/auth.component';
import { OrdiniComponent } from './pages/ordini/ordini.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
{
  path:'',
  redirectTo:'home-page',
  pathMatch:'full'
},
{
  path:'home-page',
  component:HomePageComponent
},
{
  path:'New',
  component: AllNewComponent
},
{
  path:'best-seller',
  component:BestSellerComponent
},
{
  path:'category/:productCategory',
  component: CategoryComponent
},
{
  path:'search/:searchText',
  component: SearchComponent
},
{
  path:'all-product',
  component: AllProductComponent
},
{
  path:'shoes-page/:productId',
  component:ShoesPageComponent
},
{
  path:'cart',
  component:CartPageComponent
},
{
  path:'payment',
  component: PagamentoComponent
},
{
  path:'order',
  component:ConfermaOrdineComponent
},
{
  path:'infinite',
  component:InfiniteScrollComponent
},
{
  path:'login',
  component:AuthComponent
},
{
  path:'ordini',
  component:OrdiniComponent, canActivate:[authGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
