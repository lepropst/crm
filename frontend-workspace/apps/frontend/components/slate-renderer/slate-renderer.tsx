import styles from './slate-renderer.module.css';

/* eslint-disable-next-line */
export interface SlateRendererProps {}

export function SlateRenderer(props: SlateRendererProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SlateRenderer!</h1>
    </div>
  );
}

export default SlateRenderer;
