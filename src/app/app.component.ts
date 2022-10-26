import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public people: any[];
  public tasks: any[];

  public status = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTasks();
    // this.getPeople();
  }

  public getTasks(): void {
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this.http
      .get('./../assets/task.json', { headers: header })
      .subscribe((obj: any) => {
        this.tasks = obj;

        this.http
          .get('./../assets/status.json', { headers: header })
          .subscribe((response: any) => {
            this.status = response;
          });
        this.http
          .get('./../assets/people.json', { headers: header })
          .subscribe((res: any) => {
            this.people = res;

            this.tasks.forEach((item) => {
              const found = this.people.find(
                (ele) => ele.id === item.assignedTo
              );
              item.firstName = found?.firstName;
              item.lastName = found?.lastName;

              const foundStatus = this.status.find(
                (ele2) => ele2.id === item.statusId
              );
              item.status = foundStatus?.name;
            });
          });
      });
  }
}
