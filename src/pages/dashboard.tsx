import AlarmSetup from '../components/AlarmSetup';
import useCheckLogin from '../hooks/useCheckLogin';

const DashboardPage = (): JSX.Element => {
  useCheckLogin();
  return <AlarmSetup />;
};

export default DashboardPage;
