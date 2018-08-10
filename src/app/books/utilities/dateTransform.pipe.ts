// Created this custom pipe since the Datepicker component of ng-bootstrap doesn't support JS native ISO 8601 Date format
import { Pipe, PipeTransform } from '@angular/core';
import { Date } from './date.model';

@Pipe({name: 'transformDate'})

export class DateTransformPipe implements PipeTransform {
  transform(date: Date): string {
    // Take a date object '{ "year": YYYY, "MM": 00, "DD": 00 }' and transform it to 'YYYY-MM-DDTHH:mm:ss'
    return date.year + '-' + ('0' + date.month).slice(-2) + '-' + ('0' + date.day).slice(-2) + 'T00:00:00';
  }
}
