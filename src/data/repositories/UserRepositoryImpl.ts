import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { auth, firestore } from '../sources/firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export class UserRepositoryImpl implements UserRepository {
  async signUp(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
    };

    // Salvar informações adicionais no Firestore
    await setDoc(doc(firestore, 'users', user.id), {
      email: user.email,
    });

    return user;
  }

  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));
    if (!userDoc.exists()) {
      // Se o doc não existe, criar:
      await setDoc(doc(firestore, 'users', firebaseUser.uid), { email: firebaseUser.email });
    }

    const userData = (await getDoc(doc(firestore, 'users', firebaseUser.uid))).data()!;

    const user: User = {
      id: firebaseUser.uid,
      email: userData.email,
      pushToken: userData.pushToken,
    };

    return user;
  }

  async getCurrentUser(): Promise<User | null> {
    const firebaseUser: FirebaseUser | null = auth.currentUser;
    if (!firebaseUser) return null;

    const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));
    if (!userDoc.exists()) return null;

    const userData = userDoc.data()!;
    const user: User = {
      id: firebaseUser.uid,
      email: userData.email,
      pushToken: userData.pushToken,
    };

    return user;
  }

  async updatePushToken(userId: string, token: string): Promise<void> {
    await setDoc(doc(firestore, 'users', userId), {
      pushToken: token,
    }, { merge: true });
  }
}
