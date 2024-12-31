import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './guards/auth.guard';
import { signedGuard } from './guards/signed.guard';
import { WishlistComponent } from './wishlist/wishlist.component';

export const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'contacts',component:ContactComponent},
  {path:'products',component:ProductsComponent},
  {path:'login',canActivate:[signedGuard],component:LoginComponent},
  {path:'register',canActivate:[signedGuard],component:RegisterComponent},
  {path:'cart',canActivate:[authGuard],component:CartComponent},
  {path:'wishlist',canActivate:[authGuard],component:WishlistComponent},
  {path : '**' , redirectTo : 'home'},
];
