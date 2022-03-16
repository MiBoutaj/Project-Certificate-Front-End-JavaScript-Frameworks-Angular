import { Component, OnInit,Inject  } from '@angular/core';
import { LeaderService } from '../service/leader.service';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

leaders : Leader[];

  constructor( private leadersevice : LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.leadersevice.getLeaders().subscribe(leaders => this.leaders =leaders);
  }

}
