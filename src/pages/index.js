import styles from './index.css';
import imgs1 from '../assets/20200617093452.gif'
export default function () {
  return (
    <div className={styles.normal}>
      <ul className={styles.list}>
        <li style={{ fontSize: '20px' }} > Here is index</li>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>

          <img src={imgs1}></img>
          {/* <a href="https://umijs.org/guide/getting-started.html">
            Getting Started
          </a> */}
        </li>
      </ul>
    </div >
  );
}
