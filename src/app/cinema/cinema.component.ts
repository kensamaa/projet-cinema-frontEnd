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
  public salles:any;
  public currentville;
  public currentCinema;
  public currentProjection:any;
  public projections;
  public selectedTickets;
  constructor(public cinemaService:CinemaService) { }

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
    this.salles=undefined; 
    console.log(v)
    this.currentville=v;
    this.cinemaService.getCinemas(v)
    .subscribe(data=>{
      this.cinemas=data;
    },err=>{
      console.log(err);
          })
  }
  //get the salle depeneds on click of the cinema
  onGetSalles(c)
  {
    this.currentCinema=c;
    console.log(c)
    this.cinemaService.getSalles(c)
    .subscribe(data=>{
      this.salles=data;//after we get list salle boucl for each salle to get the projection of the salle 
      
      this.salles._embedded.salles.forEach(salle => {
        this.cinemaService.getProjections(salle)
        .subscribe(data=>
          {
            salle.projections=data;
          },err=>
          {
            console.log(err);
          })
      })
    },err=>{
      console.log(err);
          })
  }
  onGetTicketsPlaces(p)
  {
    this.currentProjection=p;
    console.log(p)
    this.cinemaService.GetTicketsPlaces(p)
    .subscribe(data=>
      {
        this.currentProjection.tickets=data
        this.selectedTickets=[];
      },err=>
      {
        console.log("ticket shit");
        console.log(err);
      })

  }
  onSelectTicket(t)
  {
    t.selected=true;
    if(!t.selected)
    {
      t.selected=true;
      this.selectedTickets.push(t);
    }
    else
    {
      t.selected=false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t),1);
    }
    console.log(this.selectedTickets)
  }
  getTicketClass(t){
    let str="btn ticket";
    if(t.reserve==true)
    {
      str+="btn-danger";
    }
    else if(t.selected)
    {
      str+="btn-warning"
    }
    else
    {
      str+="btn-success"
    }
    return str;
  }

}
