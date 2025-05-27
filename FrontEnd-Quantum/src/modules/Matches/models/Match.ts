export default class Match {
  id: number;
  researcher_id: number;
  project_id: number;
  score: number;

  constructor(data: { id: number; researcher_id: number; project_id: number; score: number }) {
    this.id = data.id;
    this.researcher_id = data.researcher_id;
    this.project_id = data.project_id;
    this.score = data.score;
  }
}
