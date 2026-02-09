import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumni } from '../../models/alumni.model';
import { AlumniService } from '../../services/alumni.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  alumni$: Observable<Alumni[]>;

  constructor(private alumniService: AlumniService) { }

  ngOnInit(): void {
    this.alumni$ = this.alumniService.getAlumniForCurrentTenant();
  }
}
