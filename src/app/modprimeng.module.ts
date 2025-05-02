import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { MegaMenuModule } from 'primeng/megamenu';
import { ToolbarModule } from 'primeng/toolbar';
import {CardModule} from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';




const mismodulos: any = [
 ButtonModule,
 InputTextModule,
 Ripple,
 ToastModule,
 MegaMenuModule,
 ToolbarModule,
 CardModule,
 ToastModule,
 DialogModule,
 TableModule 
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    mismodulos,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    mismodulos
  ]
})
export class ModprimengModule { }
