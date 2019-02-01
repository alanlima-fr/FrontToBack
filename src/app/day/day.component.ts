import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../menu';
import { DayService } from '../services/day.service';
import { MenuService } from '../services/menu.service';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { Order } from '../order';
import { User } from '../user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  days: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  currentDay: number = new Date().getDay();
  currentDayInLetter: string = this.days[this.currentDay - 1];
  // activeDay: string = "Jeudi";
  activeDay: string = this.currentDayInLetter
  activeDayInNumber: number =  this.days.indexOf(this.activeDay);

  @Input() day: string;

  menus: Menu[];
  keys: string[];
  orderMenu: Menu[];
  user: User[]

  constructor(private menuService:MenuService ,private userService:UserService, private orderService:OrderService, private router:Router) {
  }

  ngOnInit() {
    console.log(this.currentDay);
    if( this.currentDay === 6 || 0) {
      this.activeDay = 'Lundi'
      this.activeDayInNumber = this.days.indexOf('Lundi')
    }
    this.getMenuByDay(this.activeDay)
  }

  changeDay(day) {
    this.activeDay = day
    this.activeDayInNumber = this.days.indexOf(day);
    this.getMenuByDay(day)
  }

  Order(key: string) {
    this.menuService.getMenuByKey(key).subscribe(data => {
      console.log(data);
      
      this.orderMenu = data
      this.userService.getUserByKey("-LT7EJHxqq4Zycn7lX36").subscribe( data => {
        console.log(data)
        this.user = data
        console.log(this.user)
        console.log(this.orderMenu)
        let hour = "12h30"
        let order: Order = {
          menu: this.orderMenu,
          user: this.user,
          hour: hour,
          price: 7
        }
        console.log(order);
        
        this.orderService.addOrder(order).subscribe( data => {
          this.router.navigate([`./`])
        })
      })
    });

  }

  getMenuByDay(day: string)
  {
    this.menuService.getMenuByDay(day).subscribe(data =>{

      
      this.menus = Object.values(data);
      this.keys = Object.keys(data)
      console.log(data);
      
      console.log(this.menus);
      console.log(this.keys);
      
      
    })
  }
}
