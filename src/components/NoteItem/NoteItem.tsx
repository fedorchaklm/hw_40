import styles from './NoteItem.module.css';

type Props = {
  note: string;
}

function NoteItem({ note}: Props) {
  return (
    <li className={styles.item}>
      <p className={styles.item__description}>{note}</p>
    </li>
  );
}

export default NoteItem;