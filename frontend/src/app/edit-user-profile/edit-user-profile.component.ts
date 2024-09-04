import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.scss',
})
export class EditUserProfileComponent implements OnInit{
  ngOnInit(): void {
  }

  profile = {
    name: '',
    image: null as string | ArrayBuffer | null
  };

  constructor(private location: Location,
              private messageService: MessageService) {}

  onSubmit() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully.' });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        this.profile.image = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  goBack() {
    this.location.back();
  }
}
