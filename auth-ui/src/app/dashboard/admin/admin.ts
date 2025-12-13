import { Component } from '@angular/core';
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";

@Component({
  selector: 'app-admin',
  imports: [Header, Footer],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {

}
