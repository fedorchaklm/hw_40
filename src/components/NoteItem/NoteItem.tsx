import styles from './NoteItem.module.css';

type Props = {
  note: string;
  onDelete: () => void;
}

function NoteItem({ note, onDelete }: Props) {
  return (
    <li className={styles.item}>
      <p className={styles.item__description}>{note}</p>
      <button className={styles.item__delNoteBtn} onClick={onDelete}>Del</button>
    </li>
  );
}

export default NoteItem;