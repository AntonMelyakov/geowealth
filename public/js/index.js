import Autocomplete from './Autocomplete.js';
const usStates = await fetch("../us-states.json").then(r => r.json());

// US States
const data = usStates.map(state => ({
  text: state.name,
  value: state.abbreviation
}));

new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
});
