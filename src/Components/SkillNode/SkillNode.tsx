import { Handle, NodeProps, Position } from '@xyflow/react';
import styles from './SkillNode.module.css';
import { useAppDispatch, useAppSelector } from '../../store';
import { useMemo, useRef, useState } from 'react';
import { Popper } from '@mui/material';
import { Actions } from '../../slice';

export const SkillNode = ({ id }: NodeProps) => {
  const dispatch = useAppDispatch();

  const skills = useAppSelector((state) => state.skillTree);
  const skill = skills[id];

  const { isCompleted } = skill;

  const [openSkillMenu, setOpenSkillMenu] = useState(false);
  const skillRef = useRef<HTMLDivElement | null>(null);

  const skillContainerStyles = useMemo(() => {
    const baseStyles: React.CSSProperties = {
      borderWidth: '3px',
      borderStyle: 'solid',
    };

    if (isCompleted) {
      baseStyles.borderColor = 'rgb(220, 164, 20) rgb(73, 54, 6) rgb(73, 54, 6) rgb(220, 164, 20)';
      baseStyles.backgroundColor = 'rgb(172, 124, 12)';
    } else {
      baseStyles.borderColor = '#FFF rgb(85, 85, 85) rgb(85, 85, 85) #FFF';
      baseStyles.backgroundColor = 'rgb(196, 196, 196)';
    }

    return baseStyles;
  }, [isCompleted]);

  const isClickable = useMemo(() => {
    if (!isCompleted) {
      return !skill.path.some((id) => !skills[id]?.isCompleted);
    }
  }, [skills, isCompleted, skill]);

  return (
    <div className={styles.verticalBorder}>
      <div className={styles.horizontalBorder}>
        <div
          ref={skillRef}
          className={styles.container}
          style={{
            ...skillContainerStyles,
            cursor: isClickable ? 'pointer' : 'default',
          }}
          onMouseEnter={() => setOpenSkillMenu(true)}
          onMouseLeave={() => setOpenSkillMenu(false)}
          onClick={() => isClickable && dispatch(Actions.markSkillAsCompleted(skill.id))}
        >
          <img src={skill.image} alt={skill.name} className={styles.image} />
          <Handle
            type="target"
            position={Position.Left}
            style={{ left: '5px', visibility: 'hidden' }}
          />
          <Handle
            type="source"
            position={Position.Right}
            style={{ right: '5px', visibility: 'hidden' }}
          />
        </div>
        <Popper id={skill.id} open={openSkillMenu} anchorEl={skillRef.current}>
          <div className={styles.menuContainer}>
            <div className={styles.menuTitle}>{skill.name}</div>
            <div className={styles.menuDescription}>{skill.description}</div>
          </div>
        </Popper>
      </div>
    </div>
  );
};
