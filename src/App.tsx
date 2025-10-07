import SkillTree from './Components/SkillTree/SkillTree';
import styles from './App.module.css';
import { useAppDispatch } from './store';
import { useEffect } from 'react';
import { fetchMinecraftSkillTree } from './slice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchMinecraftSkillTree());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <div className={styles.border}>
        <div className={styles.shadow}>
          <h1 className={styles.title}>Minecraft</h1>
          <div className={styles.container}>
            <SkillTree />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
