import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {path:'app', children:[
        {path:'login', component:Login},
        {path:'home', component:Home}
    ]},
    {path:'**', redirectTo:'app/home'}
];
