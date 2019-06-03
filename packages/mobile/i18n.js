import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import setupInternationalization from '@szgabsz91/morpher-client-shared/src/i18n';

i18n.use(reactI18nextModule);

setupInternationalization(i18n);

export default i18n;
