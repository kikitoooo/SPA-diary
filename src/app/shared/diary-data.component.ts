import { Injectable } from "@angular/core";
import { DiaryEntry } from "./diary-entry.model";
import { Subject } from "rxjs";
import { DateTime } from "luxon";


@Injectable({providedIn:"root"})
export class DiaryDataService {

    diarySubject = new Subject<DiaryEntry[]>()

    diaryEntries: DiaryEntry[] = [
        new DiaryEntry(DateTime.now().toLocaleString(DateTime.DATETIME_SHORT), "Первая запись!")
    ]

//Метод удаляет записи. Работает напрямую с массивом записей.
    onDelete(index: number){
        this.diaryEntries.splice(index, 1);
        this.diarySubject.next(this.diaryEntries);
    }

//Метод добавляет записи. Работает напрямую с массивом записей.
    onAddDiaryEntry(diaryEntry: DiaryEntry){
        this.diaryEntries.unshift(diaryEntry);
        this.diarySubject.next(this.diaryEntries)
    }
 
//Метод получающий данные конкретной записи.    
    getDiaryEntry(index: number){
        return{...this.diaryEntries[index]}
    }

//Метод редактирующий запись с конкретным id. Работает напрямую с массивом записей.
    onUpdateEntry(paramId: number, newEntry: DiaryEntry){
        this.diaryEntries[paramId] = newEntry;
        this.diarySubject.next(this.diaryEntries);

    }
}