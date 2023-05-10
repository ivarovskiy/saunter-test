import { action, makeAutoObservable } from 'mobx';
import { PathI } from '../models/Path';
import FirebaseService from '../services/firebase/firebaseService';

class Store {
  firebaseService: FirebaseService;
  query!: string;
  paths: PathI[] = [];

   constructor(firebaseService: FirebaseService) {
    makeAutoObservable(this);
    this.firebaseService = firebaseService;
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
      this.firebaseService.updatePath(this.paths[pathIndex]);
    }
  }

  @action async removeFromPath(pathId: string) {
    const pathIndex = this.paths.findIndex((path) => path.id === pathId);
    if (pathIndex !== -1) {
      this.paths.splice(pathIndex, 1);
      this.paths = [...this.paths]; // обновляем observable переменную
      this.firebaseService.deletePath(pathId);
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
    this.firebaseService.addPath(path);
  }

  setPath(payload: PathI[]) {
    this.paths = payload;
  }
}

const firebaseService = new FirebaseService();
export default new Store(firebaseService);
