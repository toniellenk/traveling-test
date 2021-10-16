/*eslint-disable*/
import {BehaviorSubject} from 'rxjs';
import history from './history';

const currentUserSubject = new BehaviorSubject(
  localStorage.getItem('travellingUser'),
);

export const authenticationService = {
  logout,
  travellingUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function logout() {
  localStorage.removeItem('travellingUser');
  localStorage.removeItem('travellingToken');
  localStorage.removeItem('travellingUsuarioId');
  localStorage.removeItem('travellingRole');
  currentUserSubject.next(null);
  history.push('/');
}