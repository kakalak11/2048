import { _decorator, Button, Component, EditBox, log, Node, sys } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

export const STORAGE_KEY = "highscoreData";

@ccclass('HighscoreStorage')
export class HighscoreStorage extends Component {

    @property(EditBox) playerName: EditBox;
    @property(Button) submitButton: Button;

    protected start(): void {
        this.submitButton.interactable = false;
    }

    onEditEnd() {
        if (!this.playerName.string) {
            this.submitButton.interactable = false;
        } else {
            this.submitButton.interactable = true;
        }
    }

    submitScore() {
        const highscoreData = JSON.parse(sys.localStorage.getItem(STORAGE_KEY)) || [];

        const userData = {
            name: this.playerName.string,
            score: GameManager?.instance?.currentScore ?? 0,
        };

        if (highscoreData.find(data => this.playerName.string == data.name)) {
            highscoreData.find(data => this.playerName.string == data.name).score = GameManager?.instance?.currentScore ?? 0
        } else {
            highscoreData.push(userData);
        }

        sys.localStorage.setItem(STORAGE_KEY, JSON.stringify(highscoreData));
        console.log(sys.localStorage);
    }

}

