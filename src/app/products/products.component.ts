import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, DOCUMENT, NgClass, NgFor, NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastrService } from 'ngx-toastr';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from "@dchtools/ngx-loading-v18";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Product } from './product';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { AddBtnComponent } from "../components/add-btn/add-btn.component";


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    NgFor,
    CurrencyPipe,
    MatRadioModule,
    FormsModule,
    InputTextModule,
    NgxLoadingModule,
    NgClass,
    InputGroupModule,
    InputGroupAddonModule,
    DialogModule,
    ButtonModule,
    ProductDetailsComponent,
    AddBtnComponent,
    NgIf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  indexNum!:number
  products: any[] = [];
  categories: any[] = [];
  categoryLabel!:string;
  prices:any[] = [];
  sort!:string
  wishList:any[] = []
  liked:boolean = false
  allProducts:any[] = []
  productDesc:Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  };
  public loading = false;
  public config = {
    animationType: ngxLoadingAnimationTypes.circleSwish, // Animation type
    backdropBackgroundColour: 'rgba(0, 0, 0, 0.6)', // Backdrop color
    primaryColour: '#fff', // Primary spinner color
    secondaryColour: '#ccc', // Secondary spinner color
    tertiaryColour: '#f5f5f5', // Tertiary spinner color
    fullScreenBackdrop: true
  };
  @ViewChild('searchInput') searchInput: any;
  isSidenavOpen = false;
  isOverMode = false;
  visible: boolean = false;

  constructor(private ProductsService: ProductsService,private toastr:ToastrService,@Inject(DOCUMENT) document: Document,private breakpointObserver: BreakpointObserver,private cdr: ChangeDetectorRef) {
    const localStore = document.defaultView?.localStorage;
    if (localStore) {
      this.wishList = JSON.parse(localStore?.getItem('Wishlist')!) || [];
    }
  }

  showDialog(index: number) {
    this.visible = true;
    let product = this.products?.find((item:any) => item.id == index)
    this.productDesc = product
    console.log(this.productDesc)
    this.cdr.detectChanges();
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.breakpointObserver.observe(['(max-width: 1024px)']).subscribe(result => {
      this.isOverMode = result.matches;
      this.isSidenavOpen = !this.isOverMode;
    });
    this.getAllProducts();
    this.getCategories();
  }

  searchProducts(event: any) {
    const searchQuery = event.target.value?.toLowerCase() || '';
    this.products = searchQuery
      ? this.allProducts.filter((item: any) =>
          item.title?.toLowerCase().includes(searchQuery)
        )
      : this.allProducts;
  }

  isInWishList(productId: number): boolean {
    return this.wishList?.some(item => item?.item?.id === productId) ?? false;
  }

  addToWishlist(index: number) {
    let list = localStorage.getItem('Wishlist')
    if(list != null) {
      console.log(JSON.parse(list!));
      this.wishList = JSON.parse(list!)
    }
    let temp = this.wishList?.find((item:any) => item?.item?.id == index)
    if(temp){
      this.wishList.splice(this.wishList.indexOf(temp),1)
      localStorage.setItem('Wishlist',JSON.stringify(this.wishList))
    }else{
      let product = this.products?.find((item:any) => item.id == index)
      this.wishList?.push({item:product,liked:true})
      localStorage.setItem('Wishlist',JSON.stringify(this.wishList))
    }
  }
  getAllProducts(){
    this.loading = true
    this.ProductsService.getAllProducts().subscribe({
      next: (res: any) => {
        this.loading = false
        this.products = res;
        this.prices = res.price
        this.allProducts = this.products
      },
      error: (err: any) => {
        this.loading = false
        console.log(err);
      },
    });
  }
  getCategories() {
    this.ProductsService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getProductsByCategories(categoryLabel: any) {
    this.loading = true
    this.ProductsService.getProductsByCategory(
      categoryLabel
    ).subscribe({
      next: (response) => {
        this.loading = false
        this.products = [];
        this.products = response;
        this.allProducts = this.products
        this.searchInput.nativeElement.value = ''
        if(this.sort != '') {
          this.sortByPrice()
        }
      },
      error: (error) => {
        this.loading = false
        console.log(error);
      },
    });
  }
  sortByPrice() {
    switch (this.sort) {
      case "low": {
        this.products.sort((low, high) => low.price - high.price)
        break;
      }
      case "high": {
        this.products.sort((low, high) => high.price - low.price)
        break;
      }
    }
  }
  clearFilter(){
    this.products = []
    this.sort = ''
    this.categoryLabel = ''
    this.getAllProducts()
    this.searchInput.nativeElement.value = ''
  }
}
