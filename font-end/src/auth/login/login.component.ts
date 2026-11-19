
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html'
})
export class LoginComponent {

    private authService = inject(AuthService);
    private router = inject(Router);

    form = {
        username: '',
        password: ''
    };

    errorMessage = '';

    login(): void {
        this.errorMessage = '';

        this.authService.login(this.form).subscribe({
            next: () => {
                localStorage.setItem('username', this.form.username);
                this.router.navigate(['panel/dashboard']);
            },
            error: () => {
                this.errorMessage = 'Invalid username or password';
            }
        });
    }
}
