import { MD3LightTheme } from 'react-native-paper';

// ----------------------------------------------------------------------

export default Object.fromEntries(
  Object.entries(MD3LightTheme.fonts).map(([key, value]) => [
    key,
    {
      ...value,
      fontFamily: getWeight(value.fontWeight),
      fontStyle: 'normal !important',
    },
  ])
);

function getWeight(weight?: string) {
  switch (weight) {
    case '100':
    case 'thin':
      return 'Metropolis100';

    case '200':
      return 'Metropolis200';

    case '300':
    case 'light':
      return 'Metropolis300';

    case '400':
    case 'normal':
      return 'Metropolis400';

    case '500':
    case 'medium':
      return 'Metropolis500';

    case '600':
      return 'Metropolis600';

    case '700':
    case 'bold':
      return 'Metropolis700';

    case '800':
      return 'Metropolis800';

    case '900':
    case 'black':
      return 'Metropolis900';

    default:
      return 'Metropolis400';
  }
}
