import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../services/contact.service';
import {MessageService} from '../../message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  FormData: FormGroup;

  constructor(private builder: FormBuilder, private contact: ContactService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      comment: new FormControl('', [Validators.required])
    });
  }

  onSubmit(FormData) {
    console.log(FormData);
    this.contact.PostMessage(FormData)
      .subscribe(response => {
        this.FormData.reset();
        this.messageService.addSuccess('Your comment have been successfully sent!');
        console.log(response);
      }, error => {
        console.warn(error.responseText);
        console.log({error});
      });
  }
}
