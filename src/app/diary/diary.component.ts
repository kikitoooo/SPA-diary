import { Component, OnDestroy, OnInit } from '@angular/core';
import { DiaryEntry } from '../shared/diary-entry.model';
import { DiaryDataService } from '../shared/diary-data.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})

export class DiaryComponent implements OnInit, OnDestroy {

  diaryEntries: DiaryEntry[];
  index: number;
  diarySubscription = new Subscription()

  constructor(private diaryDataService: DiaryDataService, private router: Router) {}


  
  ngOnInit(): void {
    this.diarySubscription = this.diaryDataService.diarySubject.subscribe(
      diaryEntries => { this.diaryEntries = diaryEntries })
    this.diaryEntries = this.diaryDataService.diaryEntries
  }


  ngOnDestroy(): void {
    this.diarySubscription.unsubscribe();
  }

//Удаляет запись по индексу
  onDelete(index: number){
    this.diaryDataService.onDelete(index);
  }

//Перемещает пользователя на страничку редактирования http://localhost/edit/{{index}}
  onEdit(index: number){
    this.router.navigate(["edit", index])
  }
}
