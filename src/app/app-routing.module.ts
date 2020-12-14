import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuideComponent } from './views/guide/guide.component';
import { ListingComponent } from './views/listing/listing.component';


const routes: Routes = [
  {
    path: '',
    component: ListingComponent
  },
  {
    path: 'guide',
    component: GuideComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
