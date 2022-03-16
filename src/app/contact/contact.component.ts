import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProsessHTTPMsgService } from '../service/prosess-httpmsg.service';
import { Observable, of } from 'rxjs';
import { FeedbackService } from '../service/feedback.service';
import { trigger,state,style,animate,transition } from '@angular/animations';
import { flyInOut,expand,visiblty } from '../animations/app.animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  
    animations: [
      flyInOut(),
      expand(),
      visiblty() ]
})
export class ContactComponent implements OnInit {

  visibility = 'shown';
  feed:boolean;
  feedbackForm: FormGroup;
  feedback: Feedback | null;
  contactType = ContactType;
  formHideBool!:boolean;
  spinnerHideBool!:boolean;
  errMess!:string;  
  
  @ViewChild('fform') feedbackFormDirective: NgForm;


  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };


  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.feed=true;
  
  }


  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
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
        this.formErrors[field] = '';
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

  onSubmit() {


    this.formHideBool = true;
    this.spinnerHideBool = true;
    this.feedbackService.submitFeedback(this.feedbackForm.value).subscribe(feedback=>{
      this.feedback =feedback;this.spinnerHideBool =false; this.feed=false; setTimeout(() =>{this.feedback=null;this.formHideBool =false; this.feed=true;
      },5000);
    }, errmess=>{this.feedback=null;this.errMess=<any>errmess});
    


  

      this.feedbackForm.reset({
        firstname: '',
        lastname: '',
        telnum: 0,
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
      });
      
    




    this.feedbackFormDirective.resetForm();

  }




}
