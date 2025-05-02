import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModprimengModule } from './modprimeng.module';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModprimengModule, AvatarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent {
  title = 'shoponline_cpg';
  constructor(private messageService: MessageService) { }
  visible: boolean = false;


  show() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'El mensaje de Toast CPG' });
  }
  clear() {
    this.messageService.clear();
  }
  showTopLeft() {
    this.messageService.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', key: 'tl', life: 3000 });
  }
  showBottomRight() {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', key: 'br', life: 3000 });
  }

  showConfirm() {
    if (!this.visible) {
      this.messageService.add({ key: 'confirm', sticky: true, severity: 'success', summary: 'Can you send me the report?' });
      this.visible = true;
    }
  }

  onConfirm() {
    this.messageService.clear('confirm');
    this.visible = false;
  }

  onReject() {
    this.messageService.clear('confirm');
    this.visible = false;
  }

}

