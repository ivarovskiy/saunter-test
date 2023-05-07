import { action, makeAutoObservable } from 'mobx';
import { PathI } from '../models/Path';
import { data } from '../data/path.data';

class Store {
  query!: string;
  paths: PathI[] = data;

  constructor() {
    makeAutoObservable(this);
  }

  getMarks(pathId: string) {
    const pathIndex = this.paths.findIndex((path) => path.id === pathId);
    if (pathIndex !== -1) {
      return this.paths[pathIndex].markers;
    }
  }

  @action isFavorite(pathId: string, isFavorite: boolean) {
    const pathIndex = this.paths.findIndex((path) => path.id === pathId);
    if (pathIndex !== -1) {
      this.paths[pathIndex].isFavorite = !isFavorite;
    }
  }

  @action removeFromPath(pathId: string) {
    const pathIndex = this.paths.findIndex((path) => path.id === pathId);
    if (pathIndex !== -1) {
      this.paths.splice(pathIndex, 1);
      this.paths = [...this.paths]; // обновляем observable переменную
    }
  }

  pathById(id: string): PathI | undefined {
    return this.paths.find(path => path.id === id);
  }

  get sortedPath() {
    return this.paths
      .slice()
      .sort((a: PathI, b: PathI) =>
        a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1,
      );
  }

  get searchPath() {
    if (this.query !== undefined) {
      return this.paths
        .filter((path: PathI) => {
          return (
            path.title.toLowerCase().includes(this.query.toLowerCase()) ||
            path.shortDescription.toLowerCase().includes(this.query.toLowerCase()) ||
            path.fullDescription.toLowerCase().includes(this.query.toLowerCase())
          )
        })
        .slice()
        .sort((a: PathI, b: PathI) =>
          a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1,
        );
    } else {
      return this.paths;
    }
  }

  @action addNewPath(path: PathI) {
    this.paths.push(path);
    this.setPath(this.paths);
  }

  setPath(payload: PathI[]) {
    this.paths = payload;
  }
}

export default new Store();
