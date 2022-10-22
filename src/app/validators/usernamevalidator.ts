import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { UserService } from "../services/user.service";

export function usernameAlreadyExistsValidator(userService: UserService): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
        let user = await userService.readUserByUsername(control.value);
        console.debug('user read by id for validator', user);

        if(user) {
            console.debug('user is true');
            return { forbiddenUsername: { value: control.value } };
        }

        return null;
    };
}