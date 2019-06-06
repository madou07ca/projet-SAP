import {createStackNavigator, createAppContainer} from 'react-navigation';

import ConsulterScreen from './Components/Consulter';
import AccueilScreen from './Components/Accueil'
import SeanceScreen from './Components/Seance'
import Fin_SeanceScreen from './Components/Fin_Seance'
import estimerScreen from './Components/estimerDouleur'
import chronoScreen from './Components/Chrono'
import AuthScreen from './Components/Authentification'
import CompteScreen from './Components/Enregistrement'
import DetailsScreen from './Components/Consulter/Details/DetailsActivite'
//-----------------test
import youtubeScreen from './Components/youtube'
const App = createStackNavigator({
  //Accueil: {screen: AccueilScreen},
  Authentification: {screen: AuthScreen},
  Enregistrement: {screen: CompteScreen},
  Accueil: {screen: AccueilScreen},
  Consulter: {screen: ConsulterScreen},
  Seance: {screen: SeanceScreen},
  Chrono: {screen: chronoScreen},
  Fin_Seance: {screen: Fin_SeanceScreen},
  estimerDouleur: {screen: estimerScreen},
  DetailsActivite: {screen: DetailsScreen},
  RCTYouTubeExample: {screen: youtubeScreen}
  
});

export default createAppContainer(App);