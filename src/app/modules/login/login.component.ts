import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { UsuarioService } from '../usuario/services/usuario.service';
import { LoginRequest } from '@core/models/Login';
import { LoginService } from '@core/services/login.service';
import { LoginModule } from './login.module';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginModule, PrimeComponentsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: [
  ],
  providers: [HelpersService]
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private helpersService = inject(HelpersService);
  private localStorageService = inject(LocalStorageService);
  private userService = inject(UsuarioService);
  private loginService = inject(LoginService);
  private router = inject(Router);
  
  openModal: boolean = false;
  isLoading = false;

  ngOnInit(): void {
      // this.loginService.eventFormComponent.emit(this);
  }

  public formLogin: FormGroup = this.formBuilder.group({
      user: [, Validators.required],
      password: [, [Validators.required]],
  });

  hideModal() {
      this.openModal = false;
      this.isLoading = false;
  };

  openLogin(){
      this.reset();
      this.openModal = true;
  };
  
  reset(): void {
      this.isLoading = false;
      this.formLogin.reset();
  };

  submitLogin() {
      this.isLoading = true;
      const data: LoginRequest = {
      ...this.formLogin.value,
      };
      this.userService.login(data).subscribe({
      next: (res) => { 
        this.hideModal();
        if (res.usuario && res.usuario.usuario) {
          this.localStorageService.set('username', res.usuario.usuario as string);
          this.helpersService.messageNotification("success", "Correcto", `¡${res.usuario.usuario} Bienvenido!.`, 3000);
          if (res.perfil && res.perfil.descripcion) {
            this.localStorageService.set('rol', res.perfil.descripcion as string);
          }
          this.router.navigate(['/users'])
          this.loginService.eventChangeUserComponent.emit();
        } else {
          this.helpersService.messageNotification("warn", "Error", `Usuario o Contraseña incorrecto`, 3000);
        }
        this.reset();
      },
      error: (err) => { 
          this.isLoading = false;
          console.log(err);
          this.helpersService.messageNotification("error", err.eroor, err.message, 3000);
      }
      })
  };

  logout( ) {
      this.localStorageService.removeAll();
  }

}
