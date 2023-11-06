import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiaryDataService } from '../shared/diary-data.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryEntry } from '../shared/diary-entry.model';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.css']
})
export class DiaryFormComponent implements OnInit {

  diaryForm: FormGroup;
  DiaryEntry: DiaryEntry;
  date: string;
  entry: string;
  editMode = false;
  paramId: number;

  constructor(private DiaryDataService: DiaryDataService, private router: Router, private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      //Проверка редактируем запись или создаем новую
      if(paramMap.has('id')){
        this.editMode = true;
        this.paramId = +paramMap.get('id')!;
        this.DiaryEntry = this.DiaryDataService.getDiaryEntry(this.paramId);
      }
      else{
        this.editMode = false;
      }
    })
    //Получение данных из формы
    this.diaryForm = new FormGroup({
      "entry": new FormControl(this.editMode ? this.DiaryEntry.entry : null, [Validators.required])
    })
  }

/*Метод осуществляет добавление новой запси на главную страничку с помощью метода onAddDiaryEntry(), 
либо редактирует существующую запись, если editMode = true, с помощью метода onUpdateEntry()*/
  onSubmit(date: string, entry: string){
    const newEntry = new DiaryEntry(DateTime.now().toLocaleString(DateTime.DATETIME_SHORT), this.diaryForm.value.entry);
    
    if(this.editMode){
      this.DiaryDataService.onUpdateEntry(this.paramId, newEntry);
    }
    else{
      this.DiaryDataService.onAddDiaryEntry(newEntry);
    }

    this.router.navigateByUrl("");
  }
}
