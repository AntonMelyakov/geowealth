import styles from './App.module.scss';
import Autocomplete from './Autocomplete.tsx';

function App() {
  return (
    <div className={styles.content}>
      <Autocomplete id="first" httpReq={false} />
      <Autocomplete id="second" httpReq={true} />
    </div>
  );
}

export default App;
