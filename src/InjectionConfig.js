import { initFirebase } from "./FirebaseConfig";
import { GetDI } from "./views/controller/GetDI";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

import { CharacterApplicationService } from "./application/CharacterApplicationService";
import { CharacterRepository } from "./infrastructure/repository/CharacterRepository";
import { CharacterFactory } from './infrastructure/CharacterFactory';
import { SkillRepository } from './infrastructure/repository/SkillRepository';
import { TaskApplicationService } from './application/TaskApplicationService';
import { TaskRepository } from './infrastructure/repository/TaskRepository';
import { SkillTreeApplicationService } from './application/SkillTreeApplicationService';
import { FirebaseAuthRepository } from './infrastructure/repository/FirebaseAuthRepository';
import { AuthApplicationService } from './application/AuthApplicationService';

const firebaseApp = initFirebase();

const firestore = getFirestore(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);

const characterFactory = new CharacterFactory();
const characterRepository = new CharacterRepository(
  firestore
);

const skillRepository = new SkillRepository(
  firestore,
  firebaseAuth
);
const taskRepository = new TaskRepository(
  firestore,
  firebaseAuth
);
const authRepository = new FirebaseAuthRepository(
  firebaseAuth
);

const characterApplication = new CharacterApplicationService(
  characterRepository,
  characterFactory
);
const skillApplication = new SkillTreeApplicationService(
  skillRepository
);
const taskApplication = new TaskApplicationService(
  taskRepository
);
const authApplication = new AuthApplicationService(
  authRepository
);

export function setUp() {
    const di = GetDI.getInstance();
    // 依存性注入
    di.injectCharacterApplication(characterApplication);
    di.injectSkillTreeApplication(skillApplication);
    di.injectTaskApplication(taskApplication);
    di.injectAuthApplication(authApplication);
}