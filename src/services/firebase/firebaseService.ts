import firebase from 'firebase/compat/app';
import { PathI } from '../../models/Path';
import 'firebase/compat/firestore';
import { firebaseConfig } from './firebaseConfig';

export default class FirebaseService {
  private firestore: firebase.firestore.Firestore;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.firestore = firebase.firestore();
  }

  async getAllPaths(): Promise<PathI[]> {
    const pathsRef = this.firestore.collection('paths');
    const snapshot = await pathsRef.get();
    const paths: PathI[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, ...data } as PathI;
    });
    return paths;
  }

  async addPath(path: PathI) {
    const itemRef = this.firestore.collection('paths').doc(path.id);
    await itemRef.set(path)
  }

  async getPathById(pathId: string) {
    const pathRef = await this.firestore.collection('paths').doc(pathId).get();
    return pathRef.exists
      ? ({ id: pathRef.id, ...pathRef.data() } as PathI)
      : null;
  }

  async updatePath(path: PathI) {
    const pathDocRef = this.firestore.collection('paths').doc(path.id);
    const pathDoc = await pathDocRef.get();
    if (pathDoc.exists) {
      await pathDocRef.update(path);
    } else {
      console.error(`Document with id ${path.id} does not exist.`);
    }
  }

  async deletePath(pathId: string) {
    try {
      await this.firestore.collection('paths').doc(pathId).delete();
      console.log('Data deleted successfully!');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  async getPaths() {
    const pathsRef = await this.firestore.collection('paths').get();
    const paths = pathsRef.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as PathI),
    );
    return paths;
  }
}
