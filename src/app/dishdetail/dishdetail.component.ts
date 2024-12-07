import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Comment } from '../shared/comment';
import { visibility, expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  standalone: false,

  templateUrl: './dishdetail.component.html',
  styleUrl: './dishdetail.component.scss',
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
    
})
export class DishdetailComponent {

  @ViewChild('cform') commentFormDirective!: NgForm

  id!: string
  dish!: Dish;
  dishIds!: string[];
  prev!: string;
  next!: string;
  dishCopy!: Dish;

  visibility = 'shown';

  commentForm!: FormGroup;
  comment!: Comment;

  formErrors: Record<string, string> = {
    'author': "",
    'comment': ''

  }

  validatioMessage: Record<any, any> = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required'
    }
  }




  constructor(private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL: string) {
    this.createForm()
  }

  ngOnInit() {
    this.dishService.getDishIds().subscribe((dishIds) => {
      this.dishIds = dishIds; // Ensure dishIds are loaded first
      this.route.params
        .pipe(
          switchMap((params: Params) => {
            this.visibility = 'hidden';
            return this.dishService.getDish(params['id']);
          })
        )
        .subscribe((dish) => {
          this.dish = dish;
          this.dishCopy = dish;
          this.setPrevNext(dish.id); // Call after dishIds is loaded
          this.visibility = 'shown';
        });
    });
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', Validators.required, Validators.min(2), Validators.max(25)],
      rating: [5,],
      comment: ['', Validators.required,],
      date: ['']
    })

    this.commentForm.valueChanges.
      subscribe((data) => this.onValueChanged(data))


    this.onValueChanged()
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; };
    const form = this.commentForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field)
      if (control && control.dirty && !control.valid) {
        const message = this.validatioMessage[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += message[key] + '';
          }
        }
      }
    }
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId)
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length]
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
      .subscribe((dish) => { this.dish = dish; this.dishCopy = dish })
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: '',
      date: ''
    })
    this.commentFormDirective.resetForm();
  }

  formatLabel(value: number): string {
    if (value <= 5) {
      return Math.round(value / 1) + '';
    }

    return `${value}`;

  }
}
