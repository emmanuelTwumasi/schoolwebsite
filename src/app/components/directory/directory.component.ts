import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Alumni } from '../../models/alumni.model';
import { AlumniService } from '../../services/alumni.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  alumni$: Observable<Alumni[]>;
  private searchTermSubject = new BehaviorSubject<string>('');

  constructor(private alumniService: AlumniService) { }

  ngOnInit(): void {
    this.alumni$ = this.searchTermSubject.pipe(
      debounceTime(300), // Wait for 300ms pause in events
      distinctUntilChanged(), // Only emit if value is different from previous value
      switchMap((term: string) => this.alumniService.searchAlumni(term))
    );
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTermSubject.next(inputElement.value);
  }
}
