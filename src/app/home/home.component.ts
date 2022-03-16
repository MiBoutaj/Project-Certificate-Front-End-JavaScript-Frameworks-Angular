import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../service/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../service/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../service/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader :Leader;
  dishErrMess:string;

   constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservive : LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void { 
    this.dishservice.getFeaturedDish().subscribe((dish) => this.dish = dish,
    errmess => this.dishErrMess=<any>errmess);
     this.promotionservice.getFeaturedPromotion().subscribe((promotion) => this.promotion = promotion);
    this.leaderservive.getLeaderDish().subscribe((leader) =>  this.leader= leader);
  }

}


