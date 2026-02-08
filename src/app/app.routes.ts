import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Userhome } from './pages/userhome/userhome';

export const routes: Routes = [
    {path:'app', children:[
        {path:'login', component:Login, data: {animation: 'LoginPage'}},
        {path:'home', component:Home, data: {animation: 'HomePage'}},
        {path:'userhome', component:Userhome, data: {animation: 'UserhomePage'}}
    ]},
    {path:'**', redirectTo:'app/home'}
];
