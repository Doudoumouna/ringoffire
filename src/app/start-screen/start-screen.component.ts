import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from '../../models/game';
@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit, OnDestroy {
  private audio: HTMLAudioElement;
  constructor(private firestore: AngularFirestore, private router: Router) {
    // Audio-Datei wird hier initialisiert
    this.audio = new Audio('/assets/audio/startscreenaudio.mp3');
  }

  ngOnInit(): void {
    // Audio wird hier abgespielt
    this.audio.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
  }

  ngOnDestroy(): void {
    // Audio wird hier gestoppt, wenn die Komponente zerstört wird
    this.audio.pause();
    this.audio.currentTime = 0;
  }
  newGame() {
    // start game
    let game = new Game();
    this.firestore
      .collection('games')
      .add(game.toJson())
      .then((gameInfo: any) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
  }
}
