import { Component } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ringoffire';
  userData: Observable<any>;

  constructor(private firestore: Firestore) {
    this.getData();
  }

  addData(f: any) {
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, f.value)
      .then(() => {
        console.log('Data Saved Successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, { idField: 'id' }).subscribe((val) => {
      console.log(val);
    });

    this.userData = collectionData(collectionInstance, { idField: 'id' });
  }
  // Update Query
  updateData(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    const updateData = {
      name: 'updatedName',
    };
    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('Data Updated');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Delete Query
  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    deleteDoc(docInstance).then(() => {
      console.log('Data Deleted');
    });
  }
}
