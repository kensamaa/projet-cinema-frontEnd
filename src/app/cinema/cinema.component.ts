import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CinemaService } from '../services/cinema.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes;
  public cinemas;
  public currentville;
  public currentCinema;
  constructor(private cinemaService:CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getvilles()
    .subscribe(data=>{
        this.villes=data;
      },err=>{
            console.log(err);
          }
    )
    
  }
  //get the cinemas depends on the ville
  onGetCinema(v){
    this.currentville=v;
    this.cinemaService.getCinemas(v)
    .subscribe(data=>{
      this.cinemas=data;
    },err=>{
      console.log(err);
          })
  }

}
