import { Component, VERSION } from '@angular/core';
import { Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  private articleList: string[] = ['an', 'the', 'a', 'in', 'on'];

  text$: Subject<string[]> = new Subject<string[]>();

  changeHandler(e) {
    this.text$.next(e.value.trim().split(' '));
  }

  constructor() {
    this.text$
      .pipe(
        map(x => {
          const wordList = (y: string[]) =>
            y.filter(word =>
              this.articleList.every(article => article !== word)
            );
          return {
            totalCount: x.reduce(acc => acc + 1, 0),
            words: wordList(x),
            wordCount: wordList(x).length
          };
        })
      )
      .subscribe(t => console.log(`Total Words: ${t.wordCount}`));
  }
}
