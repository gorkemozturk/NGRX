import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { UpsertComponent } from './components/upsert/upsert.component';
import { EffectsModule } from '@ngrx/effects';
import { RoomEffect } from 'src/app/effects/room.effect';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'new',
    component: UpsertComponent
  },
  {
    path: ':id/edit',
    component: UpsertComponent
  }
];

@NgModule({
  declarations: [UpsertComponent, IndexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([RoomEffect])
  ]
})
export class RoomModule { }
