import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Alumni } from '../../models/alumni.model';
import { AlumniService } from '../../services/alumni.service';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  alumni$: Observable<Alumni[]> = of([]);
  private searchTermSubject = new BehaviorSubject<string>('');

  constructor(private alumniService: AlumniService) { }

  ngOnInit(): void {
    this.alumni$ = this.searchTermSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.alumniService.searchAlumni(term))
    );
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTermSubject.next(inputElement.value);
  }
}
