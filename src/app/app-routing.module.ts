import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NotfoundComponent} from './feature/components/notfound/notfound.component';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {PermissionGuard} from "./guard/permission/permission.guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./feature/components/dashboard/dashboard.module').then(m => m.DashboardModule)
                    },
                    {
                        path: 'brand',
                        canActivate: [PermissionGuard],
                        data: {
                            permission: {
                                group: 'Brand',
                                name: 'brand.index'
                            }
                        },
                        loadChildren: () => import('./feature/components/brand/brand.module').then(m => m.BrandModule)
                    },
                ]
            },
            {path: 'auth', loadChildren: () => import('./feature/components/auth/auth.module').then(m => m.AuthModule)},
            {path: 'notfound', component: NotfoundComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
