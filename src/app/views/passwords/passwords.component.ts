import { Component } from '@angular/core';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import * as md5 from 'md5';
import * as sha1 from 'sha1';

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
  algorithms = [
    { id: 'bcrypt', text: 'bcrypt' },
    { id: 'md5', text: 'md5' },
    { id: 'sha1', text: 'sha1' },
  ];

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
        hash: undefined,
        salt: undefined,
      };

      switch (algo.id) {
        case 'bcrypt':
          value = new Promise((resolve) => {
            bcrypt.hash(this.password, 10).then((hash) => {
              resolve({
                hash,
              });
            });
          });
          break;

        case 'md5':
          value = {
            hash: md5(this.password),
          };
          break;

        case 'sha1':
          value = {
            hash: sha1(this.password),
          };
          break;
      }
      this.promises[algo.id] = Promise.resolve(value);
    });

    let keys = Object.keys(this.promises);
    Promise.all(Object.values(this.promises)).then((results) => {
      this.promises = {};

      const localHashes = {
        password: this.password,
        hashes: [],
      };
      this.password = '';

      results.forEach((res, index) => {
        let name = this.algorithms.find((elm) => {
          return elm.id == keys[index];
        }).text;
        localHashes.hashes.push({
          name: name,
          hash: res.hash,
          salt: res.salt,
        });
      });
      this.hashed.unshift(localHashes);
    });
  }
}
