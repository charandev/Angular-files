import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material";
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [

    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatDialogModule,
    Material.MatExpansionModule,
    Material.MatListModule,
    Material.MatSidenavModule,
    Material.MatCardModule,
    Material.MatTooltipModule,
    ScrollingModule
  ],
  exports: [
    Material.MatToolbarModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatDialogModule,
    Material.MatExpansionModule,
    Material.MatListModule,
    Material.MatSidenavModule,
    Material.MatCardModule,
    Material.MatTooltipModule,
    Material.MatGridListModule,
    ScrollingModule
  ],
  declarations: []
})
export class MaterialModule { }
