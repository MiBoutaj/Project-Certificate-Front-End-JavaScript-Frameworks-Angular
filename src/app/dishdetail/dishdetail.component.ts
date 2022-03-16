import { Component, OnInit ,Inject, ViewChild} from '@angular/core';
import { Dish } from '../shared/dish';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../service/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';
import { Comment } from '../shared/comment';
import { visiblty } from '../animations/app.animations';
import { flyInOut,expand  } from '../animations/app.animations';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visiblty(),
    expand()
    ]
})
export class DishdetailComponent implements OnInit {


 feedbackForm:FormGroup;
 feedback:Feedback;
 @ViewChild('fform') feedbackFormDirective:NgForm;

  dish:Dish;
  dishIds:string[];
  prev:string;
  next:string;
  commen: Comment;
  errMess:string;
  dishcopy: Dish;
 visibilty ='shown';
   dateCo=Date.now();

  formErrors = {
    'author': '',
    'comment': ''
  };


  validationMessages = {
    'author': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
   
  };


  constructor( private dishservice : DishService,
    private route : ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) {
      this.createForm();
     }

  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) =>{this.visibilty='hidden';return this.dishservice.getDish(params['id']);}))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id);  this.visibilty = 'shown'; },
      errmess => this.errMess = <any>errmess);
  }

  createForm():void{

 this.feedbackForm=this.fb.group({

  author:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
 
  comment:['',[Validators.required, Validators.minLength(1), Validators.maxLength(25)] ],
  
  rating:5,
  date: Date.now()


 });
 this.feedbackForm.valueChanges
 .subscribe(data => this.onValueChanged(data));

this.onValueChanged(); // (re)set validation messages now




  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field]='';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  

  onSubmit(){
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
  this.dishcopy.comments.push(this.feedbackForm.value);
  this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish == null; this.dishcopy == null; this.errMess = <any>errmess; });
  

    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      author:'',
      comment:'',
      rating: '',
      date: ' '

    });
   
    this.dishIds.push(this.dish.comments=this.feedbackForm.value);
    
    this.feedbackForm.clearAsyncValidators;
 


  }
}
