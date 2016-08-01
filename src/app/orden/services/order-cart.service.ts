import { Injectable } from '@angular/core';
import { Order }     from '../../core/order';

@Injectable()
export class OrderCartService {

  order:Order;
  
  constructor() {
  	this.order = new Order();
  }

}
