import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { MegaMenuModule } from 'primeng/megamenu';
import { ToolbarModule } from 'primeng/toolbar';
import {CardModule} from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

const mismodulos: any = [
 ButtonModule,
 InputTextModule,
 Ripple,
 ToastModule,
 MegaMenuModule,
 ToolbarModule,
 CardModule,
 ToastModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    mismodulos
  ],
  exports: [
    mismodulos
  ]
})
export class ModprimengModule { }
