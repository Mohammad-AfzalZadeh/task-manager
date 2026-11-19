
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './register.component.html'
})
export class RegisterComponent {

    private authService = inject(AuthService);
    private router = inject(Router);

    form = {
        username: '',
        password: ''
    };

    errorMessage = '';

    register(): void {
        this.errorMessage = '';

        this.authService.register(this.form).subscribe({
            next: () => {
                this.router.navigate(['/login']);
            },
            error: error => {
                this.errorMessage =
                    error.error?.username?.[0] ||
                    error.error?.password?.[0] ||
                    'Registration failed';
            }
        });
    }
}
