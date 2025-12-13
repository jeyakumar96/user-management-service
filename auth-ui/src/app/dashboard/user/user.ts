import { Component } from '@angular/core';
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";

@Component({
  selector: 'app-user',
  imports: [Header, Footer],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {

}
