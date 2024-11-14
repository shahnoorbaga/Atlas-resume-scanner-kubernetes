import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeUploadComponent } from './resume-upload/resume-upload.component';
import { GraphComponent } from './graph/graph.component';

export const routes: Routes = [
  { path: 'resume-upload', component: ResumeUploadComponent },
  { path: 'graph', component: GraphComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {  }
