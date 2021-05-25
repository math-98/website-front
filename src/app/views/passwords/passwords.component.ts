import { Component } from '@angular/core';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.scss'],
})
export class PasswordsComponent {
  fasKey = faKey;
  password = '';
  control = new FormControl();

  hashed = [];
  promises: { [key: string]: Promise<any> } = {};
  algorithms = [];

  selectedItems = [];
  dropdownSettings = {
    selectAllText: 'Sélectionner tout',
    unSelectAllText: 'Déselectionner tout',
    allowSearchFilter: true,
    searchPlaceholderText: 'Rechercher',
  };

  onSubmit() {
    this.selectedItems.forEach((algo) => {
      let value: any = {
        password: undefined,
        salt: undefined
      };

      switch (algo.id) {}
      this.promises[algo.id] = Promise.resolve(value);
    });

    let keys = Object.keys(this.promises);
    Promise.all(Object.values(this.promises))
           .then((results) => {
             results.forEach((res, index) => {
               let name = this.algorithms.find((elm) => {
                 return elm.id == keys[index];
               }).text;
               this.hashed.push({
                 name: name,
                 password: res.password,
                 salt: res.salt
               });
             });
           });

    this.promises = {};
  }
}
